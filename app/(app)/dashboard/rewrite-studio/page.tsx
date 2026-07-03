import { Badge } from "@/components/ui/badge";
import { RewriteStudioForm } from "@/features/rewrite-studio/RewriteStudioForm";

export default function RewriteStudioPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex max-w-3xl flex-col gap-3">
          <Badge variant="secondary" className="w-fit">
            Rewrite Studio
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Improve existing product descriptions.
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            Paste current copy, choose a rewrite mode, and save a clean
            before/after version to history.
          </p>
        </div>
      </section>

      <RewriteStudioForm />
    </main>
  );
}
