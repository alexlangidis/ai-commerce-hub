import { AuthStatus } from "@/components/AuthStatus";

export default function Home() {
  return (
    <main className="flex min-h-full flex-1 bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="mx-auto flex w-full max-w-4xl flex-col justify-center gap-10">
        <div className="flex flex-col gap-5">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            AI Commerce Hub
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            Commerce workspace with auth and database ready.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            The app now has Better Auth, Drizzle, and Neon connected. Use the
            auth pages to create an account and verify the session flow before
            we add the product features.
          </p>
        </div>
        <AuthStatus />
      </div>
    </main>
  );
}
