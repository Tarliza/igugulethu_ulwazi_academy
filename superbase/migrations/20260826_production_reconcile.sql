-- Igugulethu Ulwazi Academy production reconciliation migration.
-- This migration is additive/idempotent and aligns the live database with the
-- application's production auth/data model. Run in Supabase SQL editor after
-- reviewing it against any existing production data.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','staff','student');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = _user_id AND ur.role = _role
  );
$$;

DROP POLICY IF EXISTS "Users can read own role" ON public.user_roles;
CREATE POLICY "Users can read own role" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Add production fields needed by the student portal/payment lifecycle.
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS enrolled_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'paid';
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS access_until timestamptz;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

CREATE INDEX IF NOT EXISTS students_user_id_idx ON public.students(user_id);
CREATE INDEX IF NOT EXISTS students_student_number_idx ON public.students(student_number);
CREATE INDEX IF NOT EXISTS students_status_idx ON public.students(status);

-- Authoritative subject validation shared by registration and students.
CREATE OR REPLACE FUNCTION public.is_valid_academy_subjects(items text[])
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE item text;
BEGIN
  IF items IS NULL OR cardinality(items) = 0 THEN RETURN false; END IF;
  FOREACH item IN ARRAY items LOOP
    IF item NOT IN (
      'Mathematics','Physical Sciences','Life Science','Mathematical Literacy',
      'Economics','Business Studies','History','Geography','All Subjects'
    ) THEN
      RETURN false;
    END IF;
  END LOOP;
  RETURN cardinality(items) = cardinality(ARRAY(SELECT DISTINCT unnest(items)));
END;
$$;

ALTER TABLE public.registrations DROP CONSTRAINT IF EXISTS check_registration_subjects_valid;
ALTER TABLE public.registrations ADD CONSTRAINT check_registration_subjects_valid
CHECK (public.is_valid_academy_subjects(subjects));

ALTER TABLE public.students DROP CONSTRAINT IF EXISTS check_student_subjects_valid;
ALTER TABLE public.students ADD CONSTRAINT check_student_subjects_valid
CHECK (public.is_valid_academy_subjects(subjects));

-- Keep registration lifecycle explicit.
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS payment_reference text;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS reviewed_at timestamptz;

-- Private storage buckets. Do not make proof-of-payment public.
INSERT INTO storage.buckets (id, name, public)
VALUES ('academy-proof-of-payment', 'academy-proof-of-payment', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('academy-learning-resources', 'academy-learning-resources', false)
ON CONFLICT (id) DO NOTHING;

-- Staff can manage both buckets. Students never get proof-of-payment access.
DROP POLICY IF EXISTS "Staff manage academy proof of payment" ON storage.objects;
CREATE POLICY "Staff manage academy proof of payment" ON storage.objects
FOR ALL USING (
  bucket_id = 'academy-proof-of-payment'
  AND public.has_role(auth.uid(), 'admin')
) WITH CHECK (
  bucket_id = 'academy-proof-of-payment'
  AND public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Staff manage academy learning resources" ON storage.objects;
CREATE POLICY "Staff manage academy learning resources" ON storage.objects
FOR ALL USING (
  bucket_id = 'academy-learning-resources'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
) WITH CHECK (
  bucket_id = 'academy-learning-resources'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
);

-- Student read access to learning resources is enforced at row level in the
-- learning_resources table. Storage paths should be opaque; serve private files
-- using signed URLs after the row-level entitlement check.

-- Harden existing table policies for explicit role writes.
DROP POLICY IF EXISTS "Students read own record" ON public.students;
CREATE POLICY "Students read own record" ON public.students
FOR SELECT USING (
  user_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')
);

DROP POLICY IF EXISTS "Staff manage students" ON public.students;
CREATE POLICY "Staff manage students" ON public.students
FOR ALL USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')
) WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')
);

-- Students can only read grades belonging to themselves.
DROP POLICY IF EXISTS "Students view own grades" ON public.student_grades;
CREATE POLICY "Students view own grades" ON public.student_grades
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.students s
    WHERE s.id = student_id AND s.user_id = auth.uid() AND s.status = 'Active'
  ) OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')
);

DROP POLICY IF EXISTS "Staff manage grades" ON public.student_grades;
CREATE POLICY "Staff manage grades" ON public.student_grades
FOR ALL USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')
) WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')
);

-- R750 booking restriction enforced in the database.
DROP POLICY IF EXISTS "R750 students can create bookings" ON public.tutor_bookings;
CREATE POLICY "R750 students can create bookings" ON public.tutor_bookings
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.students s
    WHERE s.id = student_id
      AND s.user_id = auth.uid()
      AND s.plan = '3 Subjects'
      AND s.status = 'Active'
  )
);

DROP POLICY IF EXISTS "Students view own bookings" ON public.tutor_bookings;
CREATE POLICY "Students view own bookings" ON public.tutor_bookings
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND s.user_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')
);

DROP POLICY IF EXISTS "Staff manage bookings" ON public.tutor_bookings;
CREATE POLICY "Staff manage bookings" ON public.tutor_bookings
FOR ALL USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')
) WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')
);
