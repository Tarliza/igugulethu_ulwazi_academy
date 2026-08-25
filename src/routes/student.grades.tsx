
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp, CheckCircle } from "lucide-react";
import { getCurrentStudent, Student } from "@/lib/student-storage";

export const Route = createFileRoute("/student/grades")({
  component: StudentGradesPage,
});

export function StudentGradesPage() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    setStudent(getCurrentStudent());
  }, []);

  const results = [
    { assessment: "Term 1 Control Test", subject: "Mathematics", score: "82%", status: "Passed (Level 7)", date: "August 2026" },
    { assessment: "Practical Assignment 1", subject: "Life Sciences", score: "74%", status: "Passed (Level 6)", date: "August 2026" },
    { assessment: "Mid-Year Assessment", subject: "Mathematics", score: "78%", status: "Passed (Level 6)", date: "July 2026" },
  ];

  return (
    <PortalShell role="student" title="Academic Standing & Grades">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">Assessment Marks & Performance Reports</h2>
          <p className="text-sm text-muted-foreground">Official evaluation reports and test results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {results.map((r, idx) => (
            <Card key={idx} className="border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs">{r.subject}</Badge>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <CardTitle className="text-base font-bold mt-1.5">{r.assessment}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Score:</span>
                  <span className="text-lg font-extrabold text-green-600">{r.score}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Rating:</span>
                  <span className="font-semibold text-foreground">{r.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
