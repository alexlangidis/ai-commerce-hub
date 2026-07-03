import { and, desc, eq } from "drizzle-orm";

import { generations } from "@/db/schema";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";

export type HistoryGeneration = Awaited<ReturnType<typeof getHistoryGenerations>>[number];
export type HistoryGenerationDetail = NonNullable<
  Awaited<ReturnType<typeof getHistoryGenerationDetail>>
>;

export async function getHistoryGenerations() {
  const session = await requireSession();
  const rows = await db.query.generations.findMany({
    where: eq(generations.userId, session.user.id),
    orderBy: desc(generations.createdAt),
    limit: 50,
    with: {
      versions: {
        orderBy: (generationVersions, { desc }) =>
          desc(generationVersions.versionNumber),
      },
    },
  });

  return rows.map((generation) => ({
    ...generation,
    createdAt: generation.createdAt.toISOString(),
    versions: generation.versions.map((version) => ({
      ...version,
      createdAt: version.createdAt.toISOString(),
    })),
  }));
}

export async function getHistoryGenerationDetail(generationId: string) {
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
      },
    },
  });

  if (!generation) {
    return null;
  }

  return {
    ...generation,
    createdAt: generation.createdAt.toISOString(),
    versions: generation.versions.map((version) => ({
      ...version,
      createdAt: version.createdAt.toISOString(),
    })),
  };
}
