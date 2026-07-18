import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Igugulethu Ulwazi Academy" },
      { name: "description", content: "Get in touch with Igugulethu Ulwazi Academy." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-brand-cream">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <span className="inline-block rounded-full bg-brand-amber-soft px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-navy">CONTACT US</span>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl">We'd love to hear from you.</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-card p-6 shadow-soft">
            <Phone className="h-6 w-6 text-brand-amber" />
            <h3 className="mt-4 font-semibold text-brand-navy">Call us</h3>
            <p className="mt-1 text-sm text-muted-foreground">067 148 6015</p>
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-soft">
            <Mail className="h-6 w-6 text-brand-amber" />
            <h3 className="mt-4 font-semibold text-brand-navy">Email us</h3>
            <p className="mt-1 text-sm text-muted-foreground">moiane158@gmail.com</p>
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-soft">
            <MapPin className="h-6 w-6 text-brand-amber" />
            <h3 className="mt-4 font-semibold text-brand-navy">Visit us</h3>
            <p className="mt-1 text-sm text-muted-foreground">Johannesburg, Gauteng, RSA</p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  ),
});
