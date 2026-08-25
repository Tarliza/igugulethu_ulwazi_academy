
import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ACADEMY_SUBJECTS } from "@/lib/student-storage";
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Calendar,
  Award,
  Sparkles,
  CheckCircle2,
  Users,
  Clock,
  Compass,
  FileText,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

export function LandingPage() {
  // Slideshow Images (Classroom & Academy Learning)
  const heroImages = [
    "/hero-students.jpg",
    "/hero-image2.webp",
    "/hero-image3.webp",
    "/hero-image4.webp",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const [selectedSubject, setSelectedSubject] = useState<string>("Mathematics");

  const subjectDetails: Record<string, { desc: string; focus: string[]; gradeRange: string }> = {
    "Physical Sciences": {
      desc: "Comprehensive mastery in Physics & Chemistry principles, Newton laws, electricity, chemical change, and exam problem-solving.",
      focus: ["Mechanics & Motion", "Chemical Reactions & Rates", "Electric Circuits", "Past Paper Exam Prep"],
      gradeRange: "Grade 10 - 12 (NSC & CAPS)",
    },
    "Mathematics": {
      desc: "Focused mastery in Functions, Calculus, Trigonometry, Analytical Geometry, Probability, and Algebraic problem-solving.",
      focus: ["Functions & Inverses", "Differential Calculus", "Euclidean & Analytical Geometry", "Financial Mathematics"],
      gradeRange: "Grade 8 - 12 (NSC & CAPS)",
    },
    "Mathematical Literacy": {
      desc: "Practical numeracy, financial documents, measurement, maps, plans, and real-world mathematical applications.",
      focus: ["Financial Documents & Tax", "Measurement & Scale Plans", "Data Handling", "Probability"],
      gradeRange: "Grade 10 - 12 (NSC & CAPS)",
    },
    "Economics": {
      desc: "Microeconomics, Macroeconomics, contemporary economic issues, public sector dynamics, and market structures.",
      focus: ["Circular Flow & National Accounts", "Market Structures & Price Theory", "Economic Growth & Inflation", "Globalisation"],
      gradeRange: "Grade 10 - 12 (NSC & CAPS)",
    },
    "Business Studies": {
      desc: "Business environments, ventures, roles, business operations, leadership management, and investment strategies.",
      focus: ["Macro & Micro Environments", "Human Resources & Labour Law", "Ethics & Corporate Governance", "Business Strategies"],
      gradeRange: "Grade 10 - 12 (NSC & CAPS)",
    },
    "History": {
      desc: "Critical source analysis, essay formulation, Cold War history, South African transformation, and global political shifts.",
      focus: ["Source-Based Analysis", "Discursive Essay Writing", "Cold War & Civil Rights", "South African Democratic Transition"],
      gradeRange: "Grade 10 - 12 (NSC & CAPS)",
    },
    "Geography": {
      desc: "Climatology, Geomorphology, Mapwork calculations, Settlement geography, and Economic Geography of South Africa.",
      focus: ["Climatology & Weather Systems", "Topographic Mapwork & GIS", "Rural & Urban Settlement", "Economic Geography"],
      gradeRange: "Grade 10 - 12 (NSC & CAPS)",
    },
    "Life Science": {
      desc: "DNA, genetics, human reproduction, endocrine systems, environmental studies, and cellular biology.",
      focus: ["Genetics & Inheritance", "Meiosis & Reproduction", "Human Physiology & Endocrine", "Evolution & Ecology"],
      gradeRange: "Grade 10 - 12 (NSC & CAPS)",
    },
  };

  const whyChooseUsPillars = [
    { title: "Cultivate 100% Pass Rate", desc: "Proven track record of transforming average marks into Level 7 distinctions.", icon: Award },
    { title: "Complete Syllabus in Time", desc: "Structured timeline ensuring every chapter is completed months ahead of final exams.", icon: Clock },
    { title: "Weekend Camps & Night Tutoring", desc: "Immersive weekend study bootcamps and intensive cross-night revision sprints.", icon: Sparkles },
    { title: "Previous Exam Papers Exposure", desc: "Rigorous practice with 10+ years of national NSC past papers and official memos.", icon: FileText },
    { title: "Learn Instead of Just Passing", desc: "Deep conceptual grasp that builds long-term confidence and academic resilience.", icon: BookOpen },
    { title: "University & College Applications", desc: "Personalized guidance for tertiary bursary applications and university entrance.", icon: Compass },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      {/* Hero Section with Classroom Slideshow */}
      <section className="relative min-h-[580px] sm:min-h-[660px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Background Slideshow Images */}
        {heroImages.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-35 scale-105" : "opacity-0 scale-100"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              transition: "opacity 1000ms ease-in-out, transform 8000ms ease-out",
            }}
          />
        ))}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-slate-950/70 to-slate-950/90" />

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary-foreground mb-6 border border-primary/30 shadow-inner">
            <GraduationCap className="h-4 w-4 text-primary" />
            Change Lives • Inspire Dreams • Push Limits
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Welcome to <span className="text-primary underline decoration-primary/40 underline-offset-8">Igugulethu Ulwazi</span> Academy
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            High-impact academic tutoring, full-scale study camps, and structured portal management designed to help learners achieve <strong>A Grades</strong>.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link to="/student-login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-sm font-bold shadow-lg h-12 px-6">
                <UserCheck className="h-5 w-5" />
                Student Portal
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/staff-login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-sm font-bold bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800 h-12 px-6">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Staff Portal
              </Button>
            </Link>
          </div>

          {/* Slideshow Indicators */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {heroImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide ? "w-8 bg-primary" : "w-2 bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Offered Subjects Section (From Functional Academy) */}
      <section className="py-16 sm:py-24 bg-card border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 uppercase tracking-wider text-xs">
              ACADEMIC OFFERINGS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Subjects We Offer
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Select any subject below to see our curriculum coverage, focus areas, and exam preparation approach.
            </p>
          </div>

          {/* Subject Pills Selection */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {ACADEMY_SUBJECTS.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubject(sub)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                  selectedSubject === sub
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground border-border"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Active Subject Detail Card */}
          {selectedSubject && subjectDetails[selectedSubject] && (
            <div className="bg-muted/30 border border-primary/20 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-foreground">{selectedSubject}</h3>
                      <Badge variant="outline" className="text-xs font-semibold mt-1">
                        {subjectDetails[selectedSubject].gradeRange}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {subjectDetails[selectedSubject].desc}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                      Core Revision & Examination Focus:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {subjectDetails[selectedSubject].focus.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs font-medium text-foreground bg-background p-2.5 rounded-lg border">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-xl border space-y-4 text-center lg:text-left">
                  <h4 className="font-bold text-sm text-foreground">Ready to Excel in {selectedSubject}?</h4>
                  <p className="text-xs text-muted-foreground">
                    Enroll now to get live tutorials, past paper questions, and tutor support.
                  </p>
                  <Link to="/subscription" className="block">
                    <Button className="w-full gap-1.5 text-xs font-bold">
                      View Pricing & Enroll
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us & Approach Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 uppercase tracking-wider text-xs">
              WHY CHOOSE US
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Guaranteed Approach for Academic Results
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              We provide tutors, resources, and an interactive teaching approach that guarantees our clients the best academic outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsPillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all hover:border-primary/40 space-y-3"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enrollment Call to Action */}
      <section className="py-14 sm:py-18 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Worried About Your Academic Results?
          </h2>
          <p className="text-sm sm:text-base text-primary-foreground/90 max-w-xl mx-auto">
            Join Igugulethu Ulwazi Academy today. Choose your subjects and start mastering your syllabus.
          </p>
          <div className="pt-2">
            <Link to="/subscription">
              <Button size="lg" variant="secondary" className="font-bold text-sm h-12 px-8 shadow-xl">
                Choose a Subscription Plan
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export default LandingPage;
