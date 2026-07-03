<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project conventions

This project should stay simple enough for a junior developer to follow. Prefer small files, clear names, and predictable folders over clever abstractions.

## Installed stack

- Framework: Next.js App Router, React, TypeScript.
- Styling/UI: Tailwind CSS v4, shadcn/ui, Lucide icons, Sonner toasts.
- Forms/validation: React Hook Form, Zod, `@hookform/resolvers`.
- Data fetching/tables: TanStack Query and TanStack Table.
- State: Zustand for small client-only state.
- Database: Neon PostgreSQL with Drizzle ORM and Drizzle Kit migrations.
- Auth: Better Auth using the Drizzle adapter.
- Rich content/charts/dates: Tiptap, Recharts, `date-fns`.
- AI, when needed later: OpenAI SDK and Gemini SDK.

## Commands

- Use `npm run dev` for local development.
- Use `npm run lint` before considering work complete.
- Use `npm run build` before pushing or deploying meaningful changes.
- Use `npm run db:generate` after changing `db/schema.ts`.
- Use `npm run db:migrate` to apply generated migrations.
- Use `npm run db:studio` to inspect the database locally.
- Use `npm run auth:generate` only when Better Auth schema options change.

## Folder structure

- `app/`: routes, layouts, route groups, and route handlers.
- `app/(auth)/`: login/signup and other auth UI pages. Route groups must not change public URLs.
- `app/(app)/`: authenticated app pages. Protect this group with `requireSession()`.
- `app/api/`: server route handlers only. Keep Better Auth at `app/api/auth/[...all]/route.ts`.
- `components/`: app-level reusable components.
- `components/ui/`: shadcn/ui components only. Do not mix feature components here.
- `db/schema.ts`: Drizzle table definitions and relations.
- `drizzle/`: generated migration SQL and metadata.
- `lib/`: shared infrastructure helpers such as `auth`, `auth-client`, `db`, and utilities.
- Add feature folders only when a feature has more than one file. Prefer `features/<feature-name>/` for larger flows.

## Next.js rules

- Read the relevant docs in `node_modules/next/dist/docs/` before using unfamiliar Next.js APIs.
- Server Components are the default. Add `"use client"` only for state, effects, browser APIs, event handlers, or client hooks.
- Keep route handlers thin. Put reusable server logic in `lib/` or a feature folder.
- Do not read secrets in Client Components.
- Keep public routes stable unless the user explicitly asks for a URL change.

## UI and styling

- Keep Tailwind v4 setup in `app/globals.css` simple unless there is a clear design-system reason to expand it.
- Use shadcn/ui components when they fit the need, especially forms, dialogs, tables, dropdowns, buttons, and toasts.
- Use `cn()` from `lib/utils.ts` for conditional class names.
- Use Lucide icons for icon buttons and common actions.
- Keep forms and dashboards practical, compact, and readable. Avoid decorative layouts before the app needs them.

## Forms and validation

- Use React Hook Form for user-submitted forms.
- Use Zod schemas for validation and infer TypeScript types from the schema.
- Put small form schemas beside the component. Move schemas to a shared file only when reused.
- Show field-level validation messages for user-fixable errors.
- Keep server or API errors separate from field validation errors.

## Auth

- Use Better Auth for all authentication.
- Use `authClient` from `lib/auth-client.ts` in Client Components.
- Use `auth` from `lib/auth.ts` on the server.
- Use `getCurrentSession()` and `requireSession()` from `lib/session.ts` for server-side session checks.
- Keep login and signup pages under `app/(auth)`.
- Do not add Neon Auth. Neon is the database; Better Auth owns authentication.

## Database

- Use Drizzle ORM for database access.
- Keep all table definitions and relations in `db/schema.ts` until the file becomes hard to scan.
- Generate migrations with `npm run db:generate`; do not hand-edit generated migration metadata.
- Apply migrations with `npm run db:migrate`.
- Use Neon PostgreSQL through `DATABASE_URL`.
- Do not commit database credentials or real `.env.local` values.

## Client state and server state

- Use TanStack Query for async server data in Client Components.
- Use Zustand only for local UI/app state that is not owned by the server.
- Do not duplicate server data into Zustand unless there is a clear interaction reason.
- Use TanStack Table for non-trivial tables instead of hand-rolled table state.

## Environment variables

- Required local variables live in `.env.local`.
- Document required variables in `.env.example`.
- Never commit real secrets.
- Vercel needs its own environment variables; local `.env.local` is not available during Vercel builds.
- Current required server variables: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`.

## Code style

- Prefer explicit, boring names: `AuthForm`, `ProductTable`, `createProduct`, `getSession`.
- Keep components focused. If a component mixes data loading, mutation, and lots of markup, split it.
- Avoid premature abstraction. Extract helpers when duplication is real or a file becomes hard to read.
- Keep junior readability in mind: a new developer should know where to look from the route name, component name, and folder name.
- Do not introduce new libraries if the installed stack already solves the problem.
