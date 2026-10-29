import { supabase } from "@/integrations/client";

export async function signInStaff(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

/**
 * Student-number resolution and password verification happen server-side.
 * The browser never calls a lookup RPC and never receives an email as a
 * result of resolving a student number.
 */
export async function signInStudent(identifier: string, password: string) {
  const value = identifier.trim();
  if (!value || !password) {
    return {
      data: { user: null, session: null },
      error: new Error("Invalid student credentials."),
    };
  }

  const { data: loginData, error: loginError } = await supabase.functions.invoke(
    "student-login",
    { body: { identifier: value, password } },
  );

  if (loginError || !loginData?.access_token || !loginData?.refresh_token) {
    return {
      data: { user: null, session: null },
      error: new Error("Invalid student credentials."),
    };
  }

  // Supabase Auth issues the tokens; the SDK persists them using the
  // application's existing session storage and refresh-token handling.
  return supabase.auth.setSession({
    access_token: loginData.access_token,
    refresh_token: loginData.refresh_token,
  });
}

export async function requestPasswordReset(email: string) {
  return supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: `${window.location.origin}/student-login?reset=1`,
  });
}
