# Igugulethu Ulwazi Academy — Production Handover

This repository has been hardened against the most important prototype/security failures found in the uploaded GitHub ZIP.

## What was changed in this patch

- Removed the repository `.env` file from the deliverable and added `.env.example`.
- Updated `.gitignore` so `.env` and other local secrets are ignored.
- Removed the duplicated parent `PortalShell` from the staff route so child staff pages render exactly one shell.
- Added a real Supabase-authentication guard to both `/staff/*` and `/student/*` route trees.
- Replaced hardcoded staff login acceptance with real `supabase.auth.signInWithPassword` authentication.
- Replaced student login with real Supabase authentication, including Student Number → email lookup.
- Added a real password-reset request through Supabase.
- Removed seeded demo students/registrations/passwords from browser storage initialization.
- Removed the `password123` fallback and stopped persisting registration passwords in browser storage.
- Added a safe student-session snapshot bridge so the existing portal UI can render while the remaining data-layer migration is completed.
- Moved server-side Resend usage to `RESEND_API_KEY` instead of a `VITE_` secret.
- Added `supabase/migrations/20260826_production_reconcile.sql` to reconcile roles, payment lifecycle fields, subject validation, RLS, and private storage buckets.

## IMPORTANT — secrets

The original ZIP contained a real `.env`. Treat those values as exposed.

Rotate at least:

- Supabase service-role key
- Resend API key

Do not commit the replacement secrets to GitHub.

## GitHub.dev

1. Replace the repository contents with the files from this package.
2. Keep `.env` out of GitHub.
3. In GitHub.dev, create local `.env` only when testing locally, using `.env.example` as the template.

Client variables:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Server-only variables:

```text
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
```

Never prefix a server secret with `VITE_`.

## Supabase — do these steps manually

### A. SQL Editor

Run `supabase/migrations/20260826_production_reconcile.sql` after reviewing it against your existing database.

The migration is additive and is intended to reconcile the current schema.

### B. Auth users and staff

Create each staff/tutor account under Supabase Authentication → Users.
Then insert a corresponding row in `public.user_roles`:

```sql
insert into public.user_roles (user_id, role)
values ('AUTH_USER_UUID_HERE', 'staff');
```

Use `admin` for the owner/admin account.

Students must also have an Auth user and a matching `public.students.user_id`.

### C. Storage

The migration creates these private buckets:

- `academy-proof-of-payment`
- `academy-learning-resources`

Do not make the proof-of-payment bucket public.

### D. Supabase URL configuration

In Authentication → URL Configuration:

- Site URL: your production Vercel URL
- Redirect URLs: your Vercel URL plus `/student-login`

For local development also add the local URL you actually use.

## Vercel

In Project Settings → Environment Variables add the four server/client variables from `.env.example`.

Do not add the old `VITE_RESEND_API_KEY`.

After changing secrets, redeploy the application.

## Current limitation you should understand

The uploaded project still contains legacy synchronous portal helpers in `src/lib/student-storage.ts`. This patch prevents those helpers from seeding fake credentials and adds real Supabase authentication/route protection, but the remaining CRUD screens must be migrated fully to Supabase before declaring the application completely production-ready.

Do NOT market the current patch as fully production-complete until that data-layer migration is finished and verified with real student/staff accounts.
