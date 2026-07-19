import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";
import { useState } from "react";
import { supabase } from "@/integrations/client";

export const Route = createFileRoute("/student/payment")({
  component: PaymentPage,
});

function PaymentPage() {
  // 1. Add state to hold the file and track the upload status
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Create the submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setIsSubmitting(true);

    try {
      // Get the currently logged-in student
      // Get the currently logged-in student
      // Get the currently logged-in student using a TypeScript bypass for the web editor
        const { data: { user }, error: authError } = await (supabase.auth as any).getUser();
        if (authError || !user) throw new Error("Could not verify user session");

      // Format a unique filename to prevent overwriting
      const fileExt = file.name.split(".").pop() ?? "bin";
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      
      // Upload the file to your Storage bucket
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("proof-of-payment") 
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Log the payment in your database (ensure 'payments' matches your actual table name!)
      const { error: dbError } = await supabase.from("payments" as any).insert({
        student_id: user.id,
        file_path: uploadData.path,
        status: "pending",
      });

      if (dbError) throw dbError;

      alert("Proof of payment submitted successfully!");
      setFile(null);
      e.currentTarget.reset(); // Visually clear the file input
      
    } catch (error) {
      console.error("Payment upload error:", error);
      alert("Failed to upload proof of payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {/* 3. Attach our handler to the form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="rounded-xl border border-dashed border-border bg-brand-cream/40 p-6 text-center">
              <Upload className="mx-auto h-6 w-6 text-brand-navy" />
              <p className="mt-2 text-xs text-muted-foreground">PNG, JPG or PDF up to 10 MB</p>
              
              {/* 4. Wire the input to update our state */}
              <input 
                type="file" 
                accept=".pdf,image/png,image/jpeg"
                className="mt-3 w-full text-xs" 
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                required
              />
            </div>
            
            {/* 5. Update the button to show loading state and disable when appropriate */}
            <Button 
              type="submit" 
              disabled={!file || isSubmitting}
              className="w-full bg-brand-navy text-white hover:bg-brand-navy-deep disabled:opacity-50"
            >
              {isSubmitting ? "Uploading..." : "Submit for review"}
            </Button>
          </form>
        </PageCard>
      </div>
    </div>
  );
}