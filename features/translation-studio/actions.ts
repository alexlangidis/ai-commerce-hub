"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { brandProfiles, generations, generationVersions } from "@/db/schema";
import {
  generateTranslationStudioOutput,
  TRANSLATION_STUDIO_TOOL_NAME,
} from "@/features/translation-studio/generate";
import {
  translationStudioInputSchema,
  type TranslationStudioInput,
} from "@/features/translation-studio/schema";
import { db } from "@/lib/db";
import { getBrandRulesForGeneration } from "@/lib/brand-voice-tool-defaults";
import { requireSession } from "@/lib/session";

export async function createTranslationGeneration(input: TranslationStudioInput) {
  const session = await requireSession();
  const values = translationStudioInputSchema.parse(input);
  const brandProfile = await db.query.brandProfiles.findFirst({
    where: eq(brandProfiles.userId, session.user.id),
  });
  const { model, output } = await generateTranslationStudioOutput({
    input: values,
    brandVoice: getBrandRulesForGeneration(brandProfile),
  });

  const [generation] = await db
    .insert(generations)
    .values({
      userId: session.user.id,
      brandProfileId: brandProfile?.id,
      tool: TRANSLATION_STUDIO_TOOL_NAME,
      input: values,
      output,
      tone: values.mode,
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

  revalidatePath("/dashboard/translation-studio");
  revalidatePath("/dashboard/history");

  return {
    generationId: generation.id,
    output,
  };
}
