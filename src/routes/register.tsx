import React, { useState } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { submitRegistration, ACADEMY_SUBJECTS } from "@/lib/registration";
import { GraduationCap, Upload, CheckCircle2, Building2, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  validateSearch: (search: Record<string, unknown>) => ({
    plan: (search.plan as string) || "2-subjects",
  }),
});

export function RegisterPage() {
  const search = useSearch({ from: "/register" });
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("Grade 11");
  const [school, setSchool] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const planId = search.plan || "2-subjects";
  const planName = planId === "1-subject" ? "1 Subject" : planId === "3-subjects" ? "3 Subjects" : "2 Subjects";
  const planAmount = planId === "1-subject" ? "R300" : planId === "3-subjects" ? "R750" : "R550";
  const requiredCount = planId === "1-subject" ? 1 : planId === "3-subjects" ? 3 : 2;

  const toggleSubject = (subject: string) => {
    setValidationError(null);
    setSubjects((current) => {
      if (current.includes(subject)) return current.filter((item) => item !== subject);
      if (current.length >= requiredCount) {
        setValidationError(`Your selected plan allows exactly ${requiredCount} subject${requiredCount > 1 ? "s" : ""}. Deselect a subject first.`);
        return current;
      }
      return [...current, subject];
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setProofFile(null);
      return;
    }
    const allowedTypes = new Set(["application/pdf", "image/png", "image/jpeg"]);
    if (!allowedTypes.has(file.type)) {
      setFileError("Please upload a PDF, PNG, or JPG file.");
      event.target.value = "";
      setProofFile(null);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError("File size exceeds the 10MB limit.");
      event.target.value = "";
      setProofFile(null);
      return;
    }
    setProofFile(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError(null);

    if (subjects.length !== requiredCount) {
      setValidationError(`Please select exactly ${requiredCount} subject${requiredCount > 1 ? "s" : ""} for your ${planName} plan.`);
      return;
    }
    if (!proofFile) {
      setValidationError("Please upload your proof of payment before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      await submitRegistration({
        firstName,
        lastName,
        email,
        phone,
        grade,
        school,
        plan: planName,
        subjects,
        proofFile,
      });
      setSubmitted(true);
      window.setTimeout(() => navigate({ to: "/student-login" }), 3500);
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : "We could not submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md text-center p-8 space-y-4 shadow-xl border">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 className="h-8 w-8" /></div>
            <h2 className="text-2xl font-bold">Application Received!</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Your proof of payment was securely uploaded. Staff will verify your payment and email your student login credentials after approval. Redirecting you to sign in...</p>
          </Card>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <div className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <Card className="shadow-lg border">
          <CardHeader className="text-center pb-6">
            <Badge className="w-fit mx-auto mb-2 bg-primary/10 text-primary uppercase font-bold text-xs">COMPLETE REGISTRATION</Badge>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Almost there — let&apos;s get you set up.</CardTitle>
            <div className="flex justify-between items-center bg-muted/60 p-4 rounded-xl mt-4 text-left border">
              <div><span className="text-xs text-muted-foreground uppercase font-bold">Selected Plan</span><p className="font-bold text-foreground text-base">{planName}</p><span className="text-xs text-primary font-semibold">Allows exactly {requiredCount} subject{requiredCount > 1 ? "s" : ""}</span></div>
              <div className="text-right"><span className="text-2xl font-extrabold text-primary">{planAmount}</span><span className="text-xs text-muted-foreground block">/month</span><Link to="/subscription" className="text-[11px] text-primary hover:underline font-semibold">Change plan</Link></div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {validationError && <Alert variant="destructive" className="py-2.5"><AlertCircle className="h-4 w-4" /><AlertDescription className="text-xs">{validationError}</AlertDescription></Alert>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>First Name *</Label><Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. Kuhle" required /></div>
                <div className="space-y-1.5"><Label>Last Name *</Label><Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Ngam" required /></div>
                <div className="space-y-1.5"><Label>Email Address *</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@example.com" required /></div>
                <div className="space-y-1.5"><Label>Phone Number *</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 067 148 6015" required /></div>
                <div className="space-y-1.5"><Label>Grade *</Label><Input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="e.g. Grade 11" required /></div>
                <div className="space-y-1.5"><Label>School *</Label><Input value={school} onChange={(e) => setSchool(e.target.value)} placeholder="e.g. Kenilworth High" required /></div>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between items-center"><Label className="text-base font-semibold">Subjects of Interest *</Label><span className="text-xs font-bold text-primary">Selected: {subjects.length} / {requiredCount}</span></div>
                <p className="text-xs text-muted-foreground">Select exactly {requiredCount} subject{requiredCount > 1 ? "s" : ""} included in your {planName} plan.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  {ACADEMY_SUBJECTS.map((subject) => <div key={subject} onClick={() => toggleSubject(subject)} className={`flex items-center space-x-2 border rounded-lg p-2.5 cursor-pointer transition-colors ${subjects.includes(subject) ? "bg-primary/10 border-primary text-primary font-bold" : "hover:bg-muted/40"}`}><Checkbox id={subject} checked={subjects.includes(subject)} /><label htmlFor={subject} className="text-xs cursor-pointer leading-none">{subject}</label></div>)}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t">
                <Label className="text-base font-semibold flex items-center gap-1.5 text-foreground"><Building2 className="h-4 w-4 text-primary" /> How to Make Payment</Label>
                <div className="bg-muted/50 p-4 rounded-xl text-xs space-y-1.5 border leading-relaxed">
                  <p className="font-bold text-primary">Amount to pay: {planAmount} per month</p>
                  <p className="text-muted-foreground">Pay by EFT or instant money transfer. Use your <strong>email address</strong> as the payment reference.</p>
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-foreground font-mono text-[11px] bg-background p-2.5 rounded-lg border"><div><strong>Bank:</strong> Capitec</div><div><strong>Account Holder:</strong> MR Gabriel Moiane</div><div><strong>Account Type:</strong> Main Account</div><div><strong>Account Number:</strong> 1709691504</div><div><strong>Branch Code:</strong> 470010</div></div>
                  <p className="text-[11px] text-muted-foreground pt-1">Once payment is confirmed, upload your proof of payment below. Staff will verify it and activate your student login credentials.</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <Label className="text-base font-semibold">Upload Proof of Subscription / Payment *</Label>
                {fileError && <p className="text-xs text-red-600 font-semibold">{fileError}</p>}
                <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-muted/30 transition-colors relative cursor-pointer">
                  <input type="file" accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" required={!proofFile} />
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">{proofFile ? proofFile.name : "Click to upload proof of payment"}</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, PNG or JPG — max 10 MB</p>
                </div>
              </div>

              <input aria-hidden="true" tabIndex={-1} autoComplete="off" className="hidden" name="website" />
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2">
              <Button type="submit" size="lg" className="w-full font-bold h-12" disabled={submitting}>{submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting securely...</> : "Submit Registration & Proof"}</Button>
              <div className="text-center text-xs text-muted-foreground">Your login credentials are created only after staff approval and will be emailed to you. Already have an account? <Link to="/student-login" className="text-primary font-bold hover:underline">Sign in here</Link></div>
            </CardFooter>
          </form>
        </Card>
      </div>
      <SiteFooter />
    </div>
  );
}

export default RegisterPage;
