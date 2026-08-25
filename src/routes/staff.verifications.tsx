
import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getPendingRegistrations, approveRegistration, rejectRegistration, Registration, Student } from "@/lib/student-storage";
import { CheckCircle2, XCircle, FileText, UserCheck, ShieldCheck, Mail, Phone, School, BookOpen } from "lucide-react";

export const Route = createFileRoute("/staff/verifications")({
  component: StaffVerificationsPage,
});

export function StaffVerificationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [approvedStudent, setApprovedStudent] = useState<{ student: Student; studentNumber: string } | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const loadData = () => {
    setRegistrations(getPendingRegistrations());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = (regId: string) => {
    const result = approveRegistration(regId);
    if (result) {
      setApprovedStudent(result);
      setShowApprovalModal(true);
      loadData();
    }
  };

  const handleReject = (regId: string) => {
    if (confirm("Are you sure you want to reject this registration application?")) {
      rejectRegistration(regId);
      loadData();
    }
  };

  return (
    <PortalShell role="staff">
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Pending Student Verifications</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Review new student registrations, inspect proof of payment, and approve accounts to generate student numbers.
            </p>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1 bg-amber-500/10 text-amber-600 border-amber-500/20 w-fit">
            {registrations.length} Pending Approval{registrations.length === 1 ? "" : "s"}
          </Badge>
        </div>

        {registrations.length === 0 ? (
          <Card className="text-center py-12 border-dashed">
            <CardContent className="space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <UserCheck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">No pending verifications</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                All registered students have been verified or there are no new registration applications waiting.
              </p>
              <div className="pt-2">
                <Link to="/staff/students">
                  <Button variant="outline" size="sm">
                    View Enrolled Students Roster
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrations.map((reg) => (
              <Card key={reg.id} className="shadow-sm hover:shadow-md transition-shadow border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold">{reg.fullName}</CardTitle>
                      <CardDescription className="flex items-center gap-1.5 mt-1">
                        <Mail className="h-3.5 w-3.5" />
                        {reg.email}
                      </CardDescription>
                    </div>
                    <Badge className="bg-amber-500/15 text-amber-700 border-amber-500/30">
                      Pending Payment
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-2 bg-muted/40 p-3 rounded-lg text-xs">
                    <div>
                      <span className="text-muted-foreground">Grade:</span> <strong className="text-foreground">{reg.grade}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground">School:</span> <strong className="text-foreground">{reg.school || "N/A"}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span> <strong className="text-foreground">{reg.phone}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Plan:</span> <strong className="text-foreground">{reg.plan} ({reg.amount}/mo)</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-muted-foreground block mb-1.5">Selected Subjects:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {reg.subjects.map((sub) => (
                        <Badge key={sub} variant="secondary" className="text-xs font-normal">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {reg.proofOfPaymentName && (
                    <div className="flex items-center gap-2 p-2.5 rounded-md border bg-background text-xs">
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <span className="truncate font-medium flex-1">{reg.proofOfPaymentName}</span>
                      <Badge variant="outline" className="text-[10px] text-green-600 bg-green-50 border-green-200">
                        Uploaded
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button
                      type="button"
                      onClick={() => handleApprove(reg.id)}
                      className="flex-1 gap-1.5 bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Approve & Activate
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleReject(reg.id)}
                      size="sm"
                      className="gap-1.5"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Approval Success Modal */}
        <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <DialogTitle className="text-center text-xl">Student Approved Successfully!</DialogTitle>
              <DialogDescription className="text-center">
                The student account has been activated and enrolled in the academy portal.
              </DialogDescription>
            </DialogHeader>
            {approvedStudent && (
              <div className="bg-muted/50 p-4 rounded-xl space-y-2.5 text-sm my-2 border">
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Student Name:</span>
                  <span className="font-semibold">{approvedStudent.student.fullName}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Generated Student Number:</span>
                  <Badge className="font-mono text-sm bg-primary text-primary-foreground font-bold px-2.5 py-0.5">
                    {approvedStudent.studentNumber}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Student Email:</span>
                  <span>{approvedStudent.student.email}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Assigned Plan:</span>
                  <span>{approvedStudent.student.plan}</span>
                </div>
              </div>
            )}
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Link to="/staff/students" className="w-full">
                <Button className="w-full">View in Student Roster</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PortalShell>
  );
}
