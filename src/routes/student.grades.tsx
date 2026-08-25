
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, MessageSquare } from "lucide-react";
import { getCurrentStudent, getStudentAverage, Student } from "@/lib/student-storage";

export const Route = createFileRoute("/student/grades")({
  component: StudentGradesPage,
});

export function StudentGradesPage() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    setStudent(getCurrentStudent());
  }, []);

  const grades = student?.grades || [];
  const average = getStudentAverage(student);

  return (
    <PortalShell role="student" title="Grades & Results">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Assessment Scores & Tutor Feedback</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Official test scores and feedback recorded by your academy instructors.
            </p>
          </div>
          <Badge className="text-sm px-3.5 py-1.5 font-extrabold bg-green-500/15 text-green-700 border-green-500/30 w-fit">
            Overall Average: {average > 0 ? `${average}%` : "0% (No tests captured yet)"}
          </Badge>
        </div>

        {grades.length === 0 ? (
          <Card className="text-center py-12 border-dashed space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">No test marks recorded yet</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              As your tutors set tests and review your submissions, your scores and feedback will appear here.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {grades.map((g) => {
              const pct = Math.round((g.score / g.maxScore) * 100);
              const level = pct >= 80 ? "Level 7 (Outstanding)" : pct >= 70 ? "Level 6 (Meritorious)" : pct >= 60 ? "Level 5 (Substantial)" : pct >= 50 ? "Level 4 (Moderate)" : "Needs Attention";

              return (
                <Card key={g.id} className="border shadow-sm hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs font-bold">{g.subject}</Badge>
                      <span className="text-[11px] text-muted-foreground">{g.date}</span>
                    </div>
                    <CardTitle className="text-base font-bold mt-2">{g.assessment}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs border-t pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Score / Total:</span>
                      <strong className="text-base text-foreground font-mono">{g.score} / {g.maxScore}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Percentage:</span>
                      <strong className="text-base text-green-600 font-extrabold">{pct}%</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Rating:</span>
                      <span className="font-semibold text-foreground">{level}</span>
                    </div>
                    {g.tutorFeedback && (
                      <div className="bg-muted/40 p-2.5 rounded-lg border text-[11px] text-muted-foreground space-y-1 mt-2">
                        <strong className="text-foreground flex items-center gap-1">
                          <MessageSquare className="h-3 w-3 text-primary" /> Tutor Feedback:
                        </strong>
                        <p>{g.tutorFeedback}</p>
                      </div>
                    )}
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
