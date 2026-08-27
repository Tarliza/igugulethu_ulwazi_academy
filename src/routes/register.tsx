
import React, { useState } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { addRegistration, ACADEMY_SUBJECTS, getStudents } from "@/lib/student-storage";
import { GraduationCap, Upload, CheckCircle2, ArrowRight, Eye, EyeOff, Building2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      plan: (search.plan as string) || "2-subjects",
    };
  },
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
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const planId = search.plan || "2-subjects";
  const planName = planId === "1-subject" ? "1 Subject" : planId === "3-subjects" ? "3 Subjects" : "2 Subjects";
  const planAmount = planId === "1-subject" ? "R300" : planId === "3-subjects" ? "R750" : "R550";
  const requiredCount = planId === "1-subject" ? 1 : planId === "3-subjects" ? 3 : 2;

  const toggleSubject = (sub: string) => {
    setValidationError(null);
    if (subjects.includes(sub)) {
      setSubjects(subjects.filter((s) => s !== sub));
    } else {
      if (subjects.length >= requiredCount) {
        setValidationError(`Your selected plan allows exactly ${requiredCount} subject${requiredCount > 1 ? "s" : ""}. Deselect a subject first.`);
        return;
      }
      setSubjects([...subjects, sub]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxBytes = 10 * 1024 * 1024; // 10MB
      if (file.size > maxBytes) {
        setFileError("File size exceeds 10MB limit. Please upload a smaller PDF or image.");
        e.target.value = "";
        setFileName("");
        return;
      }
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Subject count check
    if (subjects.length !== requiredCount) {
      setValidationError(`Please select exactly ${requiredCount} subject${requiredCount > 1 ? "s" : ""} for your ${planName} plan.`);
      return;
    }

    if (!fileName) {
      setValidationError("Please upload your proof of payment before submitting.");
      return;
    }

    // Check if student already enrolled
    const existing = getStudents();
    const isEnrolled = existing.some((s) => s.email.toLowerCase() === email.trim().toLowerCase());
    if (isEnrolled) {
      setValidationError("An active account with this email address already exists. Please sign in.");
      return;
    }

    if (password.length < 8) {
      setValidationError("Create a password with at least 8 characters.");
      return;
    }

    addRegistration({
      fullName: `${firstName} ${lastName}`.trim(),
      email: email.trim(),
      phone: phone.trim(),
      grade,
      school: school.trim(),
      subjects,
      plan: planName,
      amount: planAmount,
      password: undefined,
      proofOfPaymentName: fileName,
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate({ to: "/student-login" });
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md text-center p-8 space-y-4 shadow-xl border">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">Application Received!</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We&apos;ll verify your proof of payment and activate your account. You will receive your login details shortly. Redirecting you to sign in...
            </p>
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
            <Badge className="w-fit mx-auto mb-2 bg-primary/10 text-primary uppercase font-bold text-xs">
              COMPLETE REGISTRATION
            </Badge>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Almost there — let&apos;s get you set up.</CardTitle>
            
            {/* Selected Plan Banner */}
            <div className="flex justify-between items-center bg-muted/60 p-4 rounded-xl mt-4 text-left border">
              <div>
                <span className="text-xs text-muted-foreground uppercase font-bold">Selected Plan</span>
                <p className="font-bold text-foreground text-base">{planName}</p>
                <span className="text-xs text-primary font-semibold">Allows exactly {requiredCount} subject{requiredCount > 1 ? "s" : ""}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-primary">{planAmount}</span>
                <span className="text-xs text-muted-foreground block">/month</span>
                <Link to="/subscription" className="text-[11px] text-primary hover:underline font-semibold">
                  Change plan
                </Link>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {validationError && (
                <Alert variant="destructive" className="py-2.5">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">{validationError}</AlertDescription>
                </Alert>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>First Name *</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. Kuhle" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Last Name *</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Ngam" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Email Address *</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@example.com" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number *</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 067 148 6015" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Grade *</Label>
                  <Input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="e.g. Grade 11" required />
                </div>
                <div className="space-y-1.5">
                  <Label>School *</Label>
                  <Input value={school} onChange={(e) => setSchool(e.target.value)} placeholder="e.g. Kenilworth High" required />
                </div>
              </div>

              {/* Subject Selection (Strict Count Enforcement) */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">Subjects of Interest *</Label>
                  <span className="text-xs font-bold text-primary">
                    Selected: {subjects.length} / {requiredCount}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Select exactly {requiredCount} subject{requiredCount > 1 ? "s" : ""} included in your {planName} plan.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  {ACADEMY_SUBJECTS.map((sub) => (
                    <div
                      key={sub}
                      onClick={() => toggleSubject(sub)}
                      className={`flex items-center space-x-2 border rounded-lg p-2.5 cursor-pointer transition-colors ${
                        subjects.includes(sub) ? "bg-primary/10 border-primary text-primary font-bold" : "hover:bg-muted/40"
                      }`}
                    >
                      <Checkbox id={sub} checked={subjects.includes(sub)} />
                      <label htmlFor={sub} className="text-xs cursor-pointer leading-none">
                        {sub}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to Make Payment (Official Banking Details) */}
              <div className="space-y-2 pt-3 border-t">
                <Label className="text-base font-semibold flex items-center gap-1.5 text-foreground">
                  <Building2 className="h-4 w-4 text-primary" /> How to Make Payment
                </Label>
                <div className="bg-muted/50 p-4 rounded-xl text-xs space-y-1.5 border leading-relaxed">
                  <p className="font-bold text-primary">Amount to pay: {planAmount} per month</p>
                  <p className="text-muted-foreground">
                    Pay by EFT or instant money transfer. Use your <strong>email address</strong> as the payment reference.
                  </p>
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-foreground font-mono text-[11px] bg-background p-2.5 rounded-lg border">
                    <div><strong>Bank:</strong> Capitec</div>
                    <div><strong>Account Holder:</strong> MR Gabriel Moiane</div>
                    <div><strong>Account Type:</strong> Main Account</div>
                    <div><strong>Account Number:</strong> 1709691504</div>
                    <div><strong>Branch Code:</strong> 470010</div>
                  </div>
                  <p className="text-[11px] text-muted-foreground pt-1">
                    Once payment is confirmed, upload your proof of payment below. The staff team will verify it and activate your student login credentials.
                  </p>
                </div>
              </div>

              {/* Password Creation with Show/Hide Toggle */}
              <div className="space-y-1.5 pt-2 border-t">
                <Label htmlFor="password">Create Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Upload Proof of Payment (Required <= 10MB) */}
              <div className="space-y-2 pt-2 border-t">
                <Label className="text-base font-semibold">Upload Proof of Subscription / Payment *</Label>
                {fileError && <p className="text-xs text-red-600 font-semibold">{fileError}</p>}
                <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-muted/30 transition-colors relative cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    required={!fileName}
                  />
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">{fileName ? fileName : "Click to upload proof of payment"}</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, PNG or JPG — max 10 MB</p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2">
              <Button type="submit" size="lg" className="w-full font-bold h-12">
                Create Account & Submit Proof
              </Button>
              <div className="text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link to="/student-login" className="text-primary font-bold hover:underline">
                  Sign in here
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>

      <SiteFooter />
    </div>
  );
}

export default RegisterPage;
