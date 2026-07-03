import type { Metadata } from "next";

import { AuthPage } from "@/components/auth/auth-page";

export const metadata: Metadata = {
  title: "Sign up | AI Commerce Hub Studio",
  description: "Create your AI Commerce Hub Studio account.",
};

export default function SignupPage() {
  return <AuthPage mode="signup" />;
}
