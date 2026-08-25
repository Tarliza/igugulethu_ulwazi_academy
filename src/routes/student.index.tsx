
import React, { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCurrentStudent, getResources, Student, Resource } from "@/lib/student-storage";
import { BookOpen, Calendar, Award, Clock, ArrowRight, User, Download, CheckCircle2, Video } from "lucide-react";

export const Route = createFileRoute("/student/")({
  component: StudentDashboardPage,
});

export function StudentDashboardPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const current = getCurrentStudent();
    if (!current) {
      // If not logged in, fallback to mock demo or redirect
      setStudent({
        id: "demo",
        studentNumber: "STU2026001",
        fullName: "Kuhle Ngam",
        email: "kuhlengam65@gmail.com",
        phone: "0687921613",
        grade: "Grade 11",
        school: "Kenilworth",
        subjects: ["Mathematics", "Life Sciences"],
        plan: "2 Subjects",
        amount: "R550",
        status: "Active",
        enrolledAt: new Date().toISOString(),
      });
    } else {
      setStudent(current);
    }
    setResources(getResources());
  }, []);

  return (
    <PortalShell role="student">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Student Welcome Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="font-mono text-xs font-bold bg-primary text-primary-foreground">
                  {student?.studentNumber || "STU2026001"}
                </Badge>
                <Badge className="bg-green-500/15 text-green-700 border-green-500/30 text-xs">
                  {student?.status || "Active Enrolled"}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {student?.fullName || "Student"}!
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Grade: <strong className="text-foreground">{student?.grade}</strong> • School: <strong className="text-foreground">{student?.school}</strong> • Plan: <strong className="text-foreground">{student?.plan}</strong>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link to="/student/timetable">
                <Button size="sm" className="gap-1.5">
                  <Calendar className="h-4 w-4" /> View Timetable
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Enrolled Subjects</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student?.subjects.length || 2}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {student?.subjects.map((sub) => (
                  <Badge key={sub} variant="secondary" className="text-xs">
                    {sub}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Live Session</CardTitle>
              <Video className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-foreground">Maths: Functions & Graphs</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Saturday, 10:00 AM - 11:30 AM
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Academic Standing</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">78% Average</div>
              <p className="text-xs text-muted-foreground mt-1">Based on latest term tests</p>
            </CardContent>
          </Card>
        </div>

        {/* Resources & Materials */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold">Study Resources & Study Notes</h2>
              <p className="text-xs text-muted-foreground">Downloads shared by your tutors</p>
            </div>
            <Link to="/student/library">
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1">
                View library <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.length === 0 ? (
              <Card className="p-6 text-center border-dashed col-span-2">
                <p className="text-sm text-muted-foreground">No resources uploaded yet. Check back soon!</p>
              </Card>
            ) : (
              resources.slice(0, 4).map((res) => (
                <Card key={res.id} className="shadow-sm border hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">{res.subject}</Badge>
                        <CardTitle className="text-base font-bold">{res.title}</CardTitle>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1 text-xs shrink-0">
                        <Download className="h-3.5 w-3.5" /> Download
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground line-clamp-2">{res.description || "Comprehensive revision worksheet."}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
