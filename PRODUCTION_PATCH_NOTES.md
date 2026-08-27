# Production Patch Notes — 26 Aug 2026

This package was created from the GitHub ZIP you supplied, not from Gemini's report.

## Verified problems in the supplied repository

- Staff portal parent and child routes both rendered `PortalShell`.
- Staff login accepted hardcoded email addresses and did not verify the password.
- Browser storage contained seeded demo users and `password123`.
- Registration stored password data in browser storage.
- Server-side Resend usage referenced a `VITE_` secret.
- Supabase types and SQL migrations referenced different table models.
- Repository contained a real `.env` file and `.gitignore` did not exclude it.
- Portal CRUD still contains legacy localStorage-backed helpers and therefore is not yet safe to call a final production backend.

## This patch fixes

- Secret-bearing `.env` removed from the package.
- `.gitignore` hardened.
- `.env.example` added.
- Staff route converted to a single protected parent layout with child `Outlet` rendering.
- Student route protected with Supabase authentication and student-record checks.
- Staff login now uses `supabase.auth.signInWithPassword`.
- Student login now uses Supabase Auth and supports Student Number lookup.
- Supabase password-reset request added.
- Demo/seeded browser records removed.
- `password123` fallbacks removed.
- Registration passwords are no longer persisted in browser storage.
- Portal logout now signs out of Supabase.
- Server-side Resend now expects `RESEND_API_KEY`, never `VITE_RESEND_API_KEY`.
- Production reconciliation migration and setup guide added.

## Not yet honestly certified as production-complete

The remaining legacy portal data layer in `src/lib/student-storage.ts` still contains synchronous localStorage-backed CRUD helpers. They should be migrated to Supabase-backed asynchronous operations and real Storage uploads before client launch.

Do not skip that migration merely because the login and route protection now use Supabase.
