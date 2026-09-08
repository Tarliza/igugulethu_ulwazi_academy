-- Public registration is now handled by submit-registration Edge Function.
-- Keep direct pending-registration writes staff-only so anonymous clients cannot bypass
-- server-side validation and secure proof-of-payment storage.

DROP POLICY IF EXISTS "Public submit pending registration" ON public.pending_registrations;

CREATE POLICY "Staff insert pending registrations"
  ON public.pending_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (is_staff(auth.uid()));
