import React, { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCurrentStudent, Student } from "@/lib/student-storage";
import { FileText, Video, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/student/subjects")({
  component: StudentSubjectsPage,
});

export function StudentSubjectsPage() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const refresh = () => setStudent(getCurrentStudent());
    refresh();
    window.addEventListener("academy-data-updated", refresh);
    return () => window.removeEventListener("academy-data-updated", refresh);
  }, []);

  const subjects = student?.subjects ?? [];

  return (
    <PortalShell role="student" title="Subjects & Modules">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">Your Enrolled Subjects</h2>
          <p className="text-sm text-muted-foreground">Your active enrolment determines which subject resources and sessions are available to you.</p>
        </div>

        {!student ? (
          <Card className="border-dashed"><CardContent className="py-10 text-center space-y-2">
            <h3 className="font-semibold">Loading your enrolment…</h3>
            <p className="text-sm text-muted-foreground">Your subjects will appear once your student record has loaded.</p>
          </CardContent></Card>
        ) : subjects.length === 0 ? (
          <Card className="border-dashed"><CardContent className="py-10 text-center space-y-2">
            <h3 className="font-semibold">No subjects are attached to your enrolment yet</h3>
            <p className="text-sm text-muted-foreground">Please contact academy staff to check your approved registration. We won't display sample subjects as if you were enrolled.</p>
          </CardContent></Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject) => (
              <Card key={subject} className="border shadow-sm hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <Badge className="bg-primary/10 text-primary">{student.grade || "Grade not set"}</Badge>
                    <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200">Enrolled</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold mt-2">{subject}</CardTitle>
                  <CardDescription>Resources and scheduled sessions for your enrolled subject.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center gap-2">
                  <Link to="/student/library" className="w-full">
                    <Button size="sm" variant="outline" className="w-full gap-1.5 text-xs">
                      <FileText className="h-4 w-4" /> Subject Notes
                    </Button>
                  </Link>
                  <Link to="/student/timetable" className="w-full">
                    <Button size="sm" className="w-full gap-1.5 text-xs">
                      <Video className="h-4 w-4" /> Live Sessions
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="flex justify-end">
          <Link to="/student/timetable"><Button variant="ghost" className="gap-2"><CalendarDays className="h-4 w-4" /> View full timetable</Button></Link>
        </div>
      </div>
    </PortalShell>
  );
}

export default StudentSubjectsPage;
