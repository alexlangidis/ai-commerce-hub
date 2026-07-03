import { z } from "zod";

import { languageOptions } from "@/lib/languages";

export const seoLanguageOptions = languageOptions;

export const seoOptimizerInputSchema = z.object({
  title: z.string().trim().min(3, "Title is required."),
  description: z.string().trim().min(20, "Description is required."),
  targetKeyword: z.string().trim().min(2, "Target keyword is required."),
  targetLanguage: z.string().trim().min(2, "Target language is required."),
});

export const seoOptimizerOutputSchema = z.object({
  seoScore: z.number().min(0).max(100),
  titleSuggestions: z.array(z.string().trim().min(1)).min(2).max(5),
  metaDescription: z.string().trim().min(1),
  missingKeywords: z.array(z.string().trim().min(1)).max(10),
  improvedVersion: z.string().trim().min(1),
});

export type SeoOptimizerInput = z.infer<typeof seoOptimizerInputSchema>;
export type SeoOptimizerOutput = z.infer<typeof seoOptimizerOutputSchema>;

export const defaultSeoOptimizerInput: SeoOptimizerInput = {
  title: "",
  description: "",
  targetKeyword: "",
  targetLanguage: "Greek",
};
