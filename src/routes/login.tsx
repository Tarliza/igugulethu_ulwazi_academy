import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { GraduationCap, ShieldCheck, ArrowRight, UserPlus } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Igugulethu Ulwazi Academy" },
      { name: "description", content: "Access your Student Portal or Staff Portal." },
    ],
  }),
  component: LoginChooser,
});

function LoginChooser() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-amber-soft px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-navy">
            CHOOSE YOUR PORTAL
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl">
            Welcome back.
          </h1>
          <p className="mt-3 text-muted-foreground">Sign in to continue learning or teaching.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl bg-brand-navy p-8 text-white shadow-card">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-amber/20 blur-2xl" />
            <GraduationCap className="h-10 w-10 text-brand-amber" />
            <h2 className="mt-6 font-display text-2xl font-extrabold">Student Portal</h2>
            <p className="mt-2 text-sm text-white/70">
              View your timetable, quizzes, library, and message your tutors.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/student-login"
                className="inline-flex items-center gap-2 rounded-full bg-brand-amber px-5 py-2.5 text-xs font-bold text-brand-navy transition hover:brightness-105"
              >
                Student Login <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/student-signup"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <UserPlus className="h-3.5 w-3.5" /> Student Sign Up
              </Link>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-brand-amber p-8 text-brand-navy shadow-card">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" />
            <ShieldCheck className="h-10 w-10 text-brand-navy" />
            <h2 className="mt-6 font-display text-2xl font-extrabold">Staff Portal</h2>
            <p className="mt-2 text-sm text-brand-navy/80">
              Manage students, resources, bookings, and communications.
            </p>
            <div className="mt-6">
              <Link
                to="/staff-login"
                className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 text-xs font-bold text-white transition hover:brightness-110"
              >
                Staff Login <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-brand-navy/70">
              Staff accounts are created by administration only.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
