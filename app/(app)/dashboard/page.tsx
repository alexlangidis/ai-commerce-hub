export default function DashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <section className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
          Welcome to your workspace
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          This protected area is ready for the commerce features. Every route
          inside `app/(app)` will require a valid Better Auth session.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-950">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Auth</p>
          <p className="mt-2 text-lg font-medium text-zinc-950 dark:text-zinc-50">
            Session active
          </p>
        </div>
        <div className="rounded-lg border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-950">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Database</p>
          <p className="mt-2 text-lg font-medium text-zinc-950 dark:text-zinc-50">
            Neon connected
          </p>
        </div>
        <div className="rounded-lg border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-950">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Next</p>
          <p className="mt-2 text-lg font-medium text-zinc-950 dark:text-zinc-50">
            Protected route
          </p>
        </div>
      </section>
    </main>
  );
}
