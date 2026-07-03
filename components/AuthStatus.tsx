"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        Checking session...
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-black/10 bg-white p-4 text-sm dark:border-white/10 dark:bg-zinc-950 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-zinc-950 dark:text-zinc-50">
            {session.user.name}
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            {session.user.email}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="h-10 rounded-md border border-black/10 px-4 font-medium text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/15 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          {isSigningOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href="/login"
        className="flex h-11 items-center justify-center rounded-md border border-black/10 px-5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 dark:border-white/15 dark:text-zinc-50 dark:hover:bg-zinc-900"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="flex h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        Create account
      </Link>
    </div>
  );
}
