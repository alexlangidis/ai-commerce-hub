import { z } from "zod";

export const translationLanguageOptions = [
  "Greek",
  "English",
  "German",
  "French",
  "Italian",
  "Spanish",
] as const;

export const translationModeOptions = [
  "Direct translation",
  "Localized e-commerce translation",
  "SEO translation",
] as const;

export const translationStudioInputSchema = z.object({
  sourceContent: z.string().trim().min(20, "Paste at least 20 characters."),
  sourceLanguage: z.string().trim().min(2, "Source language is required."),
  targetLanguage: z.string().trim().min(2, "Target language is required."),
  mode: z.string().trim().min(2, "Translation mode is required."),
});

export const translationStudioOutputSchema = z.object({
  translatedContent: z.string().trim().min(1),
  localizedNotes: z.array(z.string().trim().min(1)).min(1).max(6),
  seoKeywords: z.array(z.string().trim().min(1)).max(10),
});

export type TranslationStudioInput = z.infer<typeof translationStudioInputSchema>;
export type TranslationStudioOutput = z.infer<typeof translationStudioOutputSchema>;

export const defaultTranslationStudioInput: TranslationStudioInput = {
  sourceContent: "",
  sourceLanguage: "English",
  targetLanguage: "Greek",
  mode: "Localized e-commerce translation",
};
