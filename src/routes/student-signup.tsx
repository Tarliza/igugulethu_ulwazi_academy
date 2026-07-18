import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/student-signup")({
  head: () => ({
    meta: [
      { title: "Student Signup — Igugulethu Ulwazi Academy" },
      { name: "description", content: "Create your student account." },
    ],
  }),
  component: StudentSignup,
});

function StudentSignup() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <SiteHeader />
      <section className="mx-auto max-w-xl px-6 py-16">
        <div className="rounded-3xl bg-card p-8 text-center shadow-card sm:p-10">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-navy text-brand-amber">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-brand-navy">
            Student Signup
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Every student account starts with a subscription. Pick a plan, then upload proof of
            payment on the registration form to activate your account.
          </p>

          <Link
            to="/subscription"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-amber px-6 py-3 text-sm font-bold text-brand-navy shadow-soft transition hover:brightness-105"
          >
            Choose a subscription plan
          </Link>

          <p className="mt-6 text-xs text-muted-foreground">
            Already registered?{" "}
            <Link to="/student-login" className="font-semibold text-brand-navy hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
