"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { brandProfiles, generations, generationVersions } from "@/db/schema";
import {
  generateProductContentOutput,
  PRODUCT_CONTENT_TOOL_NAME,
} from "@/features/product-content-generator/generate";
import { productContentInputSchema } from "@/features/product-content-generator/schema";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";

export async function regenerateProductGeneration(generationId: string) {
  const session = await requireSession();
  const generation = await db.query.generations.findFirst({
    where: and(
      eq(generations.id, generationId),
      eq(generations.userId, session.user.id),
    ),
    with: {
      versions: {
        orderBy: (generationVersions, { desc }) =>
          desc(generationVersions.versionNumber),
        limit: 1,
      },
    },
  });

  if (!generation) {
    throw new Error("Generation not found.");
  }

  if (generation.tool !== PRODUCT_CONTENT_TOOL_NAME) {
    throw new Error("Only product content generations can be regenerated.");
  }

  const input = productContentInputSchema.parse(generation.input);
  const brandProfile = await db.query.brandProfiles.findFirst({
    where: eq(brandProfiles.userId, session.user.id),
  });
  const { model, output } = await generateProductContentOutput({
    input,
    brandVoice: {
      language: brandProfile?.language,
      tone: brandProfile?.tone,
      style: brandProfile?.style,
      preferredCta: brandProfile?.preferredCta,
      avoid: brandProfile?.avoid,
    },
  });
  const nextVersionNumber =
    (generation.versions[0]?.versionNumber ?? 0) + 1;

  await db.insert(generationVersions).values({
    generationId: generation.id,
    versionNumber: nextVersionNumber,
    input,
    output,
    model,
  });

  await db
    .update(generations)
    .set({
      output,
      model,
      tone: input.tone,
      language: input.targetLanguage,
      brandProfileId: brandProfile?.id,
    })
    .where(
      and(
        eq(generations.id, generation.id),
        eq(generations.userId, session.user.id),
      ),
    );

  revalidatePath("/dashboard/history");
  revalidatePath(`/dashboard/history/${generation.id}`);

  return {
    versionNumber: nextVersionNumber,
  };
}
