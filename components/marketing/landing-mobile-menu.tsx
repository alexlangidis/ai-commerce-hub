"use client";

import Link from "next/link";
import { ArrowRightIcon, ChevronRightIcon, SparklesIcon, StoreIcon } from "lucide-react";

import { navLinks } from "@/components/marketing/data";
import { useLandingAuth } from "@/components/marketing/landing-auth-context";
import { motion } from "@/components/marketing/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  getStartCreatingHref,
  getWorkspaceHref,
} from "@/lib/marketing-links";
import { useUiStore } from "@/lib/stores/ui-store";

export function LandingMobileMenu() {
  const isAuthenticated = useLandingAuth();
  const open = useUiStore((state) => state.mobileMenuOpen);
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen);
  const startCreatingHref = getStartCreatingHref(isAuthenticated);
  const workspaceHref = getWorkspaceHref(isAuthenticated);

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setMobileMenuOpen}>
      <SheetContent
        side="right"
        showCloseButton
        className="flex w-full flex-col gap-0 overflow-hidden border-l border-border/40 bg-background/80 p-0 backdrop-blur-2xl sm:max-w-sm"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">
          Browse AI Commerce Hub Studio sections and sign in.
        </SheetDescription>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_70%)]" />

        <div className="relative border-b border-border/50 px-5 py-5">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-sm">
              <StoreIcon className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold tracking-tight">
                AI Commerce Hub
              </span>
              <span className="text-xs text-muted-foreground">Studio</span>
            </div>
          </Link>
        </div>

        <div className="relative flex flex-1 flex-col overflow-y-auto px-4 py-5">
          <p className="mb-3 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Explore
          </p>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon;

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 16 }}
                  animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                  transition={{
                    delay: open ? 0.05 + index * 0.05 : 0,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-center gap-3 rounded-xl border border-transparent bg-card/30 px-3 py-3 transition-colors hover:border-primary/20 hover:bg-primary/5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{link.label}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </motion.a>
              );
            })}
          </nav>

          <Separator className="my-5" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: open ? 0.35 : 0, duration: 0.4 }}
            className="landing-glass rounded-xl p-4"
          >
            <Badge
              variant="secondary"
              className="mb-3 gap-1 border-primary/20 text-primary"
            >
              <SparklesIcon data-icon="inline-start" />
              Early access
            </Badge>
            <p className="text-sm leading-6 text-muted-foreground">
              Generate SEO-ready product copy in seconds — free to start.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: open ? 0.4 : 0, duration: 0.4 }}
          className="relative border-t border-border/50 bg-background/50 p-4 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-2">
            <Button
              nativeButton={false}
              className="landing-glow h-11 w-full"
              render={<Link href={startCreatingHref} onClick={closeMenu} />}
            >
              Start creating
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              className="landing-glass h-11 w-full"
              render={<Link href={workspaceHref} onClick={closeMenu} />}
            >
              {isAuthenticated ? "Dashboard" : "Log in"}
            </Button>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
