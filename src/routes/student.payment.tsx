
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle2, ShieldCheck } from "lucide-react";
import { getCurrentStudent, Student } from "@/lib/student-storage";

export const Route = createFileRoute("/student/payment")({
  component: StudentPaymentPage,
});

export function StudentPaymentPage() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    setStudent(getCurrentStudent());
  }, []);

  return (
    <PortalShell role="student" title="Subscription & Fee Payments">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-xl font-bold">Subscription & Billing Status</h2>
          <p className="text-sm text-muted-foreground">Manage your monthly tuition fee and view payment receipts.</p>
        </div>

        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge className="bg-green-500/15 text-green-700 border-green-500/30">Active Subscription</Badge>
              <span className="text-2xl font-extrabold text-primary">{student?.amount || "R550"}<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
            </div>
            <CardTitle className="text-lg font-bold mt-2">{student?.plan || "2 Subjects"} Plan</CardTitle>
            <CardDescription>Includes live weekly group tutoring, learning library access, and assessment grading.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs border-t pt-4">
            <div className="bg-muted/40 p-4 rounded-xl space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Student Name:</span>
                <span className="font-semibold text-foreground">{student?.fullName || "Student"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Student ID:</span>
                <span className="font-mono font-bold text-foreground">{student?.studentNumber || "STU2026001"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-semibold text-foreground">EFT / Instant Transfer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status:</span>
                <span className="font-semibold text-green-600">Verified by Administration</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
