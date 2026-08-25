
import React, { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getCurrentStudent,
  getResourcesForStudent,
  getScheduleEvents,
  getAnnouncements,
  getStudentAverage,
  Student,
  Resource,
  ScheduleEvent,
  Announcement
} from "@/lib/student-storage";
import {
  BookOpen,
  Calendar,
  Award,
  Clock,
  ArrowRight,
  Download,
  Video,
  ExternalLink,
  MessageSquare,
  Sparkles,
  BookmarkPlus
} from "lucide-react";

export const Route = createFileRoute("/student/")({
  component: StudentDashboardPage,
});

export function StudentDashboardPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<ScheduleEvent[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const current = getCurrentStudent();
    if (!current) {
      navigate({ to: "/student-login" });
      return;
    }
    setStudent(current);
    // Strict Subject Filtering
    setResources(getResourcesForStudent(current.subjects || []));
    setUpcomingClasses(getScheduleEvents());
    setAnnouncements(getAnnouncements());
  }, [navigate]);

  if (!student) return null;

  const averageScore = getStudentAverage(student);
  const nextSession = upcomingClasses.find((ev) => student.subjects.includes(ev.subject) || ev.subject === "All Subjects");

  return (
    <PortalShell role="student" title="Student Dashboard">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="font-mono text-xs font-bold bg-primary text-primary-foreground">
                  {student.studentNumber}
                </Badge>
                <Badge className="bg-green-500/15 text-green-700 border-green-500/30 text-xs font-semibold">
                  {student.status}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {student.fullName}!
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                Grade: <strong className="text-foreground">{student.grade}</strong> • School: <strong className="text-foreground">{student.school}</strong> • Plan: <strong className="text-primary font-bold">{student.plan} ({student.amount}/mo)</strong>
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Link to="/student/timetable">
                <Button size="sm" className="gap-1.5 font-bold shadow">
                  <Calendar className="h-4 w-4" /> View Timetable
                </Button>
              </Link>
              {student.plan === "3 Subjects" && (
                <Link to="/student/book">
                  <Button size="sm" variant="secondary" className="gap-1.5 font-bold">
                    <BookmarkPlus className="h-4 w-4 text-primary" /> Book 1-on-1
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Enrolled Subjects */}
          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Enrolled Subjects</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-extrabold">{student.subjects.length}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {student.subjects.map((sub) => (
                  <Badge key={sub} variant="secondary" className="text-[11px] font-medium">
                    {sub}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Live Session (Tied to Staff Schedule) */}
          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Next Live Class</CardTitle>
              <Video className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {nextSession ? (
                <div>
                  <div className="text-sm font-bold text-foreground truncate">{nextSession.title}</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {nextSession.date} ({nextSession.time})
                  </p>
                  <a href={nextSession.teamsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline mt-2">
                    Join Teams Meeting <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ) : (
                <div>
                  <div className="text-sm font-semibold text-muted-foreground">No upcoming sessions yet</div>
                  <p className="text-xs text-muted-foreground mt-1">Your tutor will publish class times shortly.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Academic Standing (Calculated from Tutor Test Marks) */}
          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Academic Standing</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {averageScore > 0 ? (
                <div>
                  <div className="text-2xl font-extrabold text-green-600">{averageScore}% Average</div>
                  <p className="text-xs text-muted-foreground mt-1">Calculated from {student.grades?.length || 0} assessment(s)</p>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-extrabold text-muted-foreground">0% Average</div>
                  <p className="text-xs text-muted-foreground mt-1">No marks captured yet by tutors.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Study Resources & Notes (Strictly Enrolled Subjects) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold">Study Resources & Study Notes</h2>
              <p className="text-xs text-muted-foreground">Filtered study notes and past papers matching your enrolled subjects</p>
            </div>
            <Link to="/student/library">
              <Button variant="ghost" size="sm" className="text-xs text-primary font-bold gap-1">
                View Full Library ({resources.length}) <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.length === 0 ? (
              <Card className="p-8 text-center border-dashed col-span-2 space-y-2">
                <BookOpen className="h-8 w-8 mx-auto text-muted-foreground opacity-60" />
                <p className="text-sm font-semibold">No study resources uploaded for your subjects yet.</p>
                <p className="text-xs text-muted-foreground">Your tutors will upload notes and worksheets here.</p>
              </Card>
            ) : (
              resources.slice(0, 4).map((res) => (
                <Card key={res.id} className="shadow-sm border hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Badge variant="outline" className="text-[11px] mb-1 bg-primary/10 text-primary font-bold">
                          {res.subject}
                        </Badge>
                        <CardTitle className="text-base font-bold">{res.title}</CardTitle>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1 text-xs shrink-0 font-semibold">
                        <Download className="h-3.5 w-3.5" /> Download
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground line-clamp-2">{res.description}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Announcements from Staff */}
        {announcements.length > 0 && (
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" /> Academy Announcements
            </h2>
            <div className="space-y-3">
              {announcements.map((ann) => (
                <Card key={ann.id} className="border shadow-sm">
                  <CardHeader className="pb-1.5">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-bold">{ann.title}</CardTitle>
                      <span className="text-[11px] text-muted-foreground">{new Date(ann.createdAt).toLocaleDateString()}</span>
                    </div>
                    <CardDescription className="text-xs font-semibold text-primary">{ann.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground whitespace-pre-line">
                    {ann.content}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}

export default StudentDashboardPage;
