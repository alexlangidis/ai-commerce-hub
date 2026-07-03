import {
  GEMINI_TEXT_MODEL,
  generateJsonWithGemini,
  hasGeminiApiKey,
  type BrandVoiceContext,
} from "@/lib/ai/gemini";
import {
  seoOptimizerOutputSchema,
  type SeoOptimizerInput,
  type SeoOptimizerOutput,
} from "@/features/seo-optimizer/schema";

export const SEO_OPTIMIZER_TOOL_NAME = "seo-optimizer";
export const SEO_OPTIMIZER_PREVIEW_MODEL = "deterministic-seo-preview-v1";

export async function generateSeoOptimizerOutput({
  input,
  brandVoice,
}: {
  input: SeoOptimizerInput;
  brandVoice: BrandVoiceContext;
}) {
  const model = hasGeminiApiKey()
    ? GEMINI_TEXT_MODEL
    : SEO_OPTIMIZER_PREVIEW_MODEL;
  const output = hasGeminiApiKey()
    ? await generateJsonWithGemini({
        prompt: buildSeoPrompt(input, brandVoice),
        zodSchema: seoOptimizerOutputSchema,
        responseSchema: seoResponseSchema,
      })
    : buildSeoFallback(input);

  return { model, output };
}

const seoResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "seoScore",
    "titleSuggestions",
    "metaDescription",
    "missingKeywords",
    "improvedVersion",
  ],
  properties: {
    seoScore: { type: "number", minimum: 0, maximum: 100 },
    titleSuggestions: {
      type: "array",
      minItems: 2,
      maxItems: 5,
      items: { type: "string" },
    },
    metaDescription: { type: "string" },
    missingKeywords: {
      type: "array",
      maxItems: 10,
      items: { type: "string" },
    },
    improvedVersion: { type: "string" },
  },
};

function buildSeoPrompt(input: SeoOptimizerInput, brandVoice: BrandVoiceContext) {
  return [
    "You are an ecommerce SEO optimizer.",
    "Analyze the product title and description for the target keyword.",
    "Return only valid JSON matching the schema.",
    "",
    "SEO input:",
    JSON.stringify(input, null, 2),
    "",
    "Brand voice:",
    JSON.stringify(brandVoice, null, 2),
    "",
    "Rules:",
    "- Do not keyword stuff.",
    "- Keep suggestions accurate and ecommerce-ready.",
    "- Respect the target language.",
    "- The improved version should naturally include the target keyword.",
  ].join("\n");
}

function buildSeoFallback(input: SeoOptimizerInput): SeoOptimizerOutput {
  return {
    seoScore: input.description
      .toLowerCase()
      .includes(input.targetKeyword.toLowerCase())
      ? 72
      : 45,
    titleSuggestions: [
      `${input.title} | ${input.targetKeyword}`,
      `${input.targetKeyword} - ${input.title}`,
    ],
    metaDescription: `${input.title}: ${input.description.slice(0, 120)}`,
    missingKeywords: input.description
      .toLowerCase()
      .includes(input.targetKeyword.toLowerCase())
      ? []
      : [input.targetKeyword],
    improvedVersion: `${input.title}\n\n${input.description}\n\nKey focus: ${input.targetKeyword}.`,
  };
}
