import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { UploadCloud, CheckCircle2, Banknote, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { supabase } from "@/integrations/client";

const planLabels: Record<string, { name: string; price: string }> = {
  "1-subject": { name: "1 Subject", price: "R300" },
  "2-subjects": { name: "2 Subjects", price: "R550" },
  "3-subjects": { name: "3 Subjects", price: "R750" },
};

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: typeof search.plan === "string" ? search.plan : "2-subjects",
  }),
  head: () => ({
    meta: [
      { title: "Apply Now | Igugulethu Ulwazi Academy" },
      { name: "description", content: "Secure your spot at Igugulethu Ulwazi Academy today. Fill out our simple online registration form." },
      { property: "og:title", content: "Register for Igugulethu Ulwazi Academy" },
      { property: "og:description", content: "Secure your spot at Igugulethu Ulwazi Academy today." },
      { property: "og:image", content: "/logo.jpeg" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { plan } = Route.useSearch();
  const navigate = useNavigate();
  const info = planLabels[plan] ?? planLabels["2-subjects"];

  const [proof, setProof] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const subjectOptions = [
    "Mathematics",
    "Physical Sciences",
    "Life Sciences",
    "Accounting",
    "Business Studies",
    "Geography",
    "History",
    "English",
    "IsiZulu",
  ];

  const planSubjectCount = plan === "3-subjects" ? 3 : plan === "1-subject" ? 1 : 2;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!proof) return;

    // 1. CRITICAL FIX: Scoop the form data immediately before any 'await' clears the event!
    const data = new FormData(e.currentTarget);

    try {
      const fileExt = proof.name.split(".").pop() ?? "bin";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("proof-of-payment")
        .upload(fileName, proof);

      if (uploadError) throw uploadError;

      // 2. Now we use the data we safely captured earlier
      const { error: dbError } = await supabase.from("pending_registrations").insert({
        first_name: String(data.get("firstName") ?? "").trim(),
        last_name: String(data.get("lastName") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
        grade: String(data.get("grade") ?? "").trim(),
        school: String(data.get("school") ?? "").trim(),
        plan,
        subjects: selectedSubjects,
      });

      if (dbError) throw dbError;

      setSubmitted(true);
      setTimeout(() => navigate({ to: "/student-login" }), 1600);
    } catch (err) {
      console.error("Registration error:", err);
      alert("Failed to submit registration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <div className="rounded-3xl bg-card p-8 shadow-card sm:p-10">
          <span className="inline-block rounded-full bg-brand-amber-soft px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-navy">
            COMPLETE REGISTRATION
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
            Almost there — let's get you set up.
          </h1>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-brand-cream/60 p-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Selected plan
              </div>
              <div className="font-display text-lg font-extrabold text-brand-navy">
                {info.name}
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl font-extrabold text-brand-navy">
                {info.price}
              </div>
              <Link to="/subscription" className="text-xs font-semibold text-brand-amber hover:underline">
                Change plan
              </Link>
            </div>
          </div>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              <h2 className="mt-3 font-display text-xl font-extrabold text-brand-navy">
                Application received
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We'll verify your proof of payment and activate your account. Redirecting to sign in…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First name" name="firstName" required />
                <Field label="Last name" name="lastName" required />
                <Field label="Email address" name="email" type="email" required />
                <Field label="Phone number" name="phone" type="tel" required />
                <Field label="Grade" name="grade" required />
                <Field label="School" name="school" required />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-navy">
                  <span className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Subjects of interest
                  </span>
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {subjectOptions.map((subject) => (
                    <label
                      key={subject}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background p-3 text-sm transition hover:border-brand-navy/40"
                    >
                      <input
                        type="checkbox"
                        name="subjects"
                        value={subject}
                        checked={selectedSubjects.includes(subject)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedSubjects((prev) =>
                            e.target.checked
                              ? [...prev, value]
                              : prev.filter((s) => s !== value)
                          );
                        }}
                        className="h-4 w-4 accent-brand-amber"
                      />
                      <span className="text-brand-navy">{subject}</span>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Your selected plan covers up to {planSubjectCount} subject{planSubjectCount !== 1 ? "s" : ""}. Pick the ones you want to enrol for.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-navy">
                  <span className="inline-flex items-center gap-2">
                    <Banknote className="h-4 w-4" />
                    How to make payment
                  </span>
                </label>
                <div className="rounded-2xl border border-border bg-brand-cream/60 p-4 text-sm text-brand-navy">
                  <p className="font-semibold">
                    Amount to pay: {info.price} per month
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Pay by EFT or instant money transfer. Use the email address you entered above as the payment reference.
                  </p>
                  <div className="mt-3 rounded-xl bg-background p-3 text-xs">
                    <p><span className="font-semibold">Bank:</span> Capitec</p>
                    <p><span className="font-semibold">Account Holder:</span> MR Gabriel Moiane</p>
                    <p><span className="font-semibold">Account Type:</span> Main Account</p>
                    <p><span className="font-semibold">Account No:</span> 1709691504</p>
                    <p><span className="font-semibold">Branch Code:</span> 470010</p>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Once the payment is confirmed, upload your proof of payment below. The staff team will verify it and email your student login credentials.
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-navy">
                  Create password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none"
                />
              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-brand-navy">
                  Upload Proof of Subscription <span className="text-red-500">*</span>
                </label>
                <label
                  htmlFor="proof"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-navy/30 bg-brand-cream/50 p-8 text-center transition hover:border-brand-navy/60 hover:bg-brand-cream"
                >
                  <UploadCloud className="h-8 w-8 text-brand-navy" />
                  <div className="text-sm font-semibold text-brand-navy">
                    {proof ? proof.name : "Click to upload proof of payment"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    PDF, PNG or JPG — max 10 MB
                  </div>
                  <input
                    id="proof"
                    type="file"
                    accept=".pdf,image/png,image/jpeg"
                    required
                    className="sr-only"
                    onChange={(e) => setProof(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={!proof}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-amber px-6 py-3.5 text-sm font-bold text-brand-navy shadow-soft transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create account
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Already registered?{" "}
                <Link to="/student-login" className="font-semibold text-brand-navy hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-brand-navy">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none"
      />
    </div>
  );
}
