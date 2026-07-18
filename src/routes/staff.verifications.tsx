import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserCheck, Check, X, FileText, Mail, Phone, GraduationCap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/staff/verifications")({
  component: VerificationsPage,
});

type Pending = {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  plan: string;
  submittedAt: string;
  proofUrl: string;
};

// Placeholder pending queue — replace with Supabase query
const pending: Pending[] = [];

function VerificationsPage() {
  const [selected, setSelected] = useState<Pending | null>(null);

  return (
    <div className="space-y-6">
      <PageCard
        title="Pending Student Verifications"
        description="Review new student registrations and confirm their proof of payment before approval."
      >
        {pending.length === 0 ? (
          <EmptyState
            icon={UserCheck}
            title="No pending verifications"
            description="New student registrations awaiting approval will appear here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="py-3 pr-4">Student</th>
                  <th className="py-3 pr-4">Plan</th>
                  <th className="py-3 pr-4">Submitted</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pending.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 pr-4 font-medium text-brand-navy">{p.name}</td>
                    <td className="py-3 pr-4">{p.plan}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{p.submittedAt}</td>
                    <td className="py-3 pr-4">
                      <Badge className="bg-brand-amber-soft text-brand-navy hover:bg-brand-amber-soft">
                        Pending
                      </Badge>
                    </td>
                    <td className="py-3 pr-4">
                      <Button size="sm" variant="outline" onClick={() => setSelected(p)}>
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageCard>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-brand-navy">
              Review Registration
            </DialogTitle>
            <DialogDescription>
              Verify the student's details and proof of payment before approving access.
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <Row icon={UserCheck} label="Full name" value={selected.name} />
                <Row icon={Mail} label="Email" value={selected.email} />
                <Row icon={Phone} label="Phone" value={selected.phone} />
                <Row icon={GraduationCap} label="Grade" value={selected.grade} />
                <Row icon={FileText} label="Selected plan" value={selected.plan} />
              </div>
              <div className="rounded-2xl border border-border bg-brand-cream/40 p-4">
                <div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                  Proof of Payment
                </div>
                <div className="grid h-56 place-items-center rounded-xl border border-dashed border-border bg-white text-center text-xs text-muted-foreground">
                  <div>
                    <FileText className="mx-auto mb-2 h-6 w-6 text-brand-navy" />
                    Preview of uploaded document
                    <div className="mt-1 text-brand-navy underline">{selected.proofUrl}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelected(null)}>
              <X className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button
              className="bg-brand-navy text-white hover:bg-brand-navy-deep"
              onClick={() => setSelected(null)}
            >
              <Check className="mr-2 h-4 w-4" /> Approve student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserCheck;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-3">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-amber-soft text-brand-navy">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-[11px] uppercase text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-brand-navy">{value}</div>
      </div>
    </div>
  );
}
