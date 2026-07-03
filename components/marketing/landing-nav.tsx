"use client";

import Link from "next/link";
import { MenuIcon, StoreIcon } from "lucide-react";

import { navLinks } from "@/components/marketing/data";
import { useLandingAuth } from "@/components/marketing/landing-auth-context";
import { LandingMobileMenu } from "@/components/marketing/landing-mobile-menu";
import { motion } from "@/components/marketing/motion";
import { Button } from "@/components/ui/button";
import {
  getStartCreatingHref,
  getWorkspaceHref,
} from "@/lib/marketing-links";
import { useUiStore } from "@/lib/stores/ui-store";

export function LandingNav() {
  const isAuthenticated = useLandingAuth();
  const menuOpen = useUiStore((state) => state.mobileMenuOpen);
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen);
  const workspaceHref = getWorkspaceHref(isAuthenticated);
  const startCreatingHref = getStartCreatingHref(isAuthenticated);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-sm">
              <StoreIcon className="size-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              AI Commerce Hub Studio
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              nativeButton={false}
              variant="ghost"
              render={<Link href={workspaceHref} />}
            >
              {isAuthenticated ? "Dashboard" : "Log in"}
            </Button>
            <Button
              nativeButton={false}
              render={<Link href={startCreatingHref} />}
            >
              Start creating
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="landing-glass md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </Button>
        </div>
      </motion.header>

      <LandingMobileMenu />
    </>
  );
}
