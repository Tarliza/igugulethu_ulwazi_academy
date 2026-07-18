import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/subscription")({
  head: () => ({
    meta: [
      { title: "Subscriptions — Igugulethu Ulwazi Academy" },
      {
        name: "description",
        content:
          "Choose from 1, 2, or 3 subject plans and unlock expert tutoring, resources, and A-grade support.",
      },
      { property: "og:title", content: "Subscription Plans — Igugulethu Ulwazi Academy" },
      {
        property: "og:description",
        content: "Affordable monthly plans: 1 Subject R300, 2 Subjects R550, 3 Subjects R750.",
      },
    ],
  }),
  component: SubscriptionPage,
});

const plans = [
  {
    id: "1-subject",
    name: "1 Subject",
    price: "R300",
    tagline: "Perfect for focused improvement",
    highlight: false,
    features: [
      "1 subject of your choice",
      "Weekly live tutor sessions",
      "Access to study resources",
      "Practice quizzes & feedback",
    ],
  },
  {
    id: "2-subjects",
    name: "2 Subjects",
    price: "R550",
    tagline: "Our most popular option",
    highlight: true,
    features: [
      "2 subjects of your choice",
      "Weekly live tutor sessions",
      "Full library & past papers",
      "Priority tutor messaging",
    ],
  },
  {
    id: "3-subjects",
    name: "3 Subjects",
    price: "R750",
    tagline: "Best value for A-grade seekers",
    highlight: false,
    features: [
      "3 subjects of your choice",
      "Unlimited live tutor sessions",
      "Full library & past papers",
      "1-on-1 tutor bookings",
    ],
  },
];

function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-amber-soft px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-navy">
            SUBSCRIPTION PLANS
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl">
            Choose the plan that fits you.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Simple monthly pricing. Cancel anytime. A-grade support included.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-3xl p-8 shadow-card transition hover:-translate-y-1 ${
                p.highlight
                  ? "bg-brand-navy text-white"
                  : "bg-card text-brand-navy border border-border"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-amber px-3 py-1 text-[10px] font-bold tracking-widest text-brand-navy">
                  MOST POPULAR
                </span>
              )}
              <h2 className="font-display text-xl font-extrabold">{p.name}</h2>
              <p className={`mt-1 text-sm ${p.highlight ? "text-white/70" : "text-muted-foreground"}`}>
                {p.tagline}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-black">{p.price}</span>
                <span className={`text-sm ${p.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                  /month
                </span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        p.highlight ? "text-brand-amber" : "text-brand-navy"
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                search={{ plan: p.id }}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${
                  p.highlight
                    ? "bg-brand-amber text-brand-navy hover:brightness-105"
                    : "bg-brand-navy text-white hover:brightness-110"
                }`}
              >
                Select plan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/student-login" className="font-semibold text-brand-navy hover:underline">
            Sign in as a student
          </Link>
          .
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}
