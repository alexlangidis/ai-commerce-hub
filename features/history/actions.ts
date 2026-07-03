"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { brandProfiles, generations, generationVersions } from "@/db/schema";
import {
  generateProductContentOutput,
  PRODUCT_CONTENT_TOOL_NAME,
} from "@/features/product-content-generator/generate";
import { productContentInputSchema } from "@/features/product-content-generator/schema";
import {
  generateRewriteStudioOutput,
  REWRITE_STUDIO_TOOL_NAME,
} from "@/features/rewrite-studio/generate";
import { rewriteStudioInputSchema } from "@/features/rewrite-studio/schema";
import {
  generateSeoOptimizerOutput,
  SEO_OPTIMIZER_TOOL_NAME,
} from "@/features/seo-optimizer/generate";
import { seoOptimizerInputSchema } from "@/features/seo-optimizer/schema";
import {
  generateTranslationStudioOutput,
  TRANSLATION_STUDIO_TOOL_NAME,
} from "@/features/translation-studio/generate";
import { translationStudioInputSchema } from "@/features/translation-studio/schema";
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

  const brandProfile = await db.query.brandProfiles.findFirst({
    where: eq(brandProfiles.userId, session.user.id),
  });
  const brandVoice = {
    language: brandProfile?.language,
    tone: brandProfile?.tone,
    style: brandProfile?.style,
    preferredCta: brandProfile?.preferredCta,
    avoid: brandProfile?.avoid,
  };
  const { input, model, output, tone, language } =
    await regenerateByTool(generation.tool, generation.input, brandVoice);
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
      tone,
      language,
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

async function regenerateByTool(
  tool: string,
  rawInput: Record<string, unknown>,
  brandVoice: {
    language?: string;
    tone?: string;
    style?: string;
    preferredCta?: string;
    avoid?: string;
  },
) {
  if (tool === PRODUCT_CONTENT_TOOL_NAME) {
    const input = productContentInputSchema.parse(rawInput);
    const { model, output } = await generateProductContentOutput({
      input,
      brandVoice,
    });

    return {
      input,
      model,
      output,
      tone: input.tone,
      language: input.targetLanguage,
    };
  }

  if (tool === REWRITE_STUDIO_TOOL_NAME) {
    const input = rewriteStudioInputSchema.parse(rawInput);
    const { model, output } = await generateRewriteStudioOutput({
      input,
      brandVoice,
    });

    return {
      input,
      model,
      output,
      tone: input.tone,
      language: input.targetLanguage,
    };
  }

  if (tool === SEO_OPTIMIZER_TOOL_NAME) {
    const input = seoOptimizerInputSchema.parse(rawInput);
    const { model, output } = await generateSeoOptimizerOutput({
      input,
      brandVoice,
    });

    return {
      input,
      model,
      output,
      tone: brandVoice.tone ?? "SEO",
      language: input.targetLanguage,
    };
  }

  if (tool === TRANSLATION_STUDIO_TOOL_NAME) {
    const input = translationStudioInputSchema.parse(rawInput);
    const { model, output } = await generateTranslationStudioOutput({
      input,
      brandVoice,
    });

    return {
      input,
      model,
      output,
      tone: input.mode,
      language: input.targetLanguage,
    };
  }

  throw new Error("This generation type cannot be regenerated yet.");
}
