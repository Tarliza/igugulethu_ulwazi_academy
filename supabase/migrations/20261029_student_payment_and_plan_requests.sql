-- Phase 3: persist student-requested subscription plan changes for staff review.
-- This migration is staged in Git only; it has not been applied to Supabase.
CREATE TABLE IF NOT EXISTS public.plan_change_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_plan text NOT NULL,
  requested_plan text NOT NULL CHECK (requested_plan IN ('1 Subject', '2 Subjects', '3 Subjects')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  CONSTRAINT plan_change_not_same_plan CHECK (current_plan <> requested_plan)
);

CREATE INDEX IF NOT EXISTS plan_change_requests_student_created_idx
  ON public.plan_change_requests (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS plan_change_requests_status_created_idx
  ON public.plan_change_requests (status, created_at DESC);

ALTER TABLE public.plan_change_requests ENABLE ROW LEVEL SECURITY;

-- Students may submit a payment row only as pending. Verification fields and status
-- remain staff-controlled; the client cannot mark its own payment as paid.
DROP POLICY IF EXISTS "Students submit own payments" ON public.payments;
CREATE POLICY "Students submit own payments"
  ON public.payments FOR INSERT TO authenticated
  WITH CHECK (
    student_id = auth.uid()
    AND status = 'pending'
    AND reviewed_by IS NULL
    AND reviewed_at IS NULL
    AND file_path LIKE (auth.uid()::text || '/%')
  );


DROP POLICY IF EXISTS "Students read own plan change requests" ON public.plan_change_requests;
CREATE POLICY "Students read own plan change requests"
  ON public.plan_change_requests FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Students submit own plan change requests" ON public.plan_change_requests;
CREATE POLICY "Students submit own plan change requests"
  ON public.plan_change_requests FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = plan_change_requests.student_id
        AND s.user_id = auth.uid()
    )
    AND status = 'pending'
    AND reviewed_by IS NULL
    AND reviewed_at IS NULL
  );

DROP POLICY IF EXISTS "Staff manage plan change requests" ON public.plan_change_requests;
CREATE POLICY "Staff manage plan change requests"
  ON public.plan_change_requests FOR ALL TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));
