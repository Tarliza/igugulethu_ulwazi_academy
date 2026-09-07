import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "npm:@supabase/server@^1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function json(body: unknown, status = 200) { return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }

export default {
  fetch: withSupabase({ auth: "user" }, async (req, ctx) => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
    if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);
    const callerId = ctx.userClaims?.sub;
    if (!callerId) return json({ success: false, error: "Authentication required" }, 401);
    const { data: staffRole } = await ctx.supabaseAdmin.from("user_roles").select("role").eq("user_id", callerId).in("role", ["admin", "staff"]).limit(1).maybeSingle();
    if (!staffRole) return json({ success: false, error: "Staff authorization required" }, 403);
    const body = await req.json().catch(() => null) as { registrationId?: string } | null;
    if (!body?.registrationId) return json({ success: false, error: "registrationId is required" }, 400);
    const { data: reg, error: regError } = await ctx.supabaseAdmin.from("pending_registrations").select("*").eq("id", body.registrationId).maybeSingle();
    if (regError || !reg) return json({ success: false, error: "Registration not found" }, 404);
    if (reg.status === "activated") return json({ success: false, error: "Student is already activated" }, 409);

    const year = new Date().getFullYear();
    let studentNumber = "";
    for (let i = 0; i < 8; i++) {
      const candidate = `RA-${year}-${Math.floor(1000 + Math.random() * 9000)}`;
      const { data: existing } = await ctx.supabaseAdmin.from("students").select("id").eq("student_number", candidate).maybeSingle();
      if (!existing) { studentNumber = candidate; break; }
    }
    if (!studentNumber) return json({ success: false, error: "Could not allocate a unique student number" }, 500);

    const bytes = crypto.getRandomValues(new Uint8Array(16));
    const password = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
    const email = String(reg.email).trim().toLowerCase();
    const { data: users } = await ctx.supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (users?.users.some((u) => (u.email ?? "").toLowerCase() === email)) return json({ success: false, error: "A Supabase Auth account already exists for this email address" }, 409);

    const { data: authData, error: authError } = await ctx.supabaseAdmin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { first_name: reg.first_name, last_name: reg.last_name, student_number: studentNumber } });
    if (authError || !authData.user) return json({ success: false, error: authError?.message ?? "Could not create Auth user" }, 500);
    const userId = authData.user.id;
    const { error: roleError } = await ctx.supabaseAdmin.from("user_roles").insert({ user_id: userId, role: "student" });
    if (roleError) { await ctx.supabaseAdmin.auth.admin.deleteUser(userId); return json({ success: false, error: roleError.message }, 500); }

    const plan = reg.plan === "1-subject" ? "1 Subject" : reg.plan === "3-subjects" ? "3 Subjects" : "2 Subjects";
    const amount = reg.amount ?? (plan === "1 Subject" ? "R300" : plan === "3 Subjects" ? "R750" : "R550");
    const { error: studentError } = await ctx.supabaseAdmin.from("students").insert({ user_id: userId, student_number: studentNumber, full_name: `${reg.first_name} ${reg.last_name}`.trim(), email, phone: reg.phone, grade: reg.grade, school: reg.school, plan, amount, subjects: reg.subjects, status: "Active", payment_status: "paid", activated_by: callerId, enrolled_at: new Date().toISOString(), updated_at: new Date().toISOString() });
    if (studentError) { await ctx.supabaseAdmin.from("user_roles").delete().eq("user_id", userId); await ctx.supabaseAdmin.auth.admin.deleteUser(userId); return json({ success: false, error: studentError.message }, 500); }
    const { error: updateError } = await ctx.supabaseAdmin.from("pending_registrations").update({ status: "activated", activated_at: new Date().toISOString(), reviewed_by: callerId, reviewed_at: new Date().toISOString() }).eq("id", body.registrationId);
    if (updateError) return json({ success: false, error: updateError.message }, 500);

    const resendKey = Deno.env.get("RESEND_API_KEY");
    const from = Deno.env.get("RESEND_FROM_EMAIL") ?? "Igugulethu Academy <onboarding@resend.dev>";
    if (resendKey) await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: email, subject: "Your Igugulethu Ulwazi Academy login credentials", text: `Hi ${reg.first_name}, your registration has been approved. Student Number: ${studentNumber}. Temporary Password: ${password}. Please sign in and change your password.` }) }).catch(() => undefined);
    return json({ success: true, studentNumber, password, originalEmail: email });
  }),
};
