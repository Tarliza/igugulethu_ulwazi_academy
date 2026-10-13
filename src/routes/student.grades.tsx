import React, { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, MessageSquare } from "lucide-react";
import { getCurrentStudent, getStudentAverage, Student } from "@/lib/student-storage";

export const Route = createFileRoute("/student/grades")({
  component: StudentGradesPage,
});

export function StudentGradesPage() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const refresh = () => setStudent(getCurrentStudent());
    refresh();
    window.addEventListener("academy-data-updated", refresh);
    return () => window.removeEventListener("academy-data-updated", refresh);
  }, []);

  const grades = student?.grades ?? [];
  const average = useMemo(() => getStudentAverage(student), [student]);

  return (
    <PortalShell role="student" title="Grades & Results">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Assessment Scores & Tutor Feedback</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Marks below are the assessments actually recorded by academy staff.</p>
          </div>
          <Badge className="text-sm px-3.5 py-1.5 font-extrabold bg-green-500/15 text-green-700 border-green-500/30 w-fit">
            Overall Average: {grades.length ? `${average}%` : "Not yet available"}
          </Badge>
        </div>

        {!student ? (
          <Card className="text-center py-12 border-dashed"><CardContent><p className="text-sm text-muted-foreground">Loading your student record…</p></CardContent></Card>
        ) : grades.length === 0 ? (
          <Card className="text-center py-12 border-dashed space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground"><Award className="h-6 w-6" /></div>
            <h3 className="font-semibold text-lg">No test marks recorded yet</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">Your marks and feedback will appear here after your tutor saves an assessment in the staff portal.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {grades.map((grade) => {
              const pct = grade.maxScore > 0 ? Math.round((grade.score / grade.maxScore) * 100) : 0;
              const level = pct >= 80 ? "Level 7 (Outstanding)" : pct >= 70 ? "Level 6 (Meritorious)" : pct >= 60 ? "Level 5 (Substantial)" : pct >= 50 ? "Level 4 (Moderate)" : "Needs Attention";
              return (
                <Card key={grade.id} className="border shadow-sm hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center gap-2">
                      <Badge variant="outline" className="text-xs font-bold">{grade.subject}</Badge>
                      <span className="text-[11px] text-muted-foreground">{grade.date}</span>
                    </div>
                    <CardTitle className="text-base font-bold mt-2">{grade.assessment}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs border-t pt-3">
                    <div className="flex items-center justify-between"><span className="text-muted-foreground">Score / Total:</span><strong className="text-base text-foreground font-mono">{grade.score} / {grade.maxScore}</strong></div>
                    <div className="flex items-center justify-between"><span className="text-muted-foreground">Percentage:</span><strong className="text-base text-green-600 font-extrabold">{pct}%</strong></div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground"><span>Rating:</span><span className="font-semibold text-foreground">{level}</span></div>
                    {grade.tutorFeedback && <div className="bg-muted/40 p-2.5 rounded-lg border text-[11px] text-muted-foreground space-y-1 mt-2"><strong className="text-foreground flex items-center gap-1"><MessageSquare className="h-3 w-3 text-primary" /> Tutor Feedback:</strong><p>{grade.tutorFeedback}</p></div>}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </PortalShell>
  );
}

export default StudentGradesPage;
