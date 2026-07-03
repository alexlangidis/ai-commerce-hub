"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export function AuthStatus() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await authClient.signOut();
    router.refresh();
    setIsSigningOut(false);
  }

  if (isPending) {
    return (
      <p className="text-sm text-muted-foreground">Checking session...</p>
    );
  }

  if (session) {
    return (
      <Card className="max-w-xl">
        <CardHeader className="pb-3">
          <CardTitle>{session.user.name}</CardTitle>
          <CardDescription>{session.user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        nativeButton={false}
        variant="outline"
        render={<Link href="/login" />}
      >
        Log in
      </Button>
      <Button nativeButton={false} render={<Link href="/signup" />}>
        Create account
      </Button>
    </div>
  );
}
