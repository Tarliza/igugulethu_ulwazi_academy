import React, { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getPendingRegistrations, approveRegistration, rejectRegistration, Registration, Student, ACADEMY_SUBJECTS } from "@/lib/student-storage";
import { supabase } from "@/integrations/client";
import { CheckCircle2, XCircle, FileText, UserCheck, Mail, BookOpen, Loader2, ExternalLink, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/staff/verifications")({ component: StaffVerificationsPage });

export function StaffVerificationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [approvedStudent, setApprovedStudent] = useState<{ student: Student; studentNumber: string; password?: string } | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [proofBusyId, setProofBusyId] = useState<string | null>(null);
  const [planRequests, setPlanRequests] = useState<any[]>([]);
  const [planLoading, setPlanLoading] = useState(true);
  const [planError, setPlanError] = useState<string | null>(null);
  const [planBusyId, setPlanBusyId] = useState<string | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<Record<string, string[]>>({});
  const [planNotice, setPlanNotice] = useState<string | null>(null);
  const planPrices: Record<string, string> = { "1 Subject": "R300", "2 Subjects": "R550", "3 Subjects": "R750" };

  const loadPlanRequests = async () => {
    setPlanLoading(true);
    setPlanError(null);
    try {
      const { data, error } = await supabase
        .from("plan_change_requests")
        .select("id, student_id, user_id, current_plan, requested_plan, status, reason, created_at")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw new Error(error.message);
      const rows = data ?? [];
      const studentIds = [...new Set(rows.map((row: any) => row.student_id))];
      let studentsById: Record<string, any> = {};
      if (studentIds.length) {
        const { data: students, error: studentsError } = await supabase
          .from("students")
          .select("id, full_name, student_number, plan, amount, subjects")
          .in("id", studentIds);
        if (studentsError) throw new Error(studentsError.message);
        studentsById = Object.fromEntries((students ?? []).map((student: any) => [student.id, student]));
      }
      setPlanRequests(rows.map((row: any) => ({ ...row, student: studentsById[row.student_id] ?? null })));
      setSelectedSubjects((current) => {
        const next = { ...current };
        for (const row of rows) {
          if (!next[row.id]) next[row.id] = (studentsById[row.student_id]?.subjects ?? []).filter((subject: string) => ACADEMY_SUBJECTS.includes(subject as any));
        }
        return next;
      });
    } catch (error) {
      console.error("[Staff Verifications] Could not load plan-change requests", error);
      setPlanError(error instanceof Error ? error.message : "Could not load plan-change requests.");
    } finally {
      setPlanLoading(false);
    }
  };

  const reviewPlanRequest = async (request: any, decision: "approved" | "rejected") => {
    setPlanNotice(null);
    setPlanError(null);
    setPlanBusyId(request.id);
    try {
      const { data: auth, error: authError } = await supabase.auth.getUser();
      if (authError || !auth.user) throw new Error("Your staff session could not be verified. Sign in again and retry.");
      if (decision === "approved") {
        if (!request.student) throw new Error("The linked student record could not be found; this request cannot be approved.");
        const requiredCount = request.requested_plan === "1 Subject" ? 1 : request.requested_plan === "2 Subjects" ? 2 : 3;
        const subjects = selectedSubjects[request.id] ?? [];
        if (subjects.length !== requiredCount) throw new Error(`Select exactly ${requiredCount} subject(s) before approving this plan change.`);
        const previous = { plan: request.student.plan, amount: request.student.amount, subjects: request.student.subjects };
        const { error: studentUpdateError } = await supabase.from("students").update({
          plan: request.requested_plan,
          amount: planPrices[request.requested_plan],
          subjects,
        }).eq("id", request.student_id);
        if (studentUpdateError) throw new Error(studentUpdateError.message || "Could not update the student's plan.");
        const { error: requestUpdateError } = await supabase.from("plan_change_requests").update({
          status: "approved",
          reviewed_by: auth.user.id,
          reviewed_at: new Date().toISOString(),
        }).eq("id", request.id).eq("status", "pending");
        if (requestUpdateError) {
          await supabase.from("students").update(previous).eq("id", request.student_id);
          throw new Error(requestUpdateError.message || "Could not mark the request approved. The student plan update was rolled back where possible.");
        }
        setPlanNotice(`Approved plan change for ${request.student.full_name || request.student.student_number}. The plan and subject list were updated.`);
      } else {
        const { error } = await supabase.from("plan_change_requests").update({
          status: "rejected",
          reviewed_by: auth.user.id,
          reviewed_at: new Date().toISOString(),
        }).eq("id", request.id).eq("status", "pending");
        if (error) throw new Error(error.message || "Could not reject this plan-change request.");
        setPlanNotice("Plan-change request rejected.");
      }
      await loadPlanRequests();
    } catch (error) {
      setPlanError(error instanceof Error ? error.message : "Could not review the plan-change request.");
    } finally {
      setPlanBusyId(null);
    }
  };

  const loadData = () => setRegistrations([...getPendingRegistrations()]);
  useEffect(() => {
    loadData();
    void loadPlanRequests();
    const refresh = () => { loadData(); void loadPlanRequests(); };
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


        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Plan-change Requests</CardTitle>
                <CardDescription>Review upgrade or downgrade requests. Approving updates the student plan, monthly amount, and subject list.</CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => void loadPlanRequests()} disabled={planLoading} className="gap-2">
                <RefreshCw className={`h-4 w-4 ${planLoading ? "animate-spin" : ""}`} /> Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {planNotice && <p role="status" className="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm">{planNotice}</p>}
            {planError && <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{planError}</p>}
            {planLoading ? (
              <p className="text-sm text-muted-foreground">Loading plan-change requests…</p>
            ) : planRequests.filter((request) => request.status === "pending").length === 0 ? (
              <p className="rounded-md border border-dashed p-5 text-center text-sm text-muted-foreground">No pending plan-change requests.</p>
            ) : (
              <div className="space-y-4">
                {planRequests.filter((request) => request.status === "pending").map((request) => {
                  const requiredCount = request.requested_plan === "1 Subject" ? 1 : request.requested_plan === "2 Subjects" ? 2 : 3;
                  const chosen = selectedSubjects[request.id] ?? [];
                  return (
                    <div key={request.id} className="rounded-lg border p-4 space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{request.student?.full_name || "Student record unavailable"}</p>
                          <p className="text-xs text-muted-foreground">{request.student?.student_number || request.user_id} · {new Date(request.created_at).toLocaleString("en-ZA")}</p>
                        </div>
                        <Badge className="bg-amber-500/15 text-amber-700 border-amber-500/30">Pending review</Badge>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2 text-sm">
                        <p><span className="text-muted-foreground">Current plan:</span> {request.current_plan}</p>
                        <p><span className="text-muted-foreground">Requested:</span> <strong>{request.requested_plan}</strong> ({planPrices[request.requested_plan]}/month)</p>
                      </div>
                      {request.reason && <p className="rounded-md bg-muted/50 p-3 text-sm"><span className="font-medium">Student's note:</span> {request.reason}</p>}
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Confirm {requiredCount} subject{requiredCount === 1 ? "" : "s"} for the new plan</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ACADEMY_SUBJECTS.map((subject) => (
                            <label key={subject} className="flex items-center gap-2 rounded-md border p-2 text-sm">
                              <input
                                type="checkbox"
                                checked={chosen.includes(subject)}
                                onChange={(event) => setSelectedSubjects((current) => ({
                                  ...current,
                                  [request.id]: event.target.checked
                                    ? [...chosen, subject]
                                    : chosen.filter((value) => value !== subject),
                                }))}
                                disabled={planBusyId === request.id}
                              />
                              {subject}
                            </label>
                          ))}
                        </div>
                        <p className={`text-xs ${chosen.length === requiredCount ? "text-green-700" : "text-muted-foreground"}`}>{chosen.length} of {requiredCount} selected</p>
                      </div>
                      <div className="flex flex-wrap gap-2 border-t pt-3">
                        <Button type="button" size="sm" className="gap-1.5 bg-green-600 text-white hover:bg-green-700" disabled={planBusyId !== null || !request.student || chosen.length !== requiredCount} onClick={() => void reviewPlanRequest(request, "approved")}>
                          {planBusyId === request.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Approve & Update Plan
                        </Button>
                        <Button type="button" size="sm" variant="destructive" className="gap-1.5" disabled={planBusyId !== null} onClick={() => void reviewPlanRequest(request, "rejected")}>
                          {planBusyId === request.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />} Reject Request
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {!planLoading && planRequests.some((request) => request.status !== "pending") && (
              <details className="rounded-md border p-3">
                <summary className="cursor-pointer text-sm font-medium">Previously reviewed requests</summary>
                <div className="mt-3 space-y-2">
                  {planRequests.filter((request) => request.status !== "pending").map((request) => (
                    <div key={request.id} className="flex flex-wrap items-center justify-between gap-2 border-b py-2 text-sm last:border-0">
                      <span>{request.student?.full_name || request.student?.student_number || "Student"}: {request.current_plan} → {request.requested_plan}</span>
                      <Badge variant="outline">{request.status}</Badge>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </CardContent>
        </Card>

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
