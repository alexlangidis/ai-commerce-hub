"use client";

import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { pricingPlans } from "@/components/marketing/data";
import { useLandingAuth } from "@/components/marketing/landing-auth-context";
import { GlassCard, SectionHeading } from "@/components/marketing/glass-card";
import { FadeIn, Stagger, StaggerItem, motion } from "@/components/marketing/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStartCreatingHref } from "@/lib/marketing-links";
import { cn } from "@/lib/utils";

export function LandingPricing() {
  const isAuthenticated = useLandingAuth();
  const startCreatingHref = getStartCreatingHref(isAuthenticated);
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-14">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple plans that scale with your catalog"
            description="Start free during early access, then pick the tier that matches your SKU volume and team size."
          />
        </FadeIn>

        <Stagger className="grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.name}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                <GlassCard
                  className={cn(
                    "flex h-full flex-col p-6",
                    plan.highlighted && "landing-glow border-primary/30"
                  )}
                >
                  {plan.highlighted ? (
                    <Badge className="mb-4 w-fit">Most popular</Badge>
                  ) : (
                    <div className="mb-4 h-5" />
                  )}
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <div className="mt-3 flex items-end gap-1">
                    <span className="text-4xl font-semibold tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period ? (
                      <span className="pb-1 text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {plan.description}
                  </p>
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-chart-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-6 w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    nativeButton={false}
                    render={<Link href={startCreatingHref} />}
                  >
                    {plan.price === "Custom" ? "Contact sales" : "Get started"}
                  </Button>
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
