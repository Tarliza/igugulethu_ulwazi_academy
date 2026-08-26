-- ==============================================================================
-- IGUGULETHU ULWAZI ACADEMY — PRODUCTION DATABASE SCHEMA & ROW LEVEL SECURITY
-- ==============================================================================

-- 1. Create Enums
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('student', 'staff', 'admin');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE registration_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE student_status AS ENUM ('Active', 'Access Denied', 'Payment Overdue');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE subscription_plan AS ENUM ('1 Subject', '2 Subjects', '3 Subjects');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 2. Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Student Registrations (Public submissions awaiting staff proof-of-payment approval)
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  grade TEXT NOT NULL,
  school TEXT NOT NULL,
  subjects TEXT[] NOT NULL,
  plan subscription_plan NOT NULL,
  amount TEXT NOT NULL,
  proof_of_payment_url TEXT,
  status registration_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT check_subject_count CHECK (
    (plan = '1 Subject' AND array_length(subjects, 1) = 1) OR
    (plan = '2 Subjects' AND array_length(subjects, 1) = 2) OR
    (plan = '3 Subjects' AND array_length(subjects, 1) = 3)
  )
);

-- 4. Active Enrolled Students Table
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  student_number TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  grade TEXT NOT NULL,
  school TEXT NOT NULL,
  subjects TEXT[] NOT NULL,
  plan subscription_plan NOT NULL,
  amount TEXT NOT NULL,
  status student_status NOT NULL DEFAULT 'Active',
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT check_enrolled_subject_count CHECK (
    (plan = '1 Subject' AND array_length(subjects, 1) = 1) OR
    (plan = '2 Subjects' AND array_length(subjects, 1) = 2) OR
    (plan = '3 Subjects' AND array_length(subjects, 1) = 3)
  )
);

-- 5. Student Grades & Assessment Results
CREATE TABLE IF NOT EXISTS public.student_grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  assessment_name TEXT NOT NULL,
  score NUMERIC NOT NULL CHECK (score >= 0),
  max_score NUMERIC NOT NULL CHECK (max_score > 0),
  tutor_feedback TEXT,
  captured_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Learning Resources
CREATE TABLE IF NOT EXISTS public.learning_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Live Sessions & Timetable
CREATE TABLE IF NOT EXISTS public.live_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  tutor_name TEXT NOT NULL,
  teams_link TEXT NOT NULL,
  session_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. 1-on-1 Tutor Bookings (Restricted to R750 / 3 Subjects Tier)
CREATE TABLE IF NOT EXISTS public.tutor_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Announcements
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Helper function for role check
CREATE OR REPLACE FUNCTION public.is_staff(user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role IN ('staff', 'admin')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_staff(auth.uid()));

-- Registrations Policies
DROP POLICY IF EXISTS "Public can submit registration" ON public.registrations;
CREATE POLICY "Public can submit registration" ON public.registrations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can manage registrations" ON public.registrations;
CREATE POLICY "Staff can manage registrations" ON public.registrations
  FOR ALL USING (public.is_staff(auth.uid()));

-- Students Policies
DROP POLICY IF EXISTS "Students read own record" ON public.students;
CREATE POLICY "Students read own record" ON public.students
  FOR SELECT USING (user_id = auth.uid() OR public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff manage students" ON public.students;
CREATE POLICY "Staff manage students" ON public.students
  FOR ALL USING (public.is_staff(auth.uid()));

-- Grades Policies
DROP POLICY IF EXISTS "Students view own grades" ON public.student_grades;
CREATE POLICY "Students view own grades" ON public.student_grades
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    ) OR public.is_staff(auth.uid())
  );

DROP POLICY IF EXISTS "Staff manage grades" ON public.student_grades;
CREATE POLICY "Staff manage grades" ON public.student_grades
  FOR ALL USING (public.is_staff(auth.uid()));

-- Learning Resources Policies: Strictly enrolled subject isolation
DROP POLICY IF EXISTS "Students view enrolled subject resources" ON public.learning_resources;
CREATE POLICY "Students view enrolled subject resources" ON public.learning_resources
  FOR SELECT USING (
    public.is_staff(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.user_id = auth.uid() 
        AND s.status = 'Active'
        AND (subject = ANY(s.subjects) OR subject = 'All Subjects')
    )
  );

DROP POLICY IF EXISTS "Staff manage learning resources" ON public.learning_resources;
CREATE POLICY "Staff manage learning resources" ON public.learning_resources
  FOR ALL USING (public.is_staff(auth.uid()));

-- Live Sessions Policies
DROP POLICY IF EXISTS "Students view live sessions" ON public.live_sessions;
CREATE POLICY "Students view live sessions" ON public.live_sessions
  FOR SELECT USING (
    public.is_staff(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.user_id = auth.uid() 
        AND s.status = 'Active'
        AND (subject = ANY(s.subjects) OR subject = 'All Subjects')
    )
  );

DROP POLICY IF EXISTS "Staff manage live sessions" ON public.live_sessions;
CREATE POLICY "Staff manage live sessions" ON public.live_sessions
  FOR ALL USING (public.is_staff(auth.uid()));

-- Tutor Bookings: Strictly R750 / 3 Subjects tier
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
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    ) OR public.is_staff(auth.uid())
  );

DROP POLICY IF EXISTS "Staff manage bookings" ON public.tutor_bookings;
CREATE POLICY "Staff manage bookings" ON public.tutor_bookings
  FOR ALL USING (public.is_staff(auth.uid()));

-- Announcements Policies
DROP POLICY IF EXISTS "All authenticated users view announcements" ON public.announcements;
CREATE POLICY "All authenticated users view announcements" ON public.announcements
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Staff manage announcements" ON public.announcements;
CREATE POLICY "Staff manage announcements" ON public.announcements
  FOR ALL USING (public.is_staff(auth.uid()));
