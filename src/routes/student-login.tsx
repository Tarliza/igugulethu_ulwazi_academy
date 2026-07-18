import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Mail } from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import React, { useState } from "react";
import { supabase } from "@/integrations/client";

export const Route = createFileRoute("/student-login")({
  head: () => ({
    meta: [
      { title: "Student Portal | Igugulethu Ulwazi Academy" },
      { name: "description", content: "Login to access your learning materials, messages, and class bookings." },
      { property: "og:title", content: "Student Portal | Igugulethu Ulwazi Academy" },
      { property: "og:description", content: "Login to access your learning materials, messages, and class bookings." },
      { property: "og:image", content: "/logo.jpeg" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: StudentLogin,
});

function StudentLogin() {
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const studentNumberValue = studentNumber.trim();
    const passwordValue = password;

    const email = `${studentNumberValue.toLowerCase()}@student.igugulethu.local`;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: passwordValue,
    });

    if (error) {
      alert("Invalid student number or password.");
    } else {
      navigate({ to: "/student" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <SiteHeader />
      <section className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-3xl bg-card p-8 shadow-card">
          <div className="flex flex-col items-center text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-navy text-brand-amber">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-brand-navy">
              Student Login
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back — let's keep learning.
            </p>
          </div>

          <div className="mt-6 flex gap-3 rounded-2xl border border-brand-amber/40 bg-brand-cream/60 p-4 text-left">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" />
            <div className="text-xs text-brand-navy/80">
              <p className="font-semibold text-brand-navy">First time signing in?</p>
              <p className="mt-1">
                Your student number and password are emailed to you by the Igugulethu team once your
                proof of payment has been verified. Check your inbox (and spam folder) for your login
                credentials.
              </p>
            </div>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-navy">Student number</label>
              <input
                type="text"
                required
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                placeholder="RA-2026-0001"
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-navy">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none"
              />
            </div>
            <button className="w-full rounded-full bg-brand-amber px-6 py-3 text-sm font-bold text-brand-navy shadow-soft transition hover:brightness-105">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/subscription" className="font-semibold text-brand-navy hover:underline">
              Choose a plan to sign up
            </Link>
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}