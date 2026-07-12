@AGENTS.md

# Project-specific notes

See `README.md` for the full project overview, features, and setup instructions. This file
covers conventions and gotchas specific to working in this codebase.

## Architecture at a glance

- **Public site**: locale-aware pages under `app/[locale]/`, most rendering a shared component
  from a flat sibling folder (e.g. `app/[locale]/volunteer/page.tsx` renders
  `app/components/VolunteerForm.tsx`). Server actions for these live in `app/actions/`.
- **Staff system**: `app/admin/`, `app/login/`, `app/coordinator/` are flat routes (not under
  `[locale]`) — explicitly excluded from the next-intl middleware in `proxy.ts`'s matcher.
  Each route owns its own `layout.tsx` with `<html>/<body>` since it opts out of the locale
  layout entirely.
- **Auth**: `lib/auth/session.ts` (signed cookie, role checks) and `lib/auth/staffUsers.ts`
  (credential lookups) are the single source of truth. Don't duplicate session/cookie logic
  elsewhere — import `isAuthenticated()` / `requireRole()` from there.
- **Admin server actions are split by domain**, not in one file: `app/admin/registrationActions.ts`
  (sapling/volunteer reads + the saplings-planted counter), `app/admin/plantationActions.ts`
  (plantation site CRUD + media upload), `app/admin/staffActions.ts` (coordinator registration).
  Keep this split — it used to be one 293-line `actions.ts` and became hard to navigate.

## Known gotchas

- **Don't re-export a Server Action from a different `"use server"` file** (e.g.
  `export { logout } from "@/app/login/actions"` inside another `"use server"` file). This breaks
  Turbopack's server-action bundling at runtime ("module has no exports") even though `tsc`
  passes cleanly. Instead, have the consuming component import the action directly from its
  original file. Re-exporting a *plain* (non-`"use server"`) helper — like `getSaplingsPlanted`
  from `lib/settings.ts` — is fine.
- **Dev and production share one Supabase project** — there is no staging database. Test data
  created locally is real, live data (this is how the "UB City" test plantation entry ended up
  in production).
- **`supabase-setup.sql` is append-only, not a migration tool.** Never rewrite old sections —
  add a new dated section at the bottom, and make it idempotent (`if not exists`,
  `on conflict do nothing`) if there's any chance it's already been run somewhere.
- **Pushing to `master` deploys to production immediately** — no CI gate, no staging. Always run
  `npx tsc --noEmit` and `npm run build` locally before pushing. New env vars must be added to
  Vercel *before* the code that needs them ships, or the live site breaks on deploy.
- **No automated tests exist.** `playwright` is a dependency only for the ad-hoc
  `screenshot.mjs` utility script, not a test suite. Verification today is `tsc` + `next build` +
  manual browser checks — be thorough with manual verification since nothing else will catch a
  regression.
