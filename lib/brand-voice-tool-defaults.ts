import { defaultProductContentInput } from "@/features/product-content-generator/schema";
import { defaultRewriteStudioInput } from "@/features/rewrite-studio/schema";
import { defaultSeoOptimizerInput } from "@/features/seo-optimizer/schema";
import { defaultTranslationStudioInput } from "@/features/translation-studio/schema";
import type { BrandVoiceContext } from "@/lib/ai/gemini";

export type SavedBrandVoice = {
  language?: string | null;
  tone?: string | null;
  style?: string | null;
  avoid?: string | null;
  preferredCta?: string | null;
} | null | undefined;

export function getBrandRulesForGeneration(
  brandVoice: SavedBrandVoice,
): BrandVoiceContext {
  if (!brandVoice) {
    return {};
  }

  return {
    style: brandVoice.style ?? undefined,
    avoid: brandVoice.avoid ?? undefined,
    preferredCta: brandVoice.preferredCta ?? undefined,
  };
}

export function getProductContentFormDefaults(brandVoice: SavedBrandVoice) {
  if (!brandVoice) {
    return defaultProductContentInput;
  }

  return {
    ...defaultProductContentInput,
    ...(brandVoice.language ? { targetLanguage: brandVoice.language } : {}),
    ...(brandVoice.tone ? { tone: brandVoice.tone } : {}),
  };
}

export function getRewriteStudioFormDefaults(brandVoice: SavedBrandVoice) {
  if (!brandVoice) {
    return defaultRewriteStudioInput;
  }

  return {
    ...defaultRewriteStudioInput,
    ...(brandVoice.language ? { targetLanguage: brandVoice.language } : {}),
    ...(brandVoice.tone ? { tone: brandVoice.tone } : {}),
  };
}

export function getSeoOptimizerFormDefaults(brandVoice: SavedBrandVoice) {
  if (!brandVoice) {
    return defaultSeoOptimizerInput;
  }

  return {
    ...defaultSeoOptimizerInput,
    ...(brandVoice.language ? { targetLanguage: brandVoice.language } : {}),
  };
}

export function getTranslationStudioFormDefaults(brandVoice: SavedBrandVoice) {
  if (!brandVoice) {
    return defaultTranslationStudioInput;
  }

  return {
    ...defaultTranslationStudioInput,
    ...(brandVoice.language ? { targetLanguage: brandVoice.language } : {}),
  };
}
