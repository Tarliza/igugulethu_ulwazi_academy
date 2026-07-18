# Production Hardening Plan

Turn the current localStorage demo into a real, secure, deployable app: Supabase-backed data, real login for students and staff, role-based access, and actual credential emails via Lovable Emails.

## 1. Database schema (one migration)

Tables in `public`:

- **profiles** — one row per auth user. Fields: `id` (FK → `auth.users`), `first_name`, `last_name`, `phone`, `email`. Auto-created via trigger on `auth.users` insert.
- **user_roles** — role assignments. Enum `app_role` = `('admin', 'staff', 'student')`. Fields: `user_id`, `role`. Uses `has_role(uuid, app_role)` security-definer function (avoids RLS recursion).
- **pending_registrations** — public sign-up submissions from `/register`. Fields: `first_name`, `last_name`, `email` (unique), `phone`, `grade`, `school`, `plan`, `subjects` (text[]), `status` (`pending` | `activated`), `submitted_at`. Anyone can INSERT; only staff/admin can SELECT/UPDATE.
- **students** — activated student records. Fields: `user_id` (FK → `auth.users`), `student_number` (unique), `grade`, `school`, `plan`, `subjects` (text[]), `activated_by`. Student can SELECT own row; staff/admin full access.

RLS on all tables. Standard `GRANT` blocks + `updated_at` trigger.

## 2. Seed founder / admin

After migration, tell **moiane158@gmail.com** to sign up once at `/staff-login`. I then insert his `user_roles` row as `admin` via the insert tool. Admins can add other staff from the staff dashboard later.

## 3. Real authentication

- **`/student-login`**: replace demo form with `supabase.auth.signInWithPassword`. Session-aware header + sign-out.
- **`/staff-login`**: same, plus post-login check that user has role `staff` or `admin` (otherwise sign out + show error).
- **`_authenticated` layout**: use the integration-managed gate for signed-in-only routes.
- **`/staff/*` role gate**: a `_staff` child layout that calls a `requireStaff` server fn (rejects non-staff/admin).

## 4. Wire `/register` to Supabase

Public server fn `submitRegistration` inserts into `pending_registrations` (still saves locally as fallback for the confirmation screen).

## 5. Wire `/staff` "Add New Student" to real flow

Server fn `activateStudent` (staff-only, via `requireSupabaseAuth` + `has_role` check):
1. Generates `student_number` (e.g. `RA-2026-0001`) + strong random password.
2. Creates auth user via `supabaseAdmin.auth.admin.createUser` (email confirmed).
3. Assigns `student` role and inserts `students` row with subjects pulled from matching `pending_registrations`.
4. Marks pending row `activated`.
5. Sends credential email (see next step).
6. Returns `{ studentNumber, email }` to UI. Password is **never** returned to the browser.

## 6. Credential emails via Lovable Emails

- Run `email_domain--scaffold_auth_email_templates` (uses the Lovable-managed domain).
- Add a transactional template `student-credentials` that sends the student their login email + password + student number + link to `/student-login`.
- Style to match site (dark navy / academy brand).

## 7. Staff dashboard data

Replace hardcoded KPIs on `/staff` with real counts (pending registrations, active students, subjects). List pending registrations so admin can activate them with one click.

## 8. Cleanup

- Remove localStorage `student-storage.ts` reads from staff/register pages (keep only for the transient confirmation screen).
- Add proper `head()` titles/descriptions on leaf routes.
- Leave placeholder bank details as-is; flag them for the user to replace before publish.

## Technical notes

- Admin operations use `supabaseAdmin` imported **inside** the handler (`await import(...)`) to keep the service-role module out of the client bundle.
- Password generation: 16-char random from `crypto.getRandomValues` on the server.
- Student number: `RA-<year>-<zero-padded sequence>` computed server-side.
- No new secrets required (LOVABLE_API_KEY, SUPABASE_* already present).

## Out of scope (call out but don't build now)

- Proof-of-payment upload, bookings, messages, resources pages (still stubs).
- Custom email domain (can swap in later without code changes).
- Real banking details on `/register`.

## Deliverables order

1. Migration (schema + RLS + trigger + `has_role`).
2. Server fns: `submitRegistration`, `activateStudent`, `requireStaff`, `listPendingRegistrations`, `getStaffStats`.
3. Auth wiring on `/student-login` and `/staff-login` + role gate.
4. `/register` + `/staff` UI updates.
5. Email templates scaffold + `student-credentials` transactional email.
6. Seed admin role for moiane158@gmail.com after he signs up.
