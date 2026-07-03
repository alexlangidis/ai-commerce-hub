"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { brandProfiles, generations, generationVersions } from "@/db/schema";
import {
  productContentInputSchema,
  type ProductContentInput,
  type ProductContentResult,
} from "@/features/product-content-generator/schema";
import {
  generateProductContentOutput,
  PRODUCT_CONTENT_TOOL_NAME,
} from "@/features/product-content-generator/generate";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";

export async function createProductContent(
  input: ProductContentInput,
): Promise<ProductContentResult> {
  const session = await requireSession();
  const values = productContentInputSchema.parse(input);
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
  const { model, output } = await generateProductContentOutput({
    input: values,
    brandVoice,
  });

  const [generation] = await db
    .insert(generations)
    .values({
      userId: session.user.id,
      brandProfileId: brandProfile?.id,
      tool: PRODUCT_CONTENT_TOOL_NAME,
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

  revalidatePath("/dashboard/product-generator");

  return {
    generationId: generation.id,
    output,
  };
}
