"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  GlobeIcon,
  PlayIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "lucide-react";

import { heroStats } from "@/components/marketing/data";
import { useLandingAuth } from "@/components/marketing/landing-auth-context";
import { Float, motion } from "@/components/marketing/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStartCreatingHref } from "@/lib/marketing-links";

export function LandingHero() {
  const isAuthenticated = useLandingAuth();
  const startCreatingHref = getStartCreatingHref(isAuthenticated);
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20">
      <div className="landing-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-24 size-[520px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="landing-glass mb-6 gap-1.5 border-primary/20 px-3 py-1 text-primary"
            >
              <SparklesIcon data-icon="inline-start" />
              AI Commerce Hub Studio
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Create high-converting product content with{" "}
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground text-pretty sm:text-xl"
          >
            Generate, rewrite, translate, and SEO-optimize e-commerce content in
            seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
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
              render={<a href="#workflow" />}
            >
              <PlayIcon data-icon="inline-start" />
              View demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-2xl font-semibold tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="landing-glass landing-glow relative overflow-hidden rounded-2xl p-1"
          >
            <div className="landing-shine absolute inset-0 opacity-40" />
            <div className="relative rounded-[calc(var(--radius-xl)+2px)] bg-card/80 p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/60 pb-4">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-chart-5/80" />
                  <div className="size-2.5 rounded-full bg-chart-4/80" />
                  <div className="size-2.5 rounded-full bg-chart-3/80" />
                </div>
                <span className="text-xs text-muted-foreground">
                  studio.ai-commerce-hub.app
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <p className="text-xs font-medium text-primary">Input</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Wireless noise-cancelling headphones, 40h battery, USB-C
                    fast charge, premium leather case included.
                  </p>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-xs font-medium text-primary">AI output</p>
                  <p className="mt-2 text-sm leading-6">
                    Studio-grade silence. 40-hour endurance. Charge fast, travel
                    light — premium leather case included.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <Float
            className="absolute -right-2 top-8 hidden w-44 rounded-xl border border-border/60 bg-card/90 p-3 shadow-xl backdrop-blur sm:block lg:-right-8"
            delay={0.5}
          >
            <div className="flex items-center gap-2 text-xs font-medium text-chart-3">
              <TrendingUpIcon className="size-3.5" />
              SEO score
            </div>
            <p className="mt-2 text-2xl font-semibold">91</p>
            <p className="text-xs text-muted-foreground">+49 vs. draft</p>
          </Float>

          <Float
            className="absolute -left-2 bottom-8 hidden w-44 rounded-xl border border-border/60 bg-card/90 p-3 shadow-xl backdrop-blur sm:block lg:-left-8"
            delay={1.2}
          >
            <div className="flex items-center gap-2 text-xs font-medium text-chart-2">
              <GlobeIcon className="size-3.5" />
              Translation
            </div>
            <p className="mt-2 text-sm font-medium">DE · FR · EL</p>
            <p className="text-xs text-muted-foreground">Localized in 4.2s</p>
          </Float>
        </div>
      </div>
    </section>
  );
}
