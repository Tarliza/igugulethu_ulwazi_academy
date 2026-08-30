-- Securely resolve a student number to the login email without exposing the
-- students table to anonymous SELECT access. The function returns only the
-- email needed to initiate Supabase Auth.
CREATE OR REPLACE FUNCTION public.resolve_student_login_email(p_student_number text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT s.email
  FROM public.students s
  WHERE lower(s.student_number) = lower(trim(p_student_number))
    AND s.email IS NOT NULL
    AND s.status = 'Active'
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.resolve_student_login_email(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.resolve_student_login_email(text) TO anon, authenticated;
