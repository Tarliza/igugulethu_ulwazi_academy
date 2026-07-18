import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur border-b border-border/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <Link to="/" className="min-w-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/about"
            className="text-sm font-medium text-brand-navy/80 transition hover:text-brand-navy"
          >
            About Us
          </Link>
          <Link
            to="/subscription"
            className="text-sm font-medium text-brand-navy/80 transition hover:text-brand-navy"
          >
            Subscriptions
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-brand-navy/80 transition hover:text-brand-navy"
          >
            Contact Us
          </Link>
          <Link
            to="/student-login"
            className="text-sm font-medium text-brand-navy/80 transition hover:text-brand-navy"
          >
            Student Login
          </Link>
          <Link
            to="/staff-login"
            className="text-sm font-medium text-brand-navy/80 transition hover:text-brand-navy"
          >
            Staff Login
          </Link>
          <Link
            to="/student-signup"
            className="inline-flex items-center rounded-full bg-brand-amber px-6 py-2.5 text-sm font-semibold text-brand-navy shadow-soft transition hover:brightness-105"
          >
            Sign Up
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-brand-cream md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            <Link to="/about" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-accent">About Us</Link>
            <Link to="/subscription" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-accent">Subscriptions</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-accent">Contact Us</Link>
            <Link to="/student-login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-accent">Student Login</Link>
            <Link to="/staff-login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-accent">Staff Login</Link>
            <Link to="/student-signup" onClick={() => setOpen(false)} className="mt-1 rounded-full bg-brand-amber px-4 py-2.5 text-center text-sm font-semibold text-brand-navy">Sign Up</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
