import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { promptTemplates } from "@/features/prompt-templates/templates";

export default function PromptTemplatesPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex max-w-3xl flex-col gap-3">
          <Badge variant="secondary" className="w-fit">
            Prompt Templates
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Start product prompts from proven ecommerce templates.
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            These templates define the fields each product type usually needs.
            Next we can wire them directly into Product Content Generator.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {promptTemplates.map((template) => (
          <Card key={template.slug}>
            <CardHeader>
              <div className="flex flex-col gap-2">
                <Badge variant="outline" className="w-fit">
                  {template.category}
                </Badge>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
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
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
