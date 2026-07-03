"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { brandProfiles, generations, generationVersions } from "@/db/schema";
import {
  generateRewriteStudioOutput,
  REWRITE_STUDIO_TOOL_NAME,
} from "@/features/rewrite-studio/generate";
import {
  rewriteStudioInputSchema,
  type RewriteStudioInput,
} from "@/features/rewrite-studio/schema";
import { db } from "@/lib/db";
import { getBrandRulesForGeneration } from "@/lib/brand-voice-tool-defaults";
import { requireSession } from "@/lib/session";

export async function createRewriteGeneration(input: RewriteStudioInput) {
  const session = await requireSession();
  const values = rewriteStudioInputSchema.parse(input);
  const brandProfile = await db.query.brandProfiles.findFirst({
    where: eq(brandProfiles.userId, session.user.id),
  });
  const { model, output } = await generateRewriteStudioOutput({
    input: values,
    brandVoice: getBrandRulesForGeneration(brandProfile),
  });

  const [generation] = await db
    .insert(generations)
    .values({
      userId: session.user.id,
      brandProfileId: brandProfile?.id,
      tool: REWRITE_STUDIO_TOOL_NAME,
      input: values,
      output,
      tone: values.tone,
      language: values.targetLanguage,
      model,
    })
    .returning({ id: generations.id });

  await db.insert(generationVersions).values({
    generationId: generation.id,
    versionNumber: 1,
    input: values,
    output,
    model,
  });

  revalidatePath("/dashboard/rewrite-studio");
  revalidatePath("/dashboard/history");

  return {
    generationId: generation.id,
    output,
  };
}
