import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/student/payment")({
  component: PaymentPage,
});

function PaymentPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <PageCard title="Payment history" description="Every invoice and proof of payment you have submitted.">
          <EmptyState
            icon={CreditCard}
            title="No payments recorded"
            description="Your payment history will show up here once your first invoice is generated."
          />
        </PageCard>
      </div>
      <div>
        <PageCard
          title="Submit proof of payment"
          description="Upload a screenshot or PDF of your EFT / deposit."
          action={<Badge className="bg-brand-amber-soft text-brand-navy hover:bg-brand-amber-soft">Pending</Badge>}
        >
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="rounded-xl border border-dashed border-border bg-brand-cream/40 p-6 text-center">
              <Upload className="mx-auto h-6 w-6 text-brand-navy" />
              <p className="mt-2 text-xs text-muted-foreground">PNG, JPG or PDF up to 10 MB</p>
              <input type="file" className="mt-3 w-full text-xs" />
            </div>
            <Button className="w-full bg-brand-navy text-white hover:bg-brand-navy-deep">
              Submit for review
            </Button>
          </form>
        </PageCard>
      </div>
    </div>
  );
}
