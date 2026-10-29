-- Remove the public email-resolution RPC. Student-number resolution now
-- happens inside the student-login Edge Function and never returns the email.
DROP FUNCTION IF EXISTS public.resolve_student_login_email(text);
