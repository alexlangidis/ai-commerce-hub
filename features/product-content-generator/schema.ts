import { z } from "zod";

export const productLanguageOptions = [
  "Greek",
  "English",
  "German",
  "French",
  "Italian",
  "Spanish",
] as const;

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
