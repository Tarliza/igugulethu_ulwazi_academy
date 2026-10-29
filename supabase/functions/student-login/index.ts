import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    console.error("[student-login] Required Supabase environment is missing");
    return json({ error: "Login service unavailable" }, 503);
  }

  let body: { identifier?: unknown; password?: unknown } | null = null;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const identifier = typeof body?.identifier === "string" ? body.identifier.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!identifier || !password || identifier.length > 320 || password.length > 1024) {
    return json({ error: "Invalid student credentials" }, 400);
  }

  let email = identifier.toLowerCase();

  // Student ID -> email mapping stays inside this server-side function.
  // The service-role key is never returned to the caller.
  if (!identifier.includes("@")) {
    if (!/^RA-\d{4}-\d{4}$/i.test(identifier)) {
      return json({ error: "Invalid student credentials" }, 401);
    }

    const lookupUrl = new URL("/rest/v1/students", supabaseUrl);
    lookupUrl.searchParams.set("select", "email");
    lookupUrl.searchParams.set("student_number", `eq.${identifier}`);
    lookupUrl.searchParams.set("status", "eq.Active");
    lookupUrl.searchParams.set("limit", "1");

    let rows: Array<{ email?: string | null }> = [];
    try {
      const lookup = await fetch(lookupUrl, {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          Accept: "application/json",
        },
      });
      if (!lookup.ok) {
        console.error("[student-login] Student lookup failed with status", lookup.status);
        return json({ error: "Login service unavailable" }, 503);
      }
      rows = await lookup.json();
    } catch (error) {
      console.error("[student-login] Student lookup request failed", error);
      return json({ error: "Login service unavailable" }, 503);
    }

    if (!rows[0]?.email) return json({ error: "Invalid student credentials" }, 401);
    email = rows[0].email.trim().toLowerCase();
  }

  // Delegate password verification and token issuance to Supabase Auth.
  // Return Auth's token payload only on success; never return the resolved
  // email or lookup result. Auth's own password grant rate limits apply.
  try {
    const authResponse = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: anonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!authResponse.ok) {
      // Avoid revealing whether an ID/email exists or whether the password was wrong.
      return json({ error: "Invalid student credentials" }, 401);
    }

    const session = await authResponse.json();
    if (!session?.access_token || !session?.refresh_token) {
      return json({ error: "Invalid student credentials" }, 401);
    }

    return json({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_in: session.expires_in,
      expires_at: session.expires_at,
      token_type: session.token_type,
    });
  } catch (error) {
    console.error("[student-login] Auth request failed", error);
    return json({ error: "Login service unavailable" }, 503);
  }
});
