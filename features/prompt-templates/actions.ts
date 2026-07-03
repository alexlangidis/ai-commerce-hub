"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { promptTemplates } from "@/db/schema";
import {
  createPromptTemplateSchema,
  createPromptTemplateSlug,
  parsePromptTemplateFields,
} from "@/features/prompt-templates/schema";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";

const promptTemplatePaths = [
  "/dashboard/prompt-templates",
  "/dashboard/product-generator",
] as const;

function revalidatePromptTemplatePaths() {
  for (const path of promptTemplatePaths) {
    revalidatePath(path);
  }
}

export async function createPromptTemplate(input: unknown) {
  const session = await requireSession();
  const values = createPromptTemplateSchema.parse(input);
  const items = parsePromptTemplateFields(values.fieldsText);
  const description = values.description?.trim();

  const [created] = await db
    .insert(promptTemplates)
    .values({
      userId: session.user.id,
      name: values.name.trim(),
      slug: createPromptTemplateSlug(values.name, session.user.id),
      category: values.category.trim(),
      fields: {
        description: description || undefined,
        items,
      },
      isBuiltIn: false,
    })
    .returning();

  revalidatePromptTemplatePaths();

  return created;
}

export async function deletePromptTemplate(templateId: string) {
  const session = await requireSession();

  const deleted = await db
    .delete(promptTemplates)
    .where(
      and(
        eq(promptTemplates.id, templateId),
        eq(promptTemplates.userId, session.user.id),
        eq(promptTemplates.isBuiltIn, false),
      ),
    )
    .returning({ id: promptTemplates.id });

  if (!deleted.length) {
    throw new Error("Template not found.");
  }

  revalidatePromptTemplatePaths();
}
