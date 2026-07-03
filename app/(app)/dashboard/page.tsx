import Link from "next/link";
import {
  HistoryIcon,
  MegaphoneIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react";

import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { StatCard, ToolModuleCard } from "@/components/app/tool-module-card";
import { Button } from "@/components/ui/button";
import { getBrandVoice } from "@/features/brand-voice/actions";
import { getHistoryGenerations } from "@/features/history/queries";
import { workspaceModules } from "@/lib/app-navigation";

export default async function DashboardPage() {
  const [generations, brandVoice] = await Promise.all([
    getHistoryGenerations(),
    getBrandVoice(),
  ]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Welcome back"
        title="Your AI content studio is ready."
        description="Generate product copy, refine listings, optimize SEO, and keep every version organized — all with one shared brand voice."
        action={
          <Button
            nativeButton={false}
            className="landing-glow"
            render={<Link href="/dashboard/product-generator" />}
          >
            <SparklesIcon data-icon="inline-start" />
            New generation
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="AI tools"
          value="4"
          hint="Generator, rewrite, SEO, translate"
          icon={WandSparklesIcon}
          accentClass="accent-bar-primary"
        />
        <StatCard
          label="Saved generations"
          value={String(generations.length)}
          hint="Stored in your workspace history"
          icon={HistoryIcon}
          accentClass="accent-bar-chart-3"
        />
        <StatCard
          label="Brand voice"
          value={brandVoice ? "Configured" : "Not set"}
          hint={
            brandVoice
              ? `${brandVoice.tone} · ${brandVoice.language}`
              : "Set once, reuse everywhere"
          }
          icon={MegaphoneIcon}
          accentClass="accent-bar-chart-5"
        />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Your tools</h2>
          <p className="text-sm text-muted-foreground">
            Pick a module to start creating or refining product content.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {workspaceModules.map((module) => (
            <ToolModuleCard key={module.href} {...module} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
