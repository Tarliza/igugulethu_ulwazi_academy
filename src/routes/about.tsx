import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Igugulethu Ulwazi Academy" },
      { name: "description", content: "Our mission, our tutors, and the approach that guarantees A grades." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-brand-cream">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <span className="inline-block rounded-full bg-brand-amber-soft px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-navy">ABOUT US</span>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl">Empowering the next generation of A-graders.</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Igugulethu Ulwazi Academy exists to close the gap between potential and performance. We combine expert tutoring, structured resources, and consistent support to help students consistently achieve results they can be proud of.
        </p>
      </section>
      <SiteFooter />
    </div>
  ),
});
