import React, { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getPendingRegistrations, approveRegistration, rejectRegistration, Registration, Student } from "@/lib/student-storage";
import { supabase } from "@/integrations/client";
import { CheckCircle2, XCircle, FileText, UserCheck, Mail, BookOpen, Loader2, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/staff/verifications")({ component: StaffVerificationsPage });

export function StaffVerificationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [approvedStudent, setApprovedStudent] = useState<{ student: Student; studentNumber: string; password?: string } | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [proofBusyId, setProofBusyId] = useState<string | null>(null);

  const loadData = () => setRegistrations([...getPendingRegistrations()]);
  useEffect(() => {
    loadData();
    const refresh = () => loadData();
    window.addEventListener("academy-data-updated", refresh);
    return () => window.removeEventListener("academy-data-updated", refresh);
  }, []);

  const handleApprove = async (regId: string) => {
    setBusyId(regId);
    try {
      const result = await approveRegistration(regId);
      if (!result) throw new Error("Student activation failed. Please try again.");
      setApprovedStudent(result);
      setShowApprovalModal(true);
      loadData();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Student activation failed.");
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (regId: string) => {
    if (!confirm("Are you sure you want to reject this registration application?")) return;
    setBusyId(regId);
    try { await rejectRegistration(regId); loadData(); }
    catch (error) { alert(error instanceof Error ? error.message : "Could not reject registration."); }
    finally { setBusyId(null); }
  };

  const handleViewProof = async (registration: Registration) => {
    if (!registration.proofOfPaymentPath) {
      alert("No payment proof file is attached to this application.");
      return;
    }
    setProofBusyId(registration.id);
    try {
      const { data, error } = await supabase.storage.from("academy-proof-of-payment").createSignedUrl(registration.proofOfPaymentPath, 300);
      if (error || !data?.signedUrl) throw new Error(error?.message || "Could not create a secure proof link.");
      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Could not open the payment proof.");
    } finally {
      setProofBusyId(null);
    }
  };

  return (
    <PortalShell role="staff">
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div><h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Pending Student Verifications</h1><p className="text-muted-foreground text-sm mt-1">Review registrations, inspect payment proof, and approve verified applications.</p></div>
          <Badge variant="outline" className="text-sm px-3 py-1 bg-amber-500/10 text-amber-600 border-amber-500/20 w-fit">{registrations.length} Pending Approval{registrations.length === 1 ? "" : "s"}</Badge>
        </div>

        {registrations.length === 0 ? (
          <Card className="text-center py-12 border-dashed"><CardContent className="space-y-3"><div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground"><UserCheck className="h-6 w-6" /></div><h3 className="font-semibold text-lg">No pending verifications</h3><p className="text-sm text-muted-foreground max-w-md mx-auto">New applications will appear here after they are submitted.</p><Link to="/staff/students"><Button variant="outline" size="sm">View Enrolled Students</Button></Link></CardContent></Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrations.map((reg) => (
              <Card key={reg.id} className="shadow-sm border">
                <CardHeader className="pb-3"><div className="flex items-start justify-between gap-3"><div><CardTitle className="text-lg font-bold">{reg.fullName}</CardTitle><CardDescription className="flex items-center gap-1.5 mt-1"><Mail className="h-3.5 w-3.5" />{reg.email}</CardDescription></div><Badge className="bg-amber-500/15 text-amber-700 border-amber-500/30">Pending</Badge></div></CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-2 bg-muted/40 p-3 rounded-lg text-xs"><div><span className="text-muted-foreground">Grade:</span> <strong>{reg.grade}</strong></div><div><span className="text-muted-foreground">School:</span> <strong>{reg.school || "N/A"}</strong></div><div><span className="text-muted-foreground">Phone:</span> <strong>{reg.phone}</strong></div><div><span className="text-muted-foreground">Plan:</span> <strong>{reg.plan} ({reg.amount}/mo)</strong></div></div>
                  <div><span className="text-xs font-semibold text-muted-foreground block mb-1.5">Selected Subjects:</span><div className="flex flex-wrap gap-1.5">{reg.subjects.map((sub) => <Badge key={sub} variant="secondary" className="text-xs font-normal"><BookOpen className="h-3 w-3 mr-1" />{sub}</Badge>)}</div></div>
                  {reg.proofOfPaymentName && <div className="flex items-center gap-2 p-2.5 rounded-md border bg-background text-xs"><FileText className="h-4 w-4 text-primary shrink-0" /><span className="truncate font-medium flex-1">{reg.proofOfPaymentName}</span><Button type="button" variant="outline" size="sm" className="h-7 gap-1.5 shrink-0" onClick={() => handleViewProof(reg)} disabled={proofBusyId !== null}>{proofBusyId === reg.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ExternalLink className="h-3.5 w-3.5" />}View</Button></div>}
                  <div className="flex items-center gap-2 pt-2 border-t"><Button type="button" onClick={() => handleApprove(reg.id)} disabled={busyId !== null} className="flex-1 gap-1.5 bg-green-600 hover:bg-green-700 text-white" size="sm">{busyId === reg.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}Approve & Activate</Button><Button type="button" variant="destructive" onClick={() => handleReject(reg.id)} disabled={busyId !== null} size="sm" className="gap-1.5"><XCircle className="h-4 w-4" />Reject</Button></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
          <DialogContent className="sm:max-w-md"><DialogHeader><div className="mx-auto w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2"><CheckCircle2 className="h-7 w-7" /></div><DialogTitle className="text-center text-xl">Student Approved Successfully!</DialogTitle><DialogDescription className="text-center">The Auth account and student portal record were created securely. The temporary credentials are sent by email when Resend is configured.</DialogDescription></DialogHeader>
            {approvedStudent && <div className="bg-muted/50 p-4 rounded-xl space-y-2.5 text-sm my-2 border"><div className="flex justify-between py-1 border-b"><span className="text-muted-foreground">Student Name:</span><span className="font-semibold">{approvedStudent.student.fullName}</span></div><div className="flex justify-between py-1 border-b"><span className="text-muted-foreground">Student Number:</span><Badge className="font-mono">{approvedStudent.studentNumber}</Badge></div><div className="flex justify-between py-1"><span className="text-muted-foreground">Email:</span><span>{approvedStudent.student.email}</span></div></div>}
            <DialogFooter><Link to="/staff/students" className="w-full"><Button className="w-full">View Student Roster</Button></Link></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PortalShell>
  );
}
