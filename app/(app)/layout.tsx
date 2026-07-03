import Link from "next/link";

import { SignOutButton } from "@/components/SignOutButton";
import { requireSession } from "@/lib/session";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 dark:bg-black">
      <header className="border-b border-black/10 bg-white dark:border-white/10 dark:bg-zinc-950">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <Link
              href="/dashboard"
              className="text-lg font-semibold text-zinc-950 dark:text-zinc-50"
            >
              AI Commerce Hub
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {session.user.email}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <nav className="flex gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <Link
                href="/dashboard"
                className="transition hover:text-zinc-950 dark:hover:text-zinc-50"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/brand-voice"
                className="transition hover:text-zinc-950 dark:hover:text-zinc-50"
              >
                Brand Voice
              </Link>
            </nav>
            <SignOutButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
