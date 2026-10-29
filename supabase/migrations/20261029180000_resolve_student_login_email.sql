-- Resolve a student's public student number to the email used by Supabase Auth.
-- The students table remains protected by RLS; the RPC returns only the matching
-- email for an active student and does not permit anonymous table reads.
CREATE OR REPLACE FUNCTION public.resolve_student_login_email(p_student_number text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT s.email
  FROM public.students AS s
  WHERE lower(s.student_number) = lower(trim(p_student_number))
    AND s.email IS NOT NULL
    AND s.status = 'Active'
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.resolve_student_login_email(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.resolve_student_login_email(text) TO anon, authenticated;
