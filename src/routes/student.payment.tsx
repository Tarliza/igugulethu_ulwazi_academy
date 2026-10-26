import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCurrentStudentBilling, StudentBillingRecord } from "@/lib/student-storage";

export const Route = createFileRoute("/student/payment")({
  component: StudentPaymentPage,
});

function displayStatus(value: string | null | undefined): string {
  if (!value) return "Not verified";
  const normalized = value.trim().toLowerCase();
  if (["verified", "paid", "approved", "complete", "completed"].includes(normalized)) return "Verified";
  if (["pending", "submitted", "under_review", "under review"].includes(normalized)) return "Pending review";
  if (["rejected", "declined", "failed"].includes(normalized)) return "Rejected";
  if (["overdue", "payment overdue"].includes(normalized)) return "Payment overdue";
  return value;
}

function statusTone(value: string | null | undefined): string {
  const normalized = value?.trim().toLowerCase();
  if (["verified", "paid", "approved", "complete", "completed", "active"].includes(normalized ?? "")) {
    return "bg-green-500/15 text-green-700 border-green-500/30";
  }
  if (["pending", "submitted", "under_review", "under review"].includes(normalized ?? "")) {
    return "bg-amber-500/15 text-amber-700 border-amber-500/30";
  }
  if (["rejected", "declined", "failed", "overdue", "payment overdue", "access denied"].includes(normalized ?? "")) {
    return "bg-red-500/15 text-red-700 border-red-500/30";
  }
  return "bg-muted text-muted-foreground border-border";
}

export function StudentPaymentPage() {
  const [billing, setBilling] = useState<StudentBillingRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    getCurrentStudentBilling()
      .then((record) => {
        if (!cancelled) setBilling(record);
      })
      .catch((error: unknown) => {
        console.error("[Student Billing] Could not load verified billing details", error);
        if (!cancelled) setLoadError("We could not verify your billing information right now. Please refresh or contact the academy.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const paymentStatus = billing?.paymentStatus ?? billing?.studentPaymentStatus ?? null;
  const subscriptionStatus = billing?.subscriptionStatus ?? null;

  return (
    <PortalShell role="student" title="Subscription & Fee Payments">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-xl font-bold">Subscription & Billing Status</h2>
          <p className="text-sm text-muted-foreground">View your recorded plan and the latest payment verification status.</p>
        </div>

        {loading ? (
          <Card><CardContent className="p-6 text-sm text-muted-foreground">Loading billing information from the academy database…</CardContent></Card>
        ) : loadError ? (
          <Card><CardContent className="p-6 text-sm text-destructive">{loadError}</CardContent></Card>
        ) : !billing ? (
          <Card><CardContent className="p-6 text-sm text-muted-foreground">No student billing profile was found for this signed-in account. No subscription or payment status can be confirmed.</CardContent></Card>
        ) : (
          <Card className="border shadow-sm">
            <CardHeader>
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="space-y-2">
                  <Badge className={statusTone(subscriptionStatus)}>
                    Subscription: {displayStatus(subscriptionStatus)}
                  </Badge>
                  <Badge className={statusTone(paymentStatus)}>
                    Payment: {displayStatus(paymentStatus)}
                  </Badge>
                </div>
                <div className="text-2xl font-extrabold text-primary">
                  {billing.amount ? billing.amount : "Amount not recorded"}
                  {billing.amount && <span className="text-xs text-muted-foreground font-normal"> (recorded amount)</span>}
                </div>
              </div>
              <CardTitle className="text-lg font-bold mt-2">
                {billing.plan ? `${billing.plan} Plan` : "Plan not recorded"}
              </CardTitle>
              <CardDescription>Payment verification is based on the latest payment record available to your account. An absent or unreadable record is not treated as paid.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs border-t pt-4">
              <div className="bg-muted/40 p-4 rounded-xl space-y-3">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Student Name:</span>
                  <span className="font-semibold text-foreground text-right">{billing.fullName || "Not recorded"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Student ID:</span>
                  <span className="font-mono font-bold text-foreground text-right">{billing.studentNumber || "Not recorded"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Payment Reference:</span>
                  <span className="font-semibold text-foreground text-right">{billing.paymentReference || "No reference recorded"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Last Submitted:</span>
                  <span className="font-semibold text-foreground text-right">
                    {billing.paymentSubmittedAt ? new Date(billing.paymentSubmittedAt).toLocaleDateString("en-ZA") : "No payment record"}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Reviewed:</span>
                  <span className="font-semibold text-foreground text-right">
                    {billing.paymentReviewedAt ? new Date(billing.paymentReviewedAt).toLocaleDateString("en-ZA") : "Not recorded"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PortalShell>
  );
}
