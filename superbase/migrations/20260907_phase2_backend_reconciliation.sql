-- Phase 2 backend reconciliation for Igugulethu Ulwazi Academy.
-- Add missing portal collections and close the anonymous storage-upload hole.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT public.has_role(_user_id, 'admin') OR public.has_role(_user_id, 'staff'); $$;

CREATE TABLE IF NOT EXISTS public.student_grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject text NOT NULL,
  assessment_name text NOT NULL,
  score numeric NOT NULL CHECK (score >= 0),
  max_score numeric NOT NULL CHECK (max_score > 0),
  tutor_feedback text,
  captured_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.live_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  tutor_name text NOT NULL,
  teams_link text NOT NULL,
  session_date date NOT NULL,
  time_slot text NOT NULL,
  notes text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.tutor_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject text NOT NULL,
  booking_date date NOT NULL,
  time_slot text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS student_grades_student_id_idx ON public.student_grades(student_id);
CREATE INDEX IF NOT EXISTS student_grades_subject_idx ON public.student_grades(subject);
CREATE INDEX IF NOT EXISTS live_sessions_date_idx ON public.live_sessions(session_date);
CREATE INDEX IF NOT EXISTS live_sessions_subject_idx ON public.live_sessions(subject);
CREATE INDEX IF NOT EXISTS tutor_bookings_student_id_idx ON public.tutor_bookings(student_id);
CREATE INDEX IF NOT EXISTS tutor_bookings_date_idx ON public.tutor_bookings(booking_date);

ALTER TABLE public.student_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students view own grades" ON public.student_grades;
CREATE POLICY "Students view own grades" ON public.student_grades FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_grades.student_id AND s.user_id = auth.uid() AND s.status = 'Active') OR public.is_staff(auth.uid()));
DROP POLICY IF EXISTS "Staff manage grades" ON public.student_grades;
CREATE POLICY "Staff manage grades" ON public.student_grades FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Students view live sessions" ON public.live_sessions;
CREATE POLICY "Students view live sessions" ON public.live_sessions FOR SELECT TO authenticated USING (public.is_staff(auth.uid()) OR EXISTS (SELECT 1 FROM public.students s WHERE s.user_id = auth.uid() AND s.status = 'Active' AND (live_sessions.subject = ANY(s.subjects) OR live_sessions.subject = 'All Subjects')));
DROP POLICY IF EXISTS "Staff manage live sessions" ON public.live_sessions;
CREATE POLICY "Staff manage live sessions" ON public.live_sessions FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "R750 students create bookings" ON public.tutor_bookings;
DROP POLICY IF EXISTS "R750 students can create bookings" ON public.tutor_bookings;
CREATE POLICY "R750 students create bookings" ON public.tutor_bookings FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.students s WHERE s.id = tutor_bookings.student_id AND s.user_id = auth.uid() AND s.plan IN ('3 Subjects','3-subjects') AND s.status = 'Active'));
DROP POLICY IF EXISTS "Students view own bookings" ON public.tutor_bookings;
CREATE POLICY "Students view own bookings" ON public.tutor_bookings FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = tutor_bookings.student_id AND s.user_id = auth.uid()) OR public.is_staff(auth.uid()));
DROP POLICY IF EXISTS "Staff manage bookings" ON public.tutor_bookings;
CREATE POLICY "Staff manage bookings" ON public.tutor_bookings FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "All authenticated users view announcements" ON public.announcements;
CREATE POLICY "All authenticated users view announcements" ON public.announcements FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Staff manage announcements" ON public.announcements;
CREATE POLICY "Staff manage announcements" ON public.announcements FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Critical security fix: anonymous users must never be able to upload arbitrary objects.
DROP POLICY IF EXISTS "Allow public uploads pvt73t_0" ON storage.objects;
DROP POLICY IF EXISTS "Students upload own proof of payment" ON storage.objects;
CREATE POLICY "Students upload own proof of payment" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'academy-proof-of-payment' AND (storage.foldername(name))[1] = auth.uid()::text);
DROP POLICY IF EXISTS "Students view own proof of payment" ON storage.objects;
CREATE POLICY "Students view own proof of payment" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'academy-proof-of-payment' AND (storage.foldername(name))[1] = auth.uid()::text);
