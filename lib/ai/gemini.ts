import { GoogleGenAI } from "@google/genai";

import {
  productContentOutputSchema,
  type ProductContentInput,
  type ProductContentOutput,
} from "@/features/product-content-generator/schema";

export const GEMINI_PRODUCT_CONTENT_MODEL = "gemini-3.5-flash";

type BrandVoiceContext = {
  language?: string;
  tone?: string;
  style?: string;
  avoid?: string;
  preferredCta?: string;
};

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  geminiClient ??= new GoogleGenAI({ apiKey });

  return geminiClient;
}

export function hasGeminiApiKey() {
  return Boolean(process.env.GEMINI_API_KEY);
}

export async function generateProductContentWithGemini({
  input,
  brandVoice,
}: {
  input: ProductContentInput;
  brandVoice: BrandVoiceContext;
}): Promise<ProductContentOutput> {
  const client = getGeminiClient();

  if (!client) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const response = await client.models.generateContent({
    model: GEMINI_PRODUCT_CONTENT_MODEL,
    contents: buildProductContentPrompt(input, brandVoice),
    config: {
      temperature: 0.7,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        additionalProperties: false,
        required: [
          "seoTitle",
          "shortDescription",
          "longDescription",
          "bulletBenefits",
          "metaTitle",
          "metaDescription",
          "tags",
          "imageAltText",
          "wooCommerceHtml",
        ],
        properties: {
          seoTitle: { type: "string" },
          shortDescription: { type: "string" },
          longDescription: { type: "string" },
          bulletBenefits: {
            type: "array",
            minItems: 4,
            maxItems: 6,
            items: { type: "string" },
          },
          metaTitle: { type: "string" },
          metaDescription: { type: "string" },
          tags: {
            type: "array",
            minItems: 5,
            maxItems: 10,
            items: { type: "string" },
          },
          imageAltText: { type: "string" },
          wooCommerceHtml: { type: "string" },
        },
      },
    },
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return productContentOutputSchema.parse(JSON.parse(text));
}

function buildProductContentPrompt(
  input: ProductContentInput,
  brandVoice: BrandVoiceContext,
) {
  return [
    "You are an expert ecommerce copywriter.",
    "Generate product content for an ecommerce product.",
    "Return only valid JSON that matches the requested schema.",
    "",
    "Product input:",
    JSON.stringify(input, null, 2),
    "",
    "Brand voice rules:",
    JSON.stringify(
      {
        language: brandVoice.language ?? input.targetLanguage,
        tone: brandVoice.tone ?? input.tone,
        style: brandVoice.style ?? "Clear, helpful, not exaggerated",
        avoid:
          brandVoice.avoid ??
          "Fake claims, unsupported claims, excessive emojis, exaggeration",
        preferredCta:
          brandVoice.preferredCta ??
          "Contact us for more information.",
      },
      null,
      2,
    ),
    "",
    "Output requirements:",
    "- Write in the target language.",
    "- Keep copy accurate to the provided features and specifications.",
    "- Do not invent certifications, guarantees, compatibility, medical claims, or discounts.",
    "- bulletBenefits must contain 4 to 6 concise benefits.",
    "- tags must contain 5 to 10 useful ecommerce tags.",
    "- wooCommerceHtml must be clean HTML with h2, p, ul, li, and no script/style tags.",
  ].join("\n");
}
