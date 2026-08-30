import { supabase } from "@/integrations/client";

export async function signInStaff(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signInStudent(identifier: string, password: string) {
  const value = identifier.trim();
  let email = value.toLowerCase();

  if (!value.includes("@")) {
    const { data, error } = await supabase.rpc("resolve_student_login_email", {
      p_student_number: value,
    });
    if (error || !data) {
      return { data: { user: null, session: null }, error: error ?? new Error("Student not found") };
    }
    email = String(data).toLowerCase();
  }

  return supabase.auth.signInWithPassword({ email, password });
}

export async function requestPasswordReset(email: string) {
  return supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: `${window.location.origin}/student-login?reset=1`,
  });
}
