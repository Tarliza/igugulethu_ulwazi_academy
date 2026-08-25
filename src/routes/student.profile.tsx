
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, School, GraduationCap, Shield } from "lucide-react";
import { getCurrentStudent, Student } from "@/lib/student-storage";

export const Route = createFileRoute("/student/profile")({
  component: StudentProfilePage,
});

export function StudentProfilePage() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    setStudent(getCurrentStudent());
  }, []);

  return (
    <PortalShell role="student" title="Student Profile">
      <div className="space-y-6 max-w-3xl">
        <div>
          <h2 className="text-xl font-bold">Personal & Academic Details</h2>
          <p className="text-sm text-muted-foreground">View your enrolled profile information.</p>
        </div>

        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-2xl uppercase">
                {student?.fullName.charAt(0) || "S"}
              </div>
              <div>
                <CardTitle className="text-xl font-bold">{student?.fullName || "Student Name"}</CardTitle>
                <CardDescription className="font-mono text-xs text-primary font-semibold mt-0.5">
                  {student?.studentNumber || "STU2026001"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 border-t pt-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Email Address</Label>
                <Input value={student?.email || ""} readOnly className="bg-muted/40" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Phone Number</Label>
                <Input value={student?.phone || ""} readOnly className="bg-muted/40" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Current Grade</Label>
                <Input value={student?.grade || ""} readOnly className="bg-muted/40" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">School</Label>
                <Input value={student?.school || ""} readOnly className="bg-muted/40" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
