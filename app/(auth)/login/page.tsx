import type { Metadata } from "next";

import { AuthPage } from "@/components/auth/auth-page";

export const metadata: Metadata = {
  title: "Log in | AI Commerce Hub Studio",
  description: "Sign in to your AI Commerce Hub Studio workspace.",
};

export default function LoginPage() {
  return <AuthPage mode="login" />;
}
