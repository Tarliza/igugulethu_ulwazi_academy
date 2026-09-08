import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "npm:@supabase/server@^1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUBJECTS = new Set([
  "Mathematics",
  "Physical Sciences",
  "Life Science",
  "Mathematical Literacy",
  "Economics",
  "Business Studies",
  "History",
  "Geography",
]);

const PLAN_CONFIG = {
  "1 Subject": { count: 1, amount: "R300" },
  "2 Subjects": { count: 2, amount: "R550" },
  "3 Subjects": { count: 3, amount: "R750" },
} as const;

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
  ["application/pdf", ".pdf"],
  ["image/png", ".png"],
  ["image/jpeg", ".jpg"],
]);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function clean(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasMagicBytes(bytes: Uint8Array, contentType: string) {
  if (contentType === "application/pdf") {
    return new TextDecoder().decode(bytes.slice(0, 4)) === "%PDF";
  }
  if (contentType === "image/png") {
    return bytes.length >= 8 && bytes.slice(0, 8).every((b, i) => b === [137, 80, 78, 71, 13, 10, 26, 10][i]);
  }
  if (contentType === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  return false;
}

export default {
  fetch: withSupabase({ auth: "none" }, async (req, ctx) => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
    if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);

    try {
      const form = await req.formData();

      // Honeypot field: real users never see or fill this.
      if (clean(form.get("website"), 200)) return json({ success: true });

      const firstName = clean(form.get("firstName"), 80);
      const lastName = clean(form.get("lastName"), 80);
      const email = clean(form.get("email"), 254).toLowerCase();
      const phone = clean(form.get("phone"), 40);
      const grade = clean(form.get("grade"), 40);
      const school = clean(form.get("school"), 160);
      const plan = clean(form.get("plan"), 40) as keyof typeof PLAN_CONFIG;
      const subjectsRaw = clean(form.get("subjects"), 2000);
      const proof = form.get("proof")

      if (!firstName || !lastName || !email || !phone || !grade || !school) {
        return json({ success: false, error: "Please complete all required registration fields." }, 400);
      }
      if (!validEmail(email)) return json({ success: false, error: "Please provide a valid email address." }, 400);

      const config = PLAN_CONFIG[plan];
      if (!config) return json({ success: false, error: "Invalid subscription plan." }, 400);

      let subjects: string[];
      try {
        const parsed = JSON.parse(subjectsRaw);
        subjects = Array.isArray(parsed) ? parsed.map((s) => String(s).trim()) : [];
      } catch {
        subjects = [];
      }
      subjects = [...new Set(subjects)];
      if (subjects.length !== config.count || subjects.some((subject) => !SUBJECTS.has(subject))) {
        return json({ success: false, error: `Please select exactly ${config.count} valid subject${config.count === 1 ? "" : "s"}.` }, 400);
      }

      if (!(proof instanceof File) || proof.size === 0) {
        return json({ success: false, error: "Proof of payment is required." }, 400);
      }
      if (proof.size > MAX_FILE_BYTES) {
        return json({ success: false, error: "Proof of payment must be 10 MB or smaller." }, 400);
      }

      const extension = ALLOWED_TYPES.get(proof.type);
      if (!extension) return json({ success: false, error: "Only PDF, PNG, and JPG proof files are accepted." }, 400);

      const bytes = new Uint8Array(await proof.arrayBuffer());
      if (!hasMagicBytes(bytes, proof.type)) {
        return json({ success: false, error: "The uploaded file type could not be verified. Please choose a valid PDF or image." }, 400);
      }

      // Prevent accidental duplicate applications before accepting the file.
      const normalizedEmail = email;
      const [{ data: pendingMatch }, { data: studentMatch }] = await Promise.all([
        ctx.supabaseAdmin.from("pending_registrations").select("id,status").eq("email", normalizedEmail).in("status", ["pending", "activated"]).limit(1).maybeSingle(),
        ctx.supabaseAdmin.from("students").select("id").eq("email", normalizedEmail).limit(1).maybeSingle(),
      ]);
      if (pendingMatch || studentMatch) {
        return json({ success: false, error: "An application or active student account already exists for this email address." }, 409);
      }

      const registrationId = crypto.randomUUID();
      const safeOriginalName = proof.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100) || `proof${extension}`;
      const storagePath = `pending/${registrationId}/${crypto.randomUUID()}${extension}`;

      const { error: uploadError } = await ctx.supabaseAdmin.storage
        .from("academy-proof-of-payment")
        .upload(storagePath, bytes, {
          contentType: proof.type,
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("[submit-registration] proof upload failed", uploadError);
        return json({ success: false, error: "We could not securely store your proof of payment. Please try again." }, 500);
      }

      const { error: insertError } = await ctx.supabaseAdmin.from("pending_registrations").insert({
        id: registrationId,
        first_name: firstName,
        last_name: lastName,
        email: normalizedEmail,
        phone,
        grade,
        school,
        subjects,
        plan,
        amount: config.amount,
        status: "pending",
        proof_of_payment_path: storagePath,
      });

      if (insertError) {
        await ctx.supabaseAdmin.storage.from("academy-proof-of-payment").remove([storagePath]);
        console.error("[submit-registration] registration insert failed", insertError);
        return json({ success: false, error: "We could not submit your application. Please try again." }, 500);
      }

      return json({
        success: true,
        registrationId,
        proofFileName: safeOriginalName,
        message: "Application received. Staff will verify your payment and email your login credentials after approval.",
      });
    } catch (error) {
      console.error("[submit-registration] unexpected error", error);
      return json({ success: false, error: "We could not submit your application. Please try again." }, 500);
    }
  }),
};
