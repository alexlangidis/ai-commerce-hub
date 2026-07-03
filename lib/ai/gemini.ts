import { GoogleGenAI } from "@google/genai";

import type { z } from "zod";

import {
  productContentOutputSchema,
  type ProductContentInput,
  type ProductContentOutput,
} from "@/features/product-content-generator/schema";

export const GEMINI_TEXT_MODEL = "gemini-3.1-flash-lite";

export type BrandVoiceContext = {
  style?: string;
  avoid?: string;
  preferredCta?: string;
};

export function formatBrandRulesForPrompt(brandVoice: BrandVoiceContext) {
  return {
    style: brandVoice.style ?? "Clear, helpful, not exaggerated",
    avoid:
      brandVoice.avoid ??
      "Fake claims, unsupported claims, excessive emojis, exaggeration",
    preferredCta: brandVoice.preferredCta ?? "Contact us for more information.",
  };
}

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

export async function generateJsonWithGemini<TSchema extends z.ZodType>({
  prompt,
  responseSchema,
  zodSchema,
}: {
  prompt: string;
  responseSchema: Record<string, unknown>;
  zodSchema: TSchema;
}): Promise<z.infer<TSchema>> {
  const client = getGeminiClient();

  if (!client) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const response = await client.models.generateContent({
    model: GEMINI_TEXT_MODEL,
    contents: prompt,
    config: {
      temperature: 0.7,
      responseMimeType: "application/json",
      responseSchema,
    },
  });
  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return zodSchema.parse(JSON.parse(text));
}

export async function generateProductContentWithGemini({
  input,
  brandVoice,
}: {
  input: ProductContentInput;
  brandVoice: BrandVoiceContext;
}): Promise<ProductContentOutput> {
  return generateJsonWithGemini({
    prompt: buildProductContentPrompt(input, brandVoice),
    zodSchema: productContentOutputSchema,
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
  });
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
    JSON.stringify(formatBrandRulesForPrompt(brandVoice), null, 2),
    "",
    "Request language and tone:",
    JSON.stringify(
      {
        language: input.targetLanguage,
        tone: input.tone,
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
