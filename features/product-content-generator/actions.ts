"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { brandProfiles, generations, generationVersions } from "@/db/schema";
import {
  productContentInputSchema,
  type ProductContentInput,
  type ProductContentOutput,
  type ProductContentResult,
} from "@/features/product-content-generator/schema";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";

const TOOL_NAME = "product-content-generator";
const PREVIEW_MODEL = "deterministic-preview-v1";

export async function createProductContent(
  input: ProductContentInput,
): Promise<ProductContentResult> {
  const session = await requireSession();
  const values = productContentInputSchema.parse(input);
  const brandProfile = await db.query.brandProfiles.findFirst({
    where: eq(brandProfiles.userId, session.user.id),
  });
  const output = buildProductContent(values, {
    preferredCta: brandProfile?.preferredCta,
    avoid: brandProfile?.avoid,
  });

  const [generation] = await db
    .insert(generations)
    .values({
      userId: session.user.id,
      brandProfileId: brandProfile?.id,
      tool: TOOL_NAME,
      input: values,
      output,
      tone: values.tone,
      language: values.targetLanguage,
      model: PREVIEW_MODEL,
    })
    .returning({ id: generations.id });

  await db.insert(generationVersions).values({
    generationId: generation.id,
    versionNumber: 1,
    input: values,
    output,
    model: PREVIEW_MODEL,
  });

  revalidatePath("/dashboard/product-generator");

  return {
    generationId: generation.id,
    output,
  };
}

function buildProductContent(
  input: ProductContentInput,
  brandVoice: {
    preferredCta?: string;
    avoid?: string;
  },
): ProductContentOutput {
  const features = splitLines(input.features);
  const specifications = splitLines(input.specifications);
  const primaryFeature = features[0] ?? "practical everyday use";
  const primarySpec = specifications[0] ?? "reliable construction";
  const cta = brandVoice.preferredCta ?? "Contact us for more information.";
  const tags = [
    input.productName,
    input.brand,
    input.category,
    input.targetLanguage,
    ...features.slice(0, 3),
  ]
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    seoTitle: `${input.brand} ${input.productName} | ${input.category}`,
    shortDescription: `${input.productName} by ${input.brand} combines ${primaryFeature} with ${primarySpec}.`,
    longDescription: [
      `${input.productName} is designed for customers who want a ${input.tone.toLowerCase()} ${input.category.toLowerCase()} with clear value and practical details.`,
      `Key features include ${features.join(", ") || primaryFeature}. Specifications include ${specifications.join(", ") || primarySpec}.`,
      `${cta}`,
    ].join("\n\n"),
    bulletBenefits: [
      `Built around ${primaryFeature}.`,
      `Clear fit for ${input.category.toLowerCase()} shoppers.`,
      `Easy to describe in ${input.targetLanguage} product listings.`,
      `Avoids: ${brandVoice.avoid ?? "unsupported claims and exaggerated language"}.`,
    ],
    metaTitle: `${input.productName} - ${input.brand}`,
    metaDescription: `${input.tone} ${input.category.toLowerCase()} description for ${input.productName}, focused on ${primaryFeature}.`,
    tags,
    imageAltText: `${input.brand} ${input.productName} ${input.category}`,
    wooCommerceHtml: [
      `<h2>${input.brand} ${input.productName}</h2>`,
      `<p>${input.productName} combines ${primaryFeature} with ${primarySpec}.</p>`,
      "<ul>",
      ...features.slice(0, 4).map((feature) => `<li>${feature}</li>`),
      "</ul>",
      `<p>${cta}</p>`,
    ].join("\n"),
  };
}

function splitLines(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}
