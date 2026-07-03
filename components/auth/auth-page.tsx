"use client";

import Link from "next/link";
import { ArrowLeftIcon, StoreIcon } from "lucide-react";

import { AuthForm } from "@/components/AuthForm";
import { AuthShowcase } from "@/components/auth/auth-showcase";
import { motion } from "@/components/marketing/motion";
import { Button } from "@/components/ui/button";

type AuthPageProps = {
  mode: "login" | "signup";
};

export function AuthPage({ mode }: AuthPageProps) {
  const isSignup = mode === "signup";

  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-2">
      <AuthShowcase mode={mode} />

      <div className="relative flex min-h-screen flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_70%)] lg:hidden" />

        <div className="relative mx-auto flex w-full max-w-md flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <Button
              nativeButton={false}
              variant="outline"
              size="sm"
              className="landing-glass w-fit text-muted-foreground hover:text-foreground"
              render={<Link href="/" />}
            >
              <ArrowLeftIcon data-icon="inline-start" />
              Home
            </Button>

            <Link
              href="/"
              className="flex items-center gap-2 lg:hidden"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2 text-primary-foreground">
                <StoreIcon className="size-4" />
              </div>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 lg:hidden"
          >
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              {isSignup
                ? "Start generating product content in minutes."
                : "Sign in to open your workspace."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <AuthForm mode={mode} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
