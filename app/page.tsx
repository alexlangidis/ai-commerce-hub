import type { Metadata } from "next";

import { LandingPage } from "@/components/marketing/landing-page";
import { getCurrentSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "AI Commerce Hub Studio | AI E-commerce Content Platform",
  description:
    "Generate, rewrite, translate, and SEO-optimize product content in seconds. The modern AI workspace for high-converting e-commerce listings.",
};

export default async function Home() {
  const session = await getCurrentSession();

  return <LandingPage isAuthenticated={Boolean(session)} />;
}
