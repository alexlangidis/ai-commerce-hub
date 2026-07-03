import { z } from "zod";

import { languageOptions } from "@/lib/languages";

export const productLanguageOptions = languageOptions;

export const productToneOptions = [
  "Professional",
  "Friendly",
  "Sales-focused",
  "Technical",
  "Luxury",
  "Clear and helpful",
] as const;

export const productCategoryOptions = [
  "Phone case",
  "Screen protector",
  "Charger",
  "Smartwatch strap",
  "Gaming accessory",
  "Fitness product",
  "Beauty product",
  "Fashion item",
  "Other",
] as const;

export const productContentInputSchema = z.object({
  productName: z.string().trim().min(2, "Product name is required."),
  brand: z.string().trim().min(2, "Brand is required."),
  category: z.string().trim().min(2, "Category is required."),
  features: z.string().trim().min(10, "Add the main product features."),
  specifications: z.string().trim().min(10, "Add the key specifications."),
  targetLanguage: z.string().trim().min(2, "Target language is required."),
  tone: z.string().trim().min(2, "Tone is required."),
});

export type ProductContentInput = z.infer<typeof productContentInputSchema>;

export type ProductContentOutput = {
  seoTitle: string;
  shortDescription: string;
  longDescription: string;
  bulletBenefits: string[];
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  imageAltText: string;
  wooCommerceHtml: string;
};

export const productContentOutputSchema = z.object({
  seoTitle: z.string().trim().min(1),
  shortDescription: z.string().trim().min(1),
  longDescription: z.string().trim().min(1),
  bulletBenefits: z.array(z.string().trim().min(1)).min(3).max(8),
  metaTitle: z.string().trim().min(1),
  metaDescription: z.string().trim().min(1),
  tags: z.array(z.string().trim().min(1)).min(3).max(12),
  imageAltText: z.string().trim().min(1),
  wooCommerceHtml: z.string().trim().min(1),
});

export type ProductContentResult = {
  generationId: string;
  output: ProductContentOutput;
};

export const defaultProductContentInput: ProductContentInput = {
  productName: "",
  brand: "",
  category: "Phone case",
  features: "",
  specifications: "",
  targetLanguage: "Greek",
  tone: "Professional",
};
