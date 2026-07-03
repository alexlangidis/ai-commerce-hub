"use client";

import { CheckCircle2Icon } from "lucide-react";

import { workflowSteps } from "@/components/marketing/data";
import { GlassCard, SectionHeading } from "@/components/marketing/glass-card";
import { FadeIn, motion } from "@/components/marketing/motion";
import { Badge } from "@/components/ui/badge";

export function LandingWorkflow() {
  return (
    <section id="workflow" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-14">
          <SectionHeading
            eyebrow="Workflow"
            title="From rough notes to store-ready content in four steps"
            description="Watch how AI Commerce Hub Studio turns product context into polished, on-brand listings you can publish with confidence."
          />
        </FadeIn>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {workflowSteps.map((step, index) => (
              <FadeIn key={step.step} delay={index * 0.08}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassCard className="flex gap-4 p-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15} className="lg:sticky lg:top-24 lg:self-start">
            <GlassCard glow className="overflow-hidden p-6">
              <div className="mb-4 flex items-center justify-between">
                <Badge variant="secondary">Live preview</Badge>
                <span className="text-xs text-muted-foreground">
                  Product Generator
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  "Parsing product attributes…",
                  "Applying Brand Voice: Professional",
                  "Generating SEO title & description…",
                  "Building WooCommerce HTML block…",
                ].map((line, index) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
                    className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/20 px-3 py-2.5 text-sm"
                  >
                    <CheckCircle2Icon className="size-4 shrink-0 text-chart-3" />
                    {line}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.45 }}
                className="mt-5 rounded-xl border border-primary/20 bg-primary/10 p-4"
              >
                <p className="text-xs font-medium text-primary">Ready to export</p>
                <p className="mt-2 text-sm font-medium">
                  Premium Wireless ANC Headphones — 40H Battery, Fast USB-C
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>SEO 91</span>
                  <span>·</span>
                  <span>3 languages</span>
                  <span>·</span>
                  <span>v1 saved</span>
                </div>
              </motion.div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
