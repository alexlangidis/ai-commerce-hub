import { z } from "zod";

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
