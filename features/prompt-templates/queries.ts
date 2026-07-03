import { desc, eq } from "drizzle-orm";

import { promptTemplates, type PromptTemplateFields } from "@/db/schema";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";

import type { PromptTemplate } from "@/features/prompt-templates/templates";

export type UserPromptTemplate = Awaited<
  ReturnType<typeof getUserPromptTemplates>
>[number];

export type PromptTemplateCardData = PromptTemplate & {
  id?: string;
  isCustom: boolean;
};

export async function getUserPromptTemplates() {
  const session = await requireSession();

  return db.query.promptTemplates.findMany({
    where: eq(promptTemplates.userId, session.user.id),
    orderBy: desc(promptTemplates.createdAt),
  });
}

function normalizeStoredFields(fields: PromptTemplateFields) {
  return {
    description: fields.description?.trim() || "",
    items: fields.items.filter(Boolean),
  };
}

export function toPromptTemplateCard(
  template: UserPromptTemplate,
): PromptTemplateCardData {
  const { description, items } = normalizeStoredFields(template.fields);

  return {
    id: template.id,
    slug: template.slug,
    name: template.name,
    category: template.category,
    description: description || "Your custom product prompt template.",
    fields: items,
    isCustom: true,
  };
}
