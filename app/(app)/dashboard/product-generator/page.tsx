import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductContentGeneratorForm } from "@/features/product-content-generator/ProductContentGeneratorForm";

const outputs = [
  "SEO title",
  "Short and long description",
  "Bullet benefits",
  "Meta title and description",
  "Tags and image alt text",
  "WooCommerce HTML",
];

export default function ProductGeneratorPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col justify-between gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex max-w-3xl flex-col gap-3">
            <Badge variant="secondary" className="w-fit">
              Product Content Generator
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight">
              Turn product facts into reusable commerce content.
            </h1>
            <p className="text-base leading-7 text-muted-foreground">
              This first version validates the workflow, output shape, and
              generation history before connecting OpenAI or Gemini.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generated outputs</CardTitle>
            <CardDescription>
              Each submit saves version one to history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3 text-sm">
              {outputs.map((output) => (
                <li key={output} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  <span>{output}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <ProductContentGeneratorForm />
    </main>
  );
}
