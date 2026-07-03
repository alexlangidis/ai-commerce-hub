"use client";

import {
  LanguagesIcon,
  SearchCheckIcon,
  SparklesIcon,
  StoreIcon,
  WandSparklesIcon,
} from "lucide-react";

import { dashboardModules } from "@/components/marketing/data";
import { GlassCard, SectionHeading } from "@/components/marketing/glass-card";
import { FadeIn, motion } from "@/components/marketing/motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const moduleIcons = [
  SparklesIcon,
  WandSparklesIcon,
  SearchCheckIcon,
  LanguagesIcon,
];

export function LandingDashboard() {
  return (
    <section id="dashboard" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-14">
          <SectionHeading
            eyebrow="Dashboard"
            title="A workspace built for catalog-scale content ops"
            description="Navigate tools from one sidebar, preview outputs instantly, and keep every version organized — without switching tabs or spreadsheets."
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <GlassCard glow className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <aside className="flex gap-2 border-b border-border/60 bg-sidebar p-4 lg:w-56 lg:flex-col lg:border-r lg:border-b-0">
                <div className="mb-2 hidden items-center gap-2 lg:flex">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-sidebar-primary to-chart-2 text-sidebar-primary-foreground">
                    <StoreIcon className="size-4" />
                  </div>
                  <span className="text-sm font-medium">Studio</span>
                </div>
                <nav className="flex flex-1 gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
                  {dashboardModules.map((item, index) => {
                    const Icon = moduleIcons[index] ?? SparklesIcon;

                    return (
                      <div
                        key={item.label}
                        className={cn(
                          "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                          item.active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/70"
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="whitespace-nowrap">{item.label}</span>
                      </div>
                    );
                  })}
                </nav>
              </aside>

              <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Workspace</p>
                    <h3 className="text-lg font-semibold">Product Content Generator</h3>
                  </div>
                  <Badge variant="secondary">Brand Voice: Professional</Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      Product notes
                    </p>
                    <p className="mt-2 text-sm leading-6">
                      Ceramic mug, 350ml, dishwasher safe, matte finish, gift box
                      included.
                    </p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0.6 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-primary/20 bg-primary/5 p-4"
                  >
                    <p className="text-xs font-medium text-primary">Generated output</p>
                    <p className="mt-2 text-sm leading-6">
                      Elevate daily rituals with a 350ml ceramic mug — dishwasher
                      safe, matte finish, gift-box ready.
                    </p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "SEO score", value: "88" },
                    { label: "Versions", value: "12" },
                    { label: "Languages", value: "4" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl border border-border/60 bg-card/50 p-3 text-center"
                    >
                      <p className="text-lg font-semibold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
