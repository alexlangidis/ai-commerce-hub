"use client";

import { features } from "@/components/marketing/data";
import { GlassCard, SectionHeading } from "@/components/marketing/glass-card";
import { FadeIn, Stagger, StaggerItem, motion } from "@/components/marketing/motion";
import { cn } from "@/lib/utils";

export function LandingFeatures() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-14">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to ship better product listings"
            description="One workspace for generation, rewriting, SEO, translation, brand consistency, and version control — built for e-commerce teams."
          />
        </FadeIn>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <StaggerItem key={feature.title}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                  <GlassCard className="group h-full p-6 transition-colors hover:border-primary/25">
                    <div
                      className={cn(
                        "mb-4 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br",
                        feature.accent
                      )}
                    >
                      <Icon className="size-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </GlassCard>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
