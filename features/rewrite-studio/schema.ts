import { z } from "zod";

import { languageOptions } from "@/lib/languages";

export const rewriteModeOptions = [
  "Make professional",
  "Make shorter",
  "Make more sales-focused",
  "Make more technical",
  "Make luxury tone",
  "Remove exaggeration",
  "Improve Greek",
] as const;

export const rewriteLanguageOptions = languageOptions;

export const rewriteToneOptions = [
  "Professional",
  "Friendly",
  "Sales-focused",
  "Technical",
  "Luxury",
  "Clear and helpful",
] as const;

export const rewriteStudioInputSchema = z.object({
  existingDescription: z
    .string()
    .trim()
    .min(20, "Paste at least 20 characters."),
  mode: z.string().trim().min(2, "Rewrite mode is required."),
  targetLanguage: z.string().trim().min(2, "Target language is required."),
  tone: z.string().trim().min(2, "Tone is required."),
});

export const rewriteStudioOutputSchema = z.object({
  rewrittenDescription: z.string().trim().min(1),
  summaryOfChanges: z.array(z.string().trim().min(1)).min(2).max(6),
  beforeAfterPreview: z.object({
    before: z.string().trim().min(1),
    after: z.string().trim().min(1),
  }),
});

export type RewriteStudioInput = z.infer<typeof rewriteStudioInputSchema>;
export type RewriteStudioOutput = z.infer<typeof rewriteStudioOutputSchema>;

export const defaultRewriteStudioInput: RewriteStudioInput = {
  existingDescription: "",
  mode: "Make professional",
  targetLanguage: "Greek",
  tone: "Professional",
};
