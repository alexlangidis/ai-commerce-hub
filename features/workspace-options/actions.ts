"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { userWorkspaceOptions } from "@/db/schema";
import { addWorkspaceOptionSchema } from "@/features/workspace-options/schema";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";
import {
  mergeWorkspaceOptionLists,
  mergeUniqueStrings,
  normalizeCustomOptionValue,
  type WorkspaceCustomOptions,
  type WorkspaceOptionLists,
} from "@/lib/workspace-options";

const toolPaths = [
  "/dashboard/brand-voice",
  "/dashboard/product-generator",
  "/dashboard/rewrite-studio",
  "/dashboard/seo-optimizer",
  "/dashboard/translation-studio",
] as const;

function revalidateWorkspacePaths() {
  for (const path of toolPaths) {
    revalidatePath(path);
  }
}

async function getOrCreateCustomOptions(userId: string): Promise<WorkspaceCustomOptions> {
  const existing = await db.query.userWorkspaceOptions.findFirst({
    where: eq(userWorkspaceOptions.userId, userId),
  });

  if (existing) {
    return {
      languages: existing.languages,
      categories: existing.categories,
      tones: existing.tones,
      styles: existing.styles,
      avoids: existing.avoids,
      ctas: existing.ctas,
    };
  }

  const [created] = await db
    .insert(userWorkspaceOptions)
    .values({ userId })
    .returning();

  return {
    languages: created.languages,
    categories: created.categories,
    tones: created.tones,
    styles: created.styles,
    avoids: created.avoids,
    ctas: created.ctas,
  };
}

export async function getWorkspaceOptionLists(): Promise<WorkspaceOptionLists> {
  const session = await requireSession();
  const custom = await getOrCreateCustomOptions(session.user.id);

  return mergeWorkspaceOptionLists(custom);
}

export async function addWorkspaceOption(input: {
  key: keyof WorkspaceCustomOptions;
  value: string;
}) {
  const session = await requireSession();
  const { key, value } = addWorkspaceOptionSchema.parse(input);
  const normalized = normalizeCustomOptionValue(value);
  const custom = await getOrCreateCustomOptions(session.user.id);
  const mergedLists = mergeWorkspaceOptionLists(custom);
  const exists = mergedLists[key].some(
    (option) => option.toLowerCase() === normalized.toLowerCase(),
  );

  if (exists) {
    throw new Error("That option already exists.");
  }

  const nextCustom = {
    ...custom,
    [key]: mergeUniqueStrings([...custom[key], normalized]),
  };

  await db
    .insert(userWorkspaceOptions)
    .values({
      userId: session.user.id,
      ...nextCustom,
    })
    .onConflictDoUpdate({
      target: userWorkspaceOptions.userId,
      set: {
        ...nextCustom,
        updatedAt: new Date(),
      },
    });

  revalidateWorkspacePaths();

  return normalized;
}
