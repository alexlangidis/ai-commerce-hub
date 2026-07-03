import { Badge } from "@/components/ui/badge";
import { SeoOptimizerForm } from "@/features/seo-optimizer/SeoOptimizerForm";

export default function SeoOptimizerPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex max-w-3xl flex-col gap-3">
          <Badge variant="secondary" className="w-fit">
            SEO Optimizer
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Improve product content for a target keyword.
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            Get a score, title ideas, meta description, missing keywords, and a
            stronger product description.
          </p>
        </div>
      </section>

      <SeoOptimizerForm />
    </main>
  );
}
