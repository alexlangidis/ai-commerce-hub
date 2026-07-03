"use client";

import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

import { GlassCard } from "@/components/marketing/glass-card";
import { useLandingAuth } from "@/components/marketing/landing-auth-context";
import { FadeIn, motion } from "@/components/marketing/motion";
import { Button } from "@/components/ui/button";
import {
  getStartCreatingHref,
  getWorkspaceHref,
} from "@/lib/marketing-links";

export function LandingCta() {
  const isAuthenticated = useLandingAuth();
  const startCreatingHref = getStartCreatingHref(isAuthenticated);
  const workspaceHref = getWorkspaceHref(isAuthenticated);
  return (
    <section className="px-4 pb-24 pt-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <GlassCard glow className="relative overflow-hidden px-6 py-12 sm:px-10 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-chart-2/15 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              <motion.div
                animate={{ rotate: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <SparklesIcon className="size-6" />
                </div>
              </motion.div>

              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Ready to ship product content that converts?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                Join AI Commerce Hub Studio and turn every SKU into polished,
                SEO-ready, on-brand listings — in seconds, not hours.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  nativeButton={false}
                  className="landing-glow h-11 px-6"
                  render={<Link href={startCreatingHref} />}
                >
                  Start creating
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  nativeButton={false}
                  className="landing-glass h-11 px-6"
                  render={<Link href={workspaceHref} />}
                >
                  {isAuthenticated ? "Go to dashboard" : "Log in to workspace"}
                </Button>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
