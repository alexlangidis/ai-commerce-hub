import { Badge } from "@/components/ui/badge";
import { TranslationStudioForm } from "@/features/translation-studio/TranslationStudioForm";

export default function TranslationStudioPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex max-w-3xl flex-col gap-3">
          <Badge variant="secondary" className="w-fit">
            Translation Studio
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Translate product content for international stores.
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            Choose direct translation, localized ecommerce translation, or SEO
            translation and save the result to history.
          </p>
        </div>
      </section>

      <TranslationStudioForm />
    </main>
  );
}
