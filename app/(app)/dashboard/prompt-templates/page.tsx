import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { CreatePromptTemplateForm } from "@/features/prompt-templates/CreatePromptTemplateForm";
import { PromptTemplateCard } from "@/features/prompt-templates/PromptTemplateCard";
import {
  getUserPromptTemplates,
  toPromptTemplateCard,
} from "@/features/prompt-templates/queries";
import { promptTemplates } from "@/features/prompt-templates/templates";
import { getWorkspaceOptionLists } from "@/features/workspace-options/actions";

export default async function PromptTemplatesPage() {
  const [userTemplates, optionLists] = await Promise.all([
    getUserPromptTemplates(),
    getWorkspaceOptionLists(),
  ]);
  const customTemplates = userTemplates.map(toPromptTemplateCard);
  const builtInTemplates = promptTemplates.map((template) => ({
    ...template,
    isCustom: false,
  }));

  return (
    <PageShell>
      <PageHeader
        eyebrow="Prompt Templates"
        title="Start product prompts from proven ecommerce templates."
        description="Use built-in templates or create your own field sets for the product types you sell most."
      />

      <CreatePromptTemplateForm categories={optionLists.categories} />

      {customTemplates.length ? (
        <section className="flex flex-col gap-4">
          <SectionHeading
            title="Your templates"
            description="Custom templates saved to your workspace."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {customTemplates.map((template) => (
              <PromptTemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Built-in templates"
          description="Ready-made field sets for common ecommerce categories."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {builtInTemplates.map((template) => (
            <PromptTemplateCard key={template.slug} template={template} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
