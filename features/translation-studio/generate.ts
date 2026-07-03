import {
  GEMINI_TEXT_MODEL,
  generateJsonWithGemini,
  hasGeminiApiKey,
  type BrandVoiceContext,
} from "@/lib/ai/gemini";
import {
  translationStudioOutputSchema,
  type TranslationStudioInput,
  type TranslationStudioOutput,
} from "@/features/translation-studio/schema";

export const TRANSLATION_STUDIO_TOOL_NAME = "translation-studio";
export const TRANSLATION_STUDIO_PREVIEW_MODEL =
  "deterministic-translation-preview-v1";

export async function generateTranslationStudioOutput({
  input,
  brandVoice,
}: {
  input: TranslationStudioInput;
  brandVoice: BrandVoiceContext;
}) {
  const model = hasGeminiApiKey()
    ? GEMINI_TEXT_MODEL
    : TRANSLATION_STUDIO_PREVIEW_MODEL;
  const output = hasGeminiApiKey()
    ? await generateJsonWithGemini({
        prompt: buildTranslationPrompt(input, brandVoice),
        zodSchema: translationStudioOutputSchema,
        responseSchema: translationResponseSchema,
      })
    : buildTranslationFallback(input);

  return { model, output };
}

const translationResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["translatedContent", "localizedNotes", "seoKeywords"],
  properties: {
    translatedContent: { type: "string" },
    localizedNotes: {
      type: "array",
      minItems: 1,
      maxItems: 6,
      items: { type: "string" },
    },
    seoKeywords: {
      type: "array",
      maxItems: 10,
      items: { type: "string" },
    },
  },
};

function buildTranslationPrompt(
  input: TranslationStudioInput,
  brandVoice: BrandVoiceContext,
) {
  return [
    "You are an ecommerce localization specialist.",
    "Translate product content according to the selected mode.",
    "Return only valid JSON matching the schema.",
    "",
    "Translation input:",
    JSON.stringify(input, null, 2),
    "",
    "Brand voice:",
    JSON.stringify(brandVoice, null, 2),
    "",
    "Rules:",
    "- Preserve factual meaning.",
    "- Do not invent product claims.",
    "- For localized e-commerce translation, make the copy natural for the target market.",
    "- For SEO translation, include useful natural keywords without keyword stuffing.",
  ].join("\n");
}

function buildTranslationFallback(
  input: TranslationStudioInput,
): TranslationStudioOutput {
  return {
    translatedContent: `[${input.targetLanguage}] ${input.sourceContent}`,
    localizedNotes: [
      `Mode applied: ${input.mode}.`,
      "Fallback preview used because Gemini is not configured.",
    ],
    seoKeywords:
      input.mode === "SEO translation" ? [input.targetLanguage, "product"] : [],
  };
}
