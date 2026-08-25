
import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Sparkles, BookmarkPlus } from "lucide-react";

export const Route = createFileRoute("/subscription")({
  component: SubscriptionPlansPage,
});

export function SubscriptionPlansPage() {
  const plans = [
    {
      id: "1-subject",
      name: "1 Subject",
      amount: "R300",
      period: "/month",
      badge: "Focused Improvement",
      desc: "Ideal for learners seeking dedicated assistance in a single key subject.",
      features: [
        "1 Subject of your choice",
        "Weekly live tutor group session",
        "Access to past papers & subject study notes",
        "Weekly practice quizzes & revision feedback",
      ],
      cta: "Select 1 Subject Plan",
      popular: false,
    },
    {
      id: "2-subjects",
      name: "2 Subjects",
      amount: "R550",
      period: "/month",
      badge: "MOST POPULAR",
      desc: "Our standard full-term support package covering major academic combinations.",
      features: [
        "2 Subjects of your choice (e.g. Maths & Science)",
        "Weekly live tutor sessions for both subjects",
        "Full learning library access & past paper memos",
        "Priority tutor communication & academic tracking",
      ],
      cta: "Select 2 Subjects Plan",
      popular: true,
    },
    {
      id: "3-subjects",
      name: "3 Subjects",
      amount: "R750",
      period: "/month",
      badge: "BEST VALUE FOR A-GRADES",
      desc: "Comprehensive excellence package with exclusive 1-on-1 tutoring sessions.",
      features: [
        "3 Subjects of your choice",
        "Unlimited live tutor sessions & weekend camps",
        "Full study library & exam revision worksheets",
        "★ Exclusive: Book 1-on-1 Private Tutor Sessions",
        "Dedicated tertiary & bursary application support",
      ],
      cta: "Select 3 Subjects Plan",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">ACADEMIC TUITION PLANS</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Choose the Plan That Fits You</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Simple monthly pricing. Cancel anytime. Pick the subjects you want to master.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <Card
              key={p.id}
              className={`flex flex-col justify-between relative shadow-sm hover:shadow-lg transition-all rounded-2xl border ${
                p.popular ? "border-primary shadow-md scale-105 bg-card ring-2 ring-primary/20" : "bg-card"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground font-bold text-xs px-3 py-0.5 shadow">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <CardHeader className="pt-8">
                <span className="text-xs font-bold text-muted-foreground uppercase">{p.badge}</span>
                <CardTitle className="text-2xl font-bold mt-1">{p.name}</CardTitle>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">{p.amount}</span>
                  <span className="text-xs text-muted-foreground">{p.period}</span>
                </div>
                <CardDescription className="text-xs mt-2">{p.desc}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-2 border-t text-sm flex-1">
                <ul className="space-y-2.5 pt-3">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs font-medium">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4 border-t">
                <Link to={`/register?plan=${p.id}`} className="w-full">
                  <Button
                    variant={p.popular ? "default" : "outline"}
                    className="w-full font-bold text-xs h-11 gap-1.5"
                  >
                    <span>{p.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-14 text-center text-xs text-muted-foreground">
          Already registered?{" "}
          <Link to="/student-login" className="text-primary font-bold hover:underline">
            Sign in as a student
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

export default SubscriptionPlansPage;
