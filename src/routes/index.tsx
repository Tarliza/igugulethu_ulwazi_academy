import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  Atom,
  Calculator,
  Hash,
  BarChart3,
  Briefcase,
  ScrollText,
  Globe2,
  Leaf,
  CheckCircle2,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import heroStudents from "@/assets/hero-students.jpg";
import hero2 from "@/assets/hero-image2.webp";
import hero3 from "@/assets/hero-image3.webp";
import hero4 from "@/assets/hero-image4.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Igugulethu Ulwazi Academy | Excellence in Education" },
      {
        name: "description",
        content:
          "Expert tutors, comprehensive resources, and a proven teaching approach designed to unlock full academic potential and guarantee A grades.",
      },
      { property: "og:title", content: "Igugulethu Ulwazi Academy" },
      {
        property: "og:description",
        content:
          "Join Igugulethu Ulwazi Academy for premium tutoring, academic support, and a proven path to success.",
      },
      { property: "og:image", content: "/logo.jpeg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Igugulethu Ulwazi Academy" },
      { name: "twitter:description", content: "Premium tutoring and academic support for Grade 10–12 learners." },
      { name: "twitter:image", content: "/logo.jpeg" },
    ],
  }),
  component: LandingPage,
});

const subjects = [
  { name: "Physical Sciences", icon: Atom, tone: "navy" as const },
  { name: "Mathematics", icon: Calculator, tone: "amber" as const },
  { name: "Mathematical Literacy", icon: Hash, tone: "navy" as const },
  { name: "Economics", icon: BarChart3, tone: "amber" as const },
  { name: "Business Studies", icon: Briefcase, tone: "navy" as const },
  { name: "History", icon: ScrollText, tone: "amber" as const },
  { name: "Geography", icon: Globe2, tone: "navy" as const },
  { name: "Life Sciences", icon: Leaf, tone: "amber" as const },
];

const stats = [
  { value: "95%", label: "PASS RATE", tone: "navy" as const },
  { value: "500+", label: "STUDENTS HELPED", tone: "amber" as const },
  { value: "8+", label: "SUBJECTS COVERED", tone: "navy" as const },
  { value: "A+", label: "GRADE GUARANTEE", tone: "amber" as const },
];

const bullets = [
  { icon: CheckCircle2, text: "Personalised tutor-led sessions tailored to your pace" },
  { icon: TrendingUp, text: "Proven teaching approach that consistently delivers A grades" },
  { icon: Users, text: "Small group settings for focused, effective learning" },
  { icon: BookOpen, text: "Access to curated study resources and past papers" },
];

function LandingPage() {
  const slides = [heroStudents, hero2, hero3, hero4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const go = (i: number) => setCurrent((i + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-brand-cream">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <img
              key={i}
              src={s}
              alt="Hero"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
              width={1920}
              height={1280}
            />
          ))}
          <div className="absolute inset-0 bg-linear-to-b from-brand-navy/80 via-brand-navy/70 to-brand-navy/80" />
        </div>

        <div className="relative mx-auto flex min-h-150 max-w-5xl flex-col items-center justify-center px-6 py-24 text-center text-white sm:min-h-170">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-amber/60 bg-brand-amber/10 px-5 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-amber">
            <Sparkles className="h-3 w-3" /> GUARANTEED A GRADES
          </span>

          <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">CHANGE LIVES.</span>
            <span className="block text-brand-amber">INSPIRE DREAMS.</span>
            <span className="block">PUSH LIMITS.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
            Expert tutors, comprehensive resources, and a proven teaching
            approach — all designed to unlock your full academic potential.
          </p>

          <Link
            to="/subscription"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-amber px-8 py-4 text-sm font-bold text-brand-navy shadow-card transition hover:brightness-105 sm:text-base"
          >
            View Subscriptions
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-14 flex items-center gap-2">
            <span className="h-2 w-8 rounded-full bg-brand-amber" />
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 w-2 rounded-full ${i === current ? "bg-brand-amber" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <span className="inline-block rounded-full bg-brand-amber-soft px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-navy">
          WHY CHOOSE US
        </span>

        <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl">
              Worried about your <br />
              <span className="text-brand-amber">academic results?</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
              We understand the pressure students face. That's why{" "}
              <strong className="text-brand-navy">Igugulethu Ulwazi Academy</strong>{" "}
              provides expert tutors, comprehensive resources, and a teaching
              approach that <strong className="text-brand-navy">guarantees A Grades.</strong>
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Whether it's exam preparation, concept mastery, or regular weekly
              support — we meet learners where they are and take them where they
              need to be.
            </p>

            <ul className="mt-8 space-y-4">
              {bullets.map((b) => (
                <li key={b.text} className="flex items-center gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-amber-soft text-brand-amber">
                    <b.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-brand-navy">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-5 self-center">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`rounded-3xl p-8 text-center shadow-card ${
                  s.tone === "navy"
                    ? "bg-brand-navy text-white"
                    : "bg-brand-amber text-brand-navy"
                }`}
              >
                <div className="font-display text-4xl font-black sm:text-5xl">
                  {s.value}
                </div>
                <div
                  className={`mt-2 text-[11px] font-bold tracking-[0.15em] ${
                    s.tone === "navy" ? "text-brand-amber" : "text-brand-navy/70"
                  }`}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-amber-soft px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-navy">
            OUR SUBJECTS
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
            Master every subject that matters
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {subjects.map((s) => (
            <div
              key={s.name}
              className={`flex flex-col items-center gap-4 rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:shadow-card ${
                s.tone === "navy" ? "bg-muted" : "bg-brand-amber-soft/50"
              }`}
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl text-white shadow-soft ${
                  s.tone === "navy" ? "bg-brand-navy" : "bg-brand-amber"
                }`}
              >
                <s.icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold text-brand-navy">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-brand-navy via-brand-navy to-brand-navy-deep p-8 sm:p-12">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-amber/10 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                Ready to unlock your <span className="text-brand-amber">full potential?</span>
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Join hundreds of learners already achieving A grades with us.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-brand-amber px-7 py-3.5 text-sm font-bold text-brand-navy shadow-card transition hover:brightness-105"
            >
              Get Started Today
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
