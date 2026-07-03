"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { brandProfiles, generations, generationVersions } from "@/db/schema";
import {
  generateSeoOptimizerOutput,
  SEO_OPTIMIZER_TOOL_NAME,
} from "@/features/seo-optimizer/generate";
import {
  seoOptimizerInputSchema,
  type SeoOptimizerInput,
} from "@/features/seo-optimizer/schema";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";

export async function createSeoOptimization(input: SeoOptimizerInput) {
  const session = await requireSession();
  const values = seoOptimizerInputSchema.parse(input);
  const brandProfile = await db.query.brandProfiles.findFirst({
    where: eq(brandProfiles.userId, session.user.id),
  });
  const { model, output } = await generateSeoOptimizerOutput({
    input: values,
    brandVoice: {
      language: brandProfile?.language,
      tone: brandProfile?.tone,
      style: brandProfile?.style,
      preferredCta: brandProfile?.preferredCta,
      avoid: brandProfile?.avoid,
    },
  });

  const [generation] = await db
    .insert(generations)
    .values({
      userId: session.user.id,
      brandProfileId: brandProfile?.id,
      tool: SEO_OPTIMIZER_TOOL_NAME,
      input: values,
      output,
      tone: brandProfile?.tone ?? "SEO",
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

  revalidatePath("/dashboard/seo-optimizer");
  revalidatePath("/dashboard/history");

  return {
    generationId: generation.id,
    output,
  };
}
