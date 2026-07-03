"use client";

import { ArrowRightIcon } from "lucide-react";

import { afterContent, beforeContent } from "@/components/marketing/data";
import { GlassCard, SectionHeading } from "@/components/marketing/glass-card";
import { FadeIn, motion } from "@/components/marketing/motion";
import { Badge } from "@/components/ui/badge";

function ScoreRing({ score, accent }: { score: number; accent: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative flex size-12 items-center justify-center rounded-full bg-gradient-to-br ${accent}`}
      >
        <span className="text-sm font-semibold">{score}</span>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">SEO score</p>
        <p className="text-sm font-medium">{score}/100</p>
      </div>
    </div>
  );
}

export function LandingComparison() {
  return (
    <section id="compare" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-14">
          <SectionHeading
            eyebrow="Before & after"
            title="See the difference AI optimization makes"
            description="Turn thin, generic listings into search-friendly copy that still sounds like your brand — with measurable SEO improvements."
          />
        </FadeIn>

        <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <FadeIn delay={0.05}>
            <GlassCard className="h-full p-6">
              <Badge variant="outline" className="mb-4">
                {beforeContent.label}
              </Badge>
              <ScoreRing
                score={beforeContent.score}
                accent="from-muted to-muted/50"
              />
              <h3 className="mt-5 text-lg font-semibold">{beforeContent.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {beforeContent.body}
              </p>
              <ul className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
                <li>· No keywords in title</li>
                <li>· Weak value proposition</li>
                <li>· Generic CTA</li>
              </ul>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.1} className="flex items-center justify-center py-4">
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex size-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary"
            >
              <ArrowRightIcon className="size-5" />
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <GlassCard glow className="h-full p-6">
              <Badge className="mb-4">{afterContent.label}</Badge>
              <ScoreRing
                score={afterContent.score}
                accent="from-primary/30 to-chart-3/20"
              />
              <h3 className="mt-5 text-lg font-semibold">{afterContent.title}</h3>
              <p className="mt-3 text-sm leading-7">{afterContent.body}</p>
              <ul className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
                <li>· Keyword-rich title</li>
                <li>· Benefit-led description</li>
                <li>· Brand voice aligned</li>
              </ul>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
