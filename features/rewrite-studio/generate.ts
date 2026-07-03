import {
  GEMINI_PRODUCT_CONTENT_MODEL,
  generateJsonWithGemini,
  hasGeminiApiKey,
  type BrandVoiceContext,
} from "@/lib/ai/gemini";
import {
  rewriteStudioOutputSchema,
  type RewriteStudioInput,
  type RewriteStudioOutput,
} from "@/features/rewrite-studio/schema";

export const REWRITE_STUDIO_TOOL_NAME = "rewrite-studio";
export const REWRITE_STUDIO_PREVIEW_MODEL = "deterministic-rewrite-preview-v1";

export async function generateRewriteStudioOutput({
  input,
  brandVoice,
}: {
  input: RewriteStudioInput;
  brandVoice: BrandVoiceContext;
}) {
  const model = hasGeminiApiKey()
    ? GEMINI_PRODUCT_CONTENT_MODEL
    : REWRITE_STUDIO_PREVIEW_MODEL;
  const output = hasGeminiApiKey()
    ? await generateJsonWithGemini({
        prompt: buildRewritePrompt(input, brandVoice),
        zodSchema: rewriteStudioOutputSchema,
        responseSchema: rewriteResponseSchema,
      })
    : buildRewriteFallback(input, brandVoice);

  return { model, output };
}

const rewriteResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["rewrittenDescription", "summaryOfChanges", "beforeAfterPreview"],
  properties: {
    rewrittenDescription: { type: "string" },
    summaryOfChanges: {
      type: "array",
      minItems: 2,
      maxItems: 6,
      items: { type: "string" },
    },
    beforeAfterPreview: {
      type: "object",
      additionalProperties: false,
      required: ["before", "after"],
      properties: {
        before: { type: "string" },
        after: { type: "string" },
      },
    },
  },
};

function buildRewritePrompt(
  input: RewriteStudioInput,
  brandVoice: BrandVoiceContext,
) {
  return [
    "You are an ecommerce rewrite editor.",
    "Rewrite the pasted product description according to the selected mode.",
    "Return only valid JSON matching the schema.",
    "",
    "Rewrite input:",
    JSON.stringify(input, null, 2),
    "",
    "Brand voice:",
    JSON.stringify(brandVoice, null, 2),
    "",
    "Rules:",
    "- Keep factual meaning accurate.",
    "- Do not invent claims, certifications, discounts, or guarantees.",
    "- Respect target language and tone.",
    "- If mode is Improve Greek, produce natural ecommerce Greek.",
  ].join("\n");
}

function buildRewriteFallback(
  input: RewriteStudioInput,
  brandVoice: BrandVoiceContext,
): RewriteStudioOutput {
  const after = [
    input.existingDescription,
    "",
    brandVoice.preferredCta ?? "Contact us for more information.",
  ].join("\n").trim();

  return {
    rewrittenDescription: after,
    summaryOfChanges: [
      `Applied mode: ${input.mode}.`,
      `Adjusted tone toward ${input.tone}.`,
      `Prepared copy for ${input.targetLanguage}.`,
    ],
    beforeAfterPreview: {
      before: input.existingDescription,
      after,
    },
  };
}
