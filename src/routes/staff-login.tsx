import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import React, { useState } from "react";
import { supabase } from "@/integrations/client";

export const Route = createFileRoute("/staff-login")({
  head: () => ({
    meta: [
      { title: "Staff Login — Igugulethu Ulwazi Academy" },
      { name: "description", content: "Sign in to the staff portal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StaffLogin,
});

function StaffLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValue = email.trim();
    const passwordValue = password;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    });

    if (error) {
      alert("Invalid login credentials.");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", authData.user.id)
      .single();

    if (roleData?.role === "staff" || roleData?.role === "admin") {
      navigate({ to: "/staff" });
    } else {
      await supabase.auth.signOut();
      alert("Access denied: You are not authorized as staff.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <SiteHeader />
      <section className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-3xl bg-card p-8 shadow-card">
          <div className="flex flex-col items-center text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-amber text-brand-navy">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-brand-navy">
              Staff Login
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Restricted access — existing staff members only.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-navy">Staff email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button className="w-full rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:brightness-110">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Staff accounts are created by administration. No public sign-up.
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}