"use client";

import Link from "next/link";
import {
  CheckCircle2Icon,
  SparklesIcon,
  StoreIcon,
  TrendingUpIcon,
} from "lucide-react";

import { Float, motion } from "@/components/marketing/motion";
import { Badge } from "@/components/ui/badge";

const loginHighlights = [
  "Pick up where you left off with saved generations",
  "Brand Voice applied across every AI tool",
  "Version history for every product listing",
];

const signupHighlights = [
  "Generate SEO-ready product copy in seconds",
  "Rewrite, translate, and optimize from one workspace",
  "Free to start — no credit card required",
];

const previewLines = [
  "Premium wireless ANC headphones — 40H battery",
  "Engineered for focus. Built for all-day comfort.",
  "SEO score: 91 · 3 languages · v2 saved",
];

export function AuthShowcase({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const highlights = isSignup ? signupHighlights : loginHighlights;

  return (
    <div className="relative hidden overflow-hidden border-r border-border/60 lg:flex lg:flex-col lg:justify-between">
      <div className="landing-grid absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -left-20 top-20 size-72 rounded-full bg-primary/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-20 right-0 size-64 rounded-full bg-chart-2/15 blur-[90px]" />

      <div className="relative flex flex-col gap-8 p-10 xl:p-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-sm">
              <StoreIcon className="size-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              AI Commerce Hub Studio
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="flex max-w-md flex-col gap-4"
        >
          <Badge
            variant="secondary"
            className="landing-glass w-fit gap-1.5 border-primary/20 text-primary"
          >
            <SparklesIcon data-icon="inline-start" />
            {isSignup ? "Start free" : "Welcome back"}
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-balance xl:text-4xl">
            {isSignup
              ? "Ship product content that converts from day one."
              : "Your AI content workspace is ready when you are."}
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            {isSignup
              ? "Join teams using AI to generate, rewrite, translate, and SEO-optimize e-commerce listings at scale."
              : "Log in to access your dashboard, brand voice settings, and generation history."}
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="flex max-w-md flex-col gap-3"
        >
          {highlights.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22 + index * 0.08, duration: 0.4 }}
              className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
            >
              <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-chart-3" />
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="relative p-10 xl:p-14">
        <Float delay={0.3}>
          <div className="landing-glass landing-glow max-w-md rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-primary">
                Live preview
              </span>
              <span className="flex items-center gap-1 text-xs text-chart-3">
                <TrendingUpIcon className="size-3.5" />
                SEO 91
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {previewLines.map((line, index) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.12, duration: 0.35 }}
                  className={
                    index === 0
                      ? "text-sm font-medium"
                      : "text-sm text-muted-foreground"
                  }
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>
        </Float>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
        >
          <div>
            <p className="text-lg font-semibold text-foreground">12 min</p>
            <p>saved per SKU</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-lg font-semibold text-foreground">6</p>
            <p>languages</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-lg font-semibold text-foreground">+38%</p>
            <p>avg. SEO lift</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
