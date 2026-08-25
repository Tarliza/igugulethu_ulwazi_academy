
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCurrentStudent, Student } from "@/lib/student-storage";
import { BookOpen, FileText, CheckCircle2, Video, Download } from "lucide-react";

export const Route = createFileRoute("/student/subjects")({
  component: StudentSubjectsPage,
});

export function StudentSubjectsPage() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    setStudent(getCurrentStudent());
  }, []);

  const subjects = student?.subjects || ["Mathematics", "Life Sciences"];

  return (
    <PortalShell role="student" title="Subjects & Modules">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">Your Enrolled Subjects</h2>
          <p className="text-sm text-muted-foreground">Access modules, study notes, and curriculum breakdown.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((sub) => (
            <Card key={sub} className="border shadow-sm hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary/10 text-primary">{student?.grade || "Grade 11"}</Badge>
                  <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Enrolled</Badge>
                </div>
                <CardTitle className="text-xl font-bold mt-2">{sub}</CardTitle>
                <CardDescription>Term 1 & 2 comprehensive revision curriculum</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-2 border-t pt-3">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase">Key Topics Covered:</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground list-disc list-inside">
                    <li>Core foundational theory & principles</li>
                    <li>Past examination problem-solving techniques</li>
                    <li>Weekly live interactive tutorial sessions</li>
                  </ul>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Button size="sm" variant="outline" className="w-full gap-1.5 text-xs">
                    <FileText className="h-4 w-4" /> Notes
                  </Button>
                  <Button size="sm" className="w-full gap-1.5 text-xs">
                    <Video className="h-4 w-4" /> Live Room
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
