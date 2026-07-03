import {
  GEMINI_TEXT_MODEL,
  generateProductContentWithGemini,
  hasGeminiApiKey,
  type BrandVoiceContext,
} from "@/lib/ai/gemini";
import {
  type ProductContentInput,
  type ProductContentOutput,
} from "@/features/product-content-generator/schema";

export const PRODUCT_CONTENT_TOOL_NAME = "product-content-generator";
export const PRODUCT_CONTENT_PREVIEW_MODEL = "deterministic-preview-v1";

export async function generateProductContentOutput({
  input,
  brandVoice,
}: {
  input: ProductContentInput;
  brandVoice: BrandVoiceContext;
}) {
  const model = hasGeminiApiKey()
    ? GEMINI_TEXT_MODEL
    : PRODUCT_CONTENT_PREVIEW_MODEL;
  const output = hasGeminiApiKey()
    ? await generateProductContentWithGemini({
        input,
        brandVoice,
      })
    : buildProductContent(input, brandVoice);

  return {
    model,
    output,
  };
}

function buildProductContent(
  input: ProductContentInput,
  brandVoice: BrandVoiceContext,
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
