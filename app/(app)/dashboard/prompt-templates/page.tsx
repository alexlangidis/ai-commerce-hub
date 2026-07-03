import { AppPanel } from "@/components/app/app-panel";
import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { Badge } from "@/components/ui/badge";
import { promptTemplates } from "@/features/prompt-templates/templates";

export default function PromptTemplatesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Prompt Templates"
        title="Start product prompts from proven ecommerce templates."
        description="These templates define the fields each product type usually needs. Wire them into Product Generator next."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {promptTemplates.map((template) => (
          <AppPanel key={template.slug} className="transition-transform hover:-translate-y-0.5">
            <div className="flex h-full flex-col gap-4 p-5">
              <div className="flex flex-col gap-2">
                <Badge variant="outline" className="w-fit">
                  {template.category}
                </Badge>
                <h3 className="text-base font-semibold">{template.name}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {template.description}
                </p>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <p className="text-sm font-medium">Fields</p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {template.fields.map((field) => (
                    <li key={field} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" />
                      <span>{field}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AppPanel>
        ))}
      </section>
    </PageShell>
  );
}
