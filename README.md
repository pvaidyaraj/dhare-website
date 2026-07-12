# Dhare Foundation Website

The public website and admin system for **Dhare Foundation**, a nonprofit working on tree
plantation and greenbelt restoration in Karnataka, India (including the "Green Ring
Bengaluru" initiative). Live at **[dharefoundation.org](https://www.dharefoundation.org)**.

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack) + **React 19** + TypeScript
- **Tailwind CSS 4** for styling
- **[next-intl](https://next-intl.dev)** for internationalization (English + Kannada)
- **[Supabase](https://supabase.com)** (Postgres + Storage) as the database and file storage,
  accessed via the service-role key from server-side code only — no client-side Supabase access
- **react-hook-form + zod** for form validation
- **bcryptjs** for password hashing (staff login)
- Deployed on **Vercel**, auto-deploying on every push to `master`

> **Note:** this project runs Next.js 16, which has breaking changes vs. older Next.js
> versions/training data. See `AGENTS.md` before making framework-level changes.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` with:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key (server-only; bypasses RLS) |
| `SESSION_SECRET` | Random secret signing staff login sessions (`openssl rand -base64 32`) |
| `LAUNCH_ADMIN_KEY` | Query-param key to re-lock the site via `/launch?admin=<key>` |

`ADMIN_PASSWORD`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` may still be present from
earlier work but are currently unused (see [Donations](#donations-current-state) below).

**⚠️ Dev and production currently share the same Supabase project** — there is no separate
staging database. Be careful testing locally; anything you create (registrations, plantation
sites, staff accounts) is real, live data.

### Database setup

There's no formal migration tool — `supabase-setup.sql` is an append-only log of `create table` /
`alter table` statements. Each dated section is meant to be pasted into the Supabase SQL Editor
**once**. When adding a new table/column, append a new section rather than editing history, and
note in a comment whether it's safe to re-run (`if not exists`, `on conflict do nothing`, etc.).

## Project structure

```
app/
  [locale]/            Public pages that are locale-aware (next-intl): homepage, launch,
                        register-saplings, team, volunteer — each usually a thin wrapper
                        around a shared component living in a flat sibling folder
                        (e.g. app/register-saplings/SaplingRegistrationForm.tsx)
  actions/              Server actions for public-facing forms (sapling.ts, volunteer.ts,
                        launch.ts, donation-related files are legacy/unused)
  admin/                Admin dashboard (flat route, NOT locale-prefixed) — see below
  login/                Shared staff login (flat route) for both Admin and Site Coordinator
  coordinator/           Site Coordinator dashboard (flat route, placeholder — see below)
  components/            Shared public-site UI (Navbar, homepage sections, forms, etc.)
  data/                  Static reference data (Karnataka districts, assembly constituencies)
lib/
  supabase.ts            The one Supabase client factory (service-role, server-only)
  plantations.ts         Read functions for plantation_sites / plantation_media
  settings.ts             getSaplingsPlanted() — the public homepage counter
  auth/
    session.ts            Signed session cookie (HMAC), role checks, isAuthenticated()
    staffUsers.ts          staff_users lookups, password hashing, getSiteCoordinators()
i18n/                    next-intl routing config (locales: en, kn)
messages/                en.json / kn.json translation strings
scripts/                 One-off Node scripts (create-staff-user.mjs, DB smoke tests)
supabase-setup.sql        Append-only schema log (see Database setup above)
```

Two routing conventions coexist on purpose: most public pages live under `app/[locale]/` (so
next-intl can prefix them, e.g. `/kn/volunteer`); `admin`, `login`, and `coordinator` are flat,
non-locale routes (internal tools, English-only), explicitly excluded from the locale middleware
in `proxy.ts`'s matcher.

## Features

### Public website
- **Homepage** — hero with a live "saplings planted" counter, About/mission section, an MoU
  section, the "Green Ring Bengaluru" greenbelt initiative, major projects grid, "why trees
  matter" education section, traditional-plantation and Miyawaki-method explainers, a photo
  gallery, a media-coverage carousel, donation info, and a volunteer call-to-action.
- **Sapling registration** (`/register-saplings`) — bulk sapling request form (constituency,
  contact details, quantity ≥ 51), writes to `sapling_registrations`.
- **Volunteer registration** (`/volunteer`) — full volunteer intake form (skills, availability,
  motivation), writes to `volunteer_registrations`.
- **Team page** (`/team`) — static Board of Directors bios.
- **Launch page** (`/launch`) — a global site-activation gate: when `site_settings.launch_active`
  is `true`, every visit to `/` redirects here instead, showing a "coming soon" screen with a
  LAUNCH button that flips the flag off. Re-locking the site is done via
  `/launch?admin=<LAUNCH_ADMIN_KEY>`.
- **Internationalization** — English (default) and Kannada (`/kn/...`), switchable via the navbar.

### Donations (current state)
A Razorpay online-checkout integration was built, then **reverted** after testing (see git
history: "Integrate Razorpay..." followed by "Revert..."). The Donate section currently shows
tiered suggested amounts and opens a modal with bank transfer details — no online payment or
transaction recording happens today. Rebuilding this with Razorpay (with a proper receipt/
confirmation step and donation record-keeping) is planned future work.

### Staff system (Admin + Site Coordinator)
- **Login** (`/login`) — a single login page with role tabs (Admin / Site Coordinator).
  Accounts live in the `staff_users` table (name, username, email, bcrypt password hash, role),
  created via the admin dashboard or `scripts/create-staff-user.mjs`. Sessions are a signed
  (HMAC-SHA256) cookie carrying `{ userId, role, name }`, verified server-side on every
  request to `/admin` or `/coordinator` (see `lib/auth/session.ts`).
- **Admin dashboard** (`/admin`) — tabbed interface:
  - **Plantation Sites** — record new plantation sites (year, district, location, address, GPS
    coordinates, tree count, photos/videos uploaded to Supabase Storage), edit existing sites
    (adding more media only — replace/remove is not yet supported), and click a site's GPS
    coordinates to view it on an embedded Google Map.
  - **Sapling Registrations** / **Volunteer Registrations** — searchable tables of form
    submissions with CSV export.
  - **Site Coordinators** — register new Site Coordinator accounts and view the list of
    existing ones.
  - **Settings** — edit the public "Saplings Planted" counter shown on the homepage.
- **Site Coordinator dashboard** (`/coordinator`) — currently a placeholder; coordinator-specific
  features are planned but not yet built.

## Deployment

Pushing to `master` triggers an automatic Vercel production deployment — **there is no staging
environment or CI gate**. Before pushing:

```bash
npx tsc --noEmit   # typecheck
npm run build      # full production build
```

Any new environment variables must be added to Vercel (Project Settings → Environment Variables,
or `vercel env add <NAME> production`) *before* pushing code that depends on them, or the live
site will error immediately after deploy.
