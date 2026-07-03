"use client";

import { LandingComparison } from "@/components/marketing/landing-comparison";
import { LandingAuthProvider } from "@/components/marketing/landing-auth-context";
import { LandingCta } from "@/components/marketing/landing-cta";
import { LandingDashboard } from "@/components/marketing/landing-dashboard";
import { LandingFeatures } from "@/components/marketing/landing-features";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingNav } from "@/components/marketing/landing-nav";
import { LandingPricing } from "@/components/marketing/landing-pricing";
import { LandingWorkflow } from "@/components/marketing/landing-workflow";

type LandingPageProps = {
  isAuthenticated: boolean;
};

export function LandingPage({ isAuthenticated }: LandingPageProps) {
  return (
    <LandingAuthProvider isAuthenticated={isAuthenticated}>
      <div className="landing-theme min-h-screen">
        <LandingNav />
        <main>
          <LandingHero />
          <LandingFeatures />
          <LandingWorkflow />
          <LandingComparison />
          <LandingDashboard />
          <LandingPricing />
          <LandingCta />
        </main>
        <footer className="border-t border-border/60 px-4 py-8 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} AI Commerce Hub Studio</p>
            <p>Built for modern e-commerce content teams.</p>
          </div>
        </footer>
      </div>
    </LandingAuthProvider>
  );
}
