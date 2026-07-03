import { z } from "zod";

import { languageOptions } from "@/lib/languages";

export { languageOptions };

export const toneOptions = [
  "Professional",
  "Friendly",
  "Sales-focused",
  "Technical",
  "Luxury",
  "Clear and helpful",
  "Minimal",
] as const;

export const styleOptions = [
  "Clear, helpful, not exaggerated",
  "Short and direct for product pages",
  "Premium and polished, without fake claims",
  "Technical and specification-focused",
  "Warm, practical, and customer-friendly",
  "SEO-focused but natural",
] as const;

export const avoidOptions = [
  "Fake claims, too many emojis",
  "Overpromising, aggressive sales language",
  "Long paragraphs, vague benefits",
  "Medical or guaranteed result claims",
  "Too much hype, too many exclamation marks",
  "Unsupported sustainability claims",
] as const;

export const preferredCtaOptions = [
  "Είμαστε στη διάθεσή σας για οποιαδήποτε πληροφορία.",
  "Ανακαλύψτε το σήμερα.",
  "Επιλέξτε το προϊόν που ταιριάζει στις ανάγκες σας.",
  "Contact us for more information.",
  "Add it to your collection today.",
  "Choose the option that fits your needs.",
] as const;

export const brandVoiceSchema = z.object({
  language: z.string().trim().min(2, "Language is required."),
  tone: z.string().trim().min(2, "Tone is required."),
  style: z.string().trim().min(5, "Style should be a little more specific."),
  avoid: z.string().trim().min(5, "Add at least one thing to avoid."),
  preferredCta: z.string().trim().min(5, "Preferred CTA is required."),
});

export type BrandVoiceValues = z.infer<typeof brandVoiceSchema>;

export const defaultBrandVoiceValues: BrandVoiceValues = {
  language: "Greek",
  tone: "Professional",
  style: "Clear, helpful, not exaggerated",
  avoid: "Fake claims, too many emojis",
  preferredCta: "Είμαστε στη διάθεσή σας για οποιαδήποτε πληροφορία.",
};
