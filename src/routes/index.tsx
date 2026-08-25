import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { SiteHeader } from '../components/landing/SiteHeader';
import { SiteFooter } from '../components/landing/SiteFooter';
import { Button } from '../components/ui/button';
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-6">
            <GraduationCap className="h-4 w-4" />
            Empowering South Africa's Future Leaders
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Welcome to <span className="text-primary">Igugulethu Ulwazi</span> Academy
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Providing high-quality academic support, tutoring, and portal management for students and staff.
          </p>

          {/* Hero Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link to="/student-login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <UserCheck className="h-5 w-5" />
                Student Portal
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/staff-login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <ShieldCheck className="h-5 w-5" />
                Staff Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Academy Features & Academic Services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Everything you need for seamless learning and administrative management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Modules & Curriculum</h3>
              <p className="text-sm text-muted-foreground">
                Access comprehensive study materials, course outlines, and subject resources anywhere.
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Timetable & Scheduling</h3>
              <p className="text-sm text-muted-foreground">
                Stay updated with lecture schedules, exam timetables, and tutorial bookings.
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Grades & Assessments</h3>
              <p className="text-sm text-muted-foreground">
                Track academic progress, test scores, and official performance reports securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

export default LandingPage;
