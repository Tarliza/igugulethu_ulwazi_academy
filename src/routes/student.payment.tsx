import React, { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentStudentBilling, StudentBillingRecord } from "@/lib/student-storage";
import { supabase } from "@/integrations/client";

export const Route = createFileRoute("/student/payment")({
  component: StudentPaymentPage,
});

const PLAN_PRICES: Record<string, string> = {
  "1 Subject": "R300",
  "2 Subjects": "R550",
  "3 Subjects": "R750",
};
const APPROVED_PAYMENT_STATUSES = ["verified", "paid", "approved", "complete", "completed"];

function displayPaymentStatus(value: string | null | undefined): string {
  if (!value) return "Unverified";
  const normalized = value.trim().toLowerCase();
  if (APPROVED_PAYMENT_STATUSES.includes(normalized)) return "Verified";
  if (["pending", "submitted", "under_review", "under review"].includes(normalized)) return "Pending review";
  if (["rejected", "declined", "failed"].includes(normalized)) return "Rejected";
  if (["overdue", "payment overdue"].includes(normalized)) return "Payment overdue";
  return "Unverified";
}

function displaySubscriptionStatus(value: string | null | undefined, hasVerifiedPayment: boolean): string {
  if (!hasVerifiedPayment) return "Inactive";
  const normalized = value?.trim().toLowerCase();
  if (normalized === "active") return "Active";
  if (normalized === "payment overdue" || normalized === "overdue") return "Payment overdue";
  return "Inactive";
}

function statusTone(value: string | null | undefined): string {
  const normalized = value?.trim().toLowerCase();
  if (["verified", "paid", "approved", "complete", "completed", "active"].includes(normalized ?? "")) {
    return "bg-green-500/15 text-green-700 border-green-500/30";
  }
  if (["pending", "submitted", "under_review", "under review", "pending review"].includes(normalized ?? "")) {
    return "bg-amber-500/15 text-amber-700 border-amber-500/30";
  }
  if (["rejected", "declined", "failed", "overdue", "payment overdue", "access denied", "inactive", "unverified"].includes(normalized ?? "")) {
    return "bg-red-500/15 text-red-700 border-red-500/30";
  }
  return "bg-muted text-muted-foreground border-border";
}

async function validateProofFile(file: File) {
  if (file.size <= 0 || file.size > 10 * 1024 * 1024) {
    throw new Error("Choose a proof-of-payment file smaller than 10 MB.");
  }
  const allowed = new Set(["application/pdf", "image/png", "image/jpeg"]);
  if (!allowed.has(file.type)) throw new Error("Only PDF, PNG, or JPG proof files are accepted.");
  const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  const validPdf = file.type === "application/pdf" && new TextDecoder().decode(bytes.slice(0, 4)) === "%PDF";
  const validPng = file.type === "image/png" && bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((b, i) => bytes[i] === b);
  const validJpeg = file.type === "image/jpeg" && bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (!validPdf && !validPng && !validJpeg) throw new Error("The file contents do not match the selected file type.");
}

export function StudentPaymentPage() {
  const [billing, setBilling] = useState<StudentBillingRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [paymentReference, setPaymentReference] = useState("");
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [requestedPlan, setRequestedPlan] = useState("");
  const [planReason, setPlanReason] = useState("");
  const [submittingPlan, setSubmittingPlan] = useState(false);
  const [planMessage, setPlanMessage] = useState<string | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  const [planRequests, setPlanRequests] = useState<Array<{ id: string; current_plan: string; requested_plan: string; status: string; created_at: string }>>([]);

  const reloadBilling = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const record = await getCurrentStudentBilling();
      setBilling(record);
      if (record?.plan) setRequestedPlan(record.plan);
      if (record) {
        const { data, error } = await supabase
          .from("plan_change_requests")
          .select("id, current_plan, requested_plan, status, created_at")
          .eq("student_id", record.studentId)
          .order("created_at", { ascending: false })
          .limit(5);
        if (error) {
          // The billing page remains usable if the optional plan-request migration has not been applied yet.
          console.warn("[Student Billing] Plan-change requests are not available yet:", error.message);
        } else {
          setPlanRequests(data ?? []);
        }
      }
    } catch (error: unknown) {
      console.error("[Student Billing] Could not load verified billing details", error);
      setBilling(null);
      setLoadError("We could not verify your billing information right now. Please refresh or contact the academy.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void reloadBilling(); }, [reloadBilling]);

  const paymentIsVerified = Boolean(
    billing?.paymentSubmittedAt &&
    APPROVED_PAYMENT_STATUSES.includes(billing.paymentStatus?.trim().toLowerCase() ?? ""),
  );
  const paymentStatus = billing?.paymentSubmittedAt ? displayPaymentStatus(billing.paymentStatus) : "Unverified";
  const subscriptionStatus = displaySubscriptionStatus(billing?.subscriptionStatus, paymentIsVerified);

  const submitPayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setPaymentError(null);
    setPaymentMessage(null);
    if (!billing) { setPaymentError("Your billing profile could not be found."); return; }
    if (!proofFile) { setPaymentError("Choose your proof-of-payment file first."); return; }
    if (!paymentReference.trim()) { setPaymentError("Enter the payment reference used for your transfer."); return; }

    setSubmittingPayment(true);
    let uploadedPath: string | null = null;
    try {
      await validateProofFile(proofFile);
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) throw new Error("Your login could not be verified. Sign in again and retry.");

      const safeName = proofFile.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100) || "proof";
      uploadedPath = `${authData.user.id}/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from("academy-proof-of-payment")
        .upload(uploadedPath, proofFile, { contentType: proofFile.type, cacheControl: "3600", upsert: false });
      if (uploadError) throw new Error(uploadError.message || "Could not securely upload your proof of payment.");

      const amount = billing.amount?.trim() || PLAN_PRICES[billing.plan ?? ""] || null;
      const { error: insertError } = await supabase.from("payments").insert({
        student_id: authData.user.id,
        file_path: uploadedPath,
        status: "pending",
        amount,
        payment_reference: paymentReference.trim().slice(0, 160),
      });
      if (insertError) throw new Error(insertError.message || "Could not record your payment submission.");

      setProofFile(null);
      setPaymentReference("");
      setPaymentMessage("Your proof of payment has been submitted. It remains pending until staff review it; this does not mark your account as paid.");
      await reloadBilling();
    } catch (error: unknown) {
      if (uploadedPath) {
        await supabase.storage.from("academy-proof-of-payment").remove([uploadedPath]).catch(() => undefined);
      }
      setPaymentError(error instanceof Error ? error.message : "Could not submit your payment. Please try again.");
    } finally {
      setSubmittingPayment(false);
    }
  };

  const submitPlanChange = async (event: React.FormEvent) => {
    event.preventDefault();
    setPlanError(null);
    setPlanMessage(null);
    if (!billing) { setPlanError("Your billing profile could not be found."); return; }
    if (!requestedPlan || requestedPlan === billing.plan) {
      setPlanError("Choose a different subscription plan to request a change.");
      return;
    }
    setSubmittingPlan(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) throw new Error("Your login could not be verified. Sign in again and retry.");
      const { error } = await supabase.from("plan_change_requests").insert({
        student_id: billing.studentId,
        user_id: authData.user.id,
        current_plan: billing.plan,
        requested_plan: requestedPlan,
        reason: planReason.trim().slice(0, 500) || null,
        status: "pending",
      });
      if (error) {
        if (error.code === "42P01" || error.code === "PGRST205") {
          throw new Error("Plan-change requests are not enabled in the database yet. The academy must apply the Phase 3 plan-change migration first.");
        }
        throw new Error(error.message || "Could not submit your plan-change request.");
      }
      setPlanMessage("Your plan-change request has been recorded for staff review. Your current plan will not change until staff approves it.");
      setPlanReason("");
      await reloadBilling();
    } catch (error: unknown) {
      setPlanError(error instanceof Error ? error.message : "Could not submit your plan-change request.");
    } finally {
      setSubmittingPlan(false);
    }
  };

  return (
    <PortalShell role="student" title="Subscription & Fee Payments">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-xl font-bold">Subscription & Billing Status</h2>
          <p className="text-sm text-muted-foreground">Review your recorded plan, submit proof of payment, and request plan changes.</p>
        </div>

        {loading ? (
          <Card><CardContent className="p-6 text-sm text-muted-foreground">Loading billing information from the academy database…</CardContent></Card>
        ) : loadError ? (
          <Card><CardContent className="p-6 text-sm text-destructive">{loadError} Subscription: Inactive. Payment: Unverified.</CardContent></Card>
        ) : !billing ? (
          <Card><CardContent className="p-6 text-sm text-muted-foreground">No student billing profile was found for this signed-in account. Subscription: Inactive. Payment: Unverified. No subscription or payment status can be confirmed.</CardContent></Card>
        ) : (
          <>
            <Card className="border shadow-sm">
              <CardHeader>
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div className="space-y-2">
                    <Badge className={statusTone(subscriptionStatus)}>Subscription: {subscriptionStatus}</Badge>
                    <Badge className={statusTone(paymentStatus)}>Payment: {paymentStatus}</Badge>
                  </div>
                  <div className="text-2xl font-extrabold text-primary">
                    {billing.amount != null && billing.amount.trim() !== "" ? billing.amount : "Amount not recorded"}
                    {billing.amount != null && billing.amount.trim() !== "" && <span className="text-xs text-muted-foreground font-normal"> (recorded amount)</span>}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold mt-2">{billing.plan ? `${billing.plan} Plan` : "Plan not recorded"}</CardTitle>
                <CardDescription>Payments remain pending until staff verifies them. Missing or unreadable records are never treated as paid.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm border-t pt-4">
                <div className="flex justify-between gap-4"><span className="text-muted-foreground">Student Name:</span><span className="font-semibold text-right">{billing.fullName || "Not recorded"}</span></div>
                <div className="flex justify-between gap-4"><span className="text-muted-foreground">Student ID:</span><span className="font-mono font-bold text-right">{billing.studentNumber || "Not recorded"}</span></div>
                <div className="flex justify-between gap-4"><span className="text-muted-foreground">Payment Reference:</span><span className="font-semibold text-right">{billing.paymentReference || "No reference recorded"}</span></div>
                <div className="flex justify-between gap-4"><span className="text-muted-foreground">Last Submitted:</span><span className="font-semibold text-right">{billing.paymentSubmittedAt ? new Date(billing.paymentSubmittedAt).toLocaleDateString("en-ZA") : "No payment record"}</span></div>
                <div className="flex justify-between gap-4"><span className="text-muted-foreground">Reviewed:</span><span className="font-semibold text-right">{billing.paymentReviewedAt ? new Date(billing.paymentReviewedAt).toLocaleDateString("en-ZA") : "Not recorded"}</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submit a Payment</CardTitle>
                <CardDescription>Pay using the academy's approved payment method, then upload your proof. Submissions are marked Pending and must be verified by staff.</CardDescription>
              </CardHeader>
              <CardContent>
                {paymentMessage && <p role="status" className="mb-4 rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm">{paymentMessage}</p>}
                {paymentError && <p role="alert" className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{paymentError}</p>}
                <form onSubmit={submitPayment} className="space-y-4">
                  <div className="space-y-1.5"><Label htmlFor="payment-reference">Payment reference *</Label><Input id="payment-reference" value={paymentReference} onChange={(event) => setPaymentReference(event.target.value)} maxLength={160} required placeholder="Reference used for your bank transfer" /></div>
                  <div className="space-y-1.5"><Label htmlFor="payment-proof">Proof of payment (PDF, PNG, JPG; max 10 MB) *</Label><Input id="payment-proof" type="file" accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" onChange={(event) => setProofFile(event.target.files?.[0] ?? null)} required /></div>
                  <Button type="submit" disabled={submittingPayment}>{submittingPayment ? "Submitting…" : "Submit proof of payment"}</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upgrade or Downgrade Your Plan</CardTitle>
                <CardDescription>Choose the plan you want. This sends a request to the academy; it does not change your plan or fee until staff approves it.</CardDescription>
              </CardHeader>
              <CardContent>
                {planMessage && <p role="status" className="mb-4 rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm">{planMessage}</p>}
                {planError && <p role="alert" className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{planError}</p>}
                <form onSubmit={submitPlanChange} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="requested-plan">Requested plan *</Label>
                    <select id="requested-plan" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={requestedPlan} onChange={(event) => setRequestedPlan(event.target.value)} required>
                      <option value="" disabled>Choose a plan</option>
                      {Object.entries(PLAN_PRICES).map(([plan, price]) => <option key={plan} value={plan}>{plan} — {price}/month{plan === billing.plan ? " (current)" : ""}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5"><Label htmlFor="plan-reason">Reason (optional)</Label><Input id="plan-reason" value={planReason} onChange={(event) => setPlanReason(event.target.value)} maxLength={500} placeholder="Optional note for the academy" /></div>
                  <Button type="submit" variant="outline" disabled={submittingPlan}>{submittingPlan ? "Submitting request…" : "Request plan change"}</Button>
                </form>
                {planRequests.length > 0 && <div className="mt-5 space-y-2"><h3 className="font-semibold text-sm">Recent plan-change requests</h3>{planRequests.map((request) => <div key={request.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-3 text-sm"><span>{request.current_plan} → {request.requested_plan}</span><Badge className={statusTone(request.status)}>{request.status}</Badge><span className="text-xs text-muted-foreground">{new Date(request.created_at).toLocaleDateString("en-ZA")}</span></div>)}</div>}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </PortalShell>
  );
}
