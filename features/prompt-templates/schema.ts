import { z } from "zod";

export const createPromptTemplateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Add a template name with at least 2 characters.")
    .max(80, "Keep the name under 80 characters."),
  category: z
    .string()
    .trim()
    .min(2, "Add a category with at least 2 characters.")
    .max(80, "Keep the category under 80 characters."),
  description: z
    .string()
    .trim()
    .max(280, "Keep the description under 280 characters.")
    .optional()
    .or(z.literal("")),
  fieldsText: z
    .string()
    .trim()
    .min(1, "Add at least one field.")
    .max(2000, "Keep fields under 2000 characters."),
});

export type CreatePromptTemplateInput = z.infer<typeof createPromptTemplateSchema>;

export function parsePromptTemplateFields(fieldsText: string) {
  const items = [
    ...new Set(
      fieldsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    ),
  ];

  if (!items.length) {
    throw new Error("Add at least one field.");
  }

  return items;
}

export function createPromptTemplateSlug(name: string, userId: string) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

  return `u-${userId.slice(0, 8)}-${base || "template"}-${crypto.randomUUID().slice(0, 8)}`;
}
