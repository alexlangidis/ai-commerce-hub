"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { signInDemo } from "@/lib/demo-login";
import { Button } from "@/components/ui/button";

export function DemoLoginButton({ className }: { className?: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleDemoLogin() {
    setIsSubmitting(true);
    const result = await signInDemo();

    if (!result.success) {
      toast.error(result.error ?? "Demo login failed.");
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant="secondary"
      className={className}
      onClick={handleDemoLogin}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Opening..." : "Demo"}
    </Button>
  );
}
