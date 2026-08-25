
import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Users,
  Award,
  CheckCircle2,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  Moon,
  Video,
  FileText
} from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

export function AboutPage() {
  const approaches = [
    {
      title: "Full-Scale Weekend Camps",
      desc: "Immersive weekend bootcamps structured around intense exam problem walkthroughs, peer revision, and one-on-one tutor clinics.",
      icon: Users,
    },
    {
      title: "Cross-Night Tutoring",
      desc: "Dedicated overnight academic revision sprints specifically designed for deep-focus topic mastery and high-stress exam readiness.",
      icon: Moon,
    },
    {
      title: "Interactive Online Classes",
      desc: "Live digital classrooms equipped with interactive whiteboards, recorded sessions for revision, and direct Q&A with experienced tutors.",
      icon: Video,
    },
    {
      title: "Exposure to Previous Exam Papers",
      desc: "Comprehensive analysis of 10+ years of national examination past papers, examiner marking guidelines, and recurring question traps.",
      icon: FileText,
    },
  ];

  const coreGoals = [
    "Improve Study Skills and Memorization Techniques",
    "Learn for Deep Conceptual Mastery Instead of Just Passing",
    "Prepare Rigorously for Mid-Year and Final NSC Examinations",
    "Access Extensive High-Yield Exam Revision Material",
    "Cultivate and Maintain a 100% Student Pass Rate",
    "Complete the Full Academic Syllabus Months Ahead of Schedule",
    "Produce High-Quality, Confident, University-Ready Students",
    "Direct Guidance for University, College, and Tertiary Bursary Applications",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-primary/10 via-background to-background py-16 sm:py-24 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1 font-bold">
            ABOUT IGUGULETHU ULWAZI ACADEMY
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Change Lives • Inspire Dreams • Push Limits
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Igugulethu Ulwazi Academy offers specialized academic tutoring services to schools and individuals who aim to achieve A Grades in their subjects.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Worried About Academic Results?</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We believe that every student has the potential to excel when provided with dedicated mentors, structured syllabus roadmaps, and an encouraging learning atmosphere.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We provide experienced tutors, high-yield study resources, and an interactive teaching approach that guarantees our learners the best academic results.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-muted/40 border space-y-4 shadow-sm">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" /> Our Core Mission
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To bridge educational gaps, awaken a genuine desire to learn, and ensure high school learners across South Africa transition smoothly into tertiary education with distinction-level marks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Unique Approach (From Functional Academy) */}
      <section className="py-16 sm:py-20 bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 text-xs">METHODOLOGY</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Unique Approach</h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Our interactive, efficient, and fun learning techniques allow students to grasp and understand their lessons effectively, awakening in them a desire to learn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approaches.map((app) => {
              const Icon = app.icon;
              return (
                <Card key={app.title} className="border shadow-sm hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 space-y-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-base text-foreground">{app.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{app.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us 8 Pillars */}
      <section className="py-16 sm:py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Why Choose Igugulethu Ulwazi?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Key commitments we deliver to every enrolled student.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coreGoals.map((goal) => (
              <div key={goal} className="flex items-start gap-3 p-4 rounded-xl border bg-card shadow-sm text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{goal}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/subscription">
              <Button size="lg" className="gap-2 font-bold px-8 h-12">
                Enroll With Us Today
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export default AboutPage;
