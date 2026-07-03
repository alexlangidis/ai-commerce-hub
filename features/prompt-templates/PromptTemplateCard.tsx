import { AppPanel } from "@/components/app/app-panel";
import { Badge } from "@/components/ui/badge";
import { DeletePromptTemplateButton } from "@/features/prompt-templates/DeletePromptTemplateButton";
import type { PromptTemplateCardData } from "@/features/prompt-templates/queries";

type PromptTemplateCardProps = {
  template: PromptTemplateCardData;
};

export function PromptTemplateCard({ template }: PromptTemplateCardProps) {
  return (
    <AppPanel className="transition-transform hover:-translate-y-0.5">
      <div className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="w-fit">
              {template.category}
            </Badge>
            {template.isCustom ? (
              <Badge variant="secondary" className="w-fit bg-primary/10 text-primary">
                Custom
              </Badge>
            ) : null}
          </div>
          {template.isCustom && template.id ? (
            <DeletePromptTemplateButton templateId={template.id} />
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
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
  );
}
