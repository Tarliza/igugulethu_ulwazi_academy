
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
import { addRegistration } from "@/lib/student-storage";
import { GraduationCap, Upload, CheckCircle2, ArrowRight } from "lucide-react";

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
  const [subjects, setSubjects] = useState<string[]>(["Mathematics", "Life Sciences"]);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const planName = search.plan === "1-subject" ? "1 Subject" : search.plan === "3-subjects" ? "3 Subjects" : "2 Subjects";
  const planAmount = search.plan === "1-subject" ? "R300" : search.plan === "3-subjects" ? "R750" : "R550";

  const allSubjects = [
    "Mathematics",
    "Physical Sciences",
    "Life Sciences",
    "Accounting",
    "Business Studies",
    "Geography",
    "History",
    "English",
    "isiZulu",
  ];

  const toggleSubject = (sub: string) => {
    if (subjects.includes(sub)) {
      setSubjects(subjects.filter((s) => s !== sub));
    } else {
      setSubjects([...subjects, sub]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email) return;

    addRegistration({
      fullName: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      grade,
      school,
      subjects,
      plan: planName,
      amount: planAmount,
      password: password || "password123",
      proofOfPaymentName: fileName || "Proof_of_Payment.pdf",
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate({ to: "/student-login" });
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md text-center p-6 space-y-4 shadow-xl border">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">Application Received!</h2>
            <p className="text-sm text-muted-foreground">
              We&apos;ll verify your proof of payment and activate your account. Redirecting you to sign in...
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
            <Badge className="w-fit mx-auto mb-2 bg-primary/10 text-primary hover:bg-primary/20">COMPLETE REGISTRATION</Badge>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Almost there — let&apos;s get you set up.</CardTitle>
            <div className="flex justify-between items-center bg-muted/60 p-3.5 rounded-xl mt-4 text-left border">
              <div>
                <span className="text-xs text-muted-foreground uppercase font-bold">Selected Plan</span>
                <p className="font-bold text-foreground text-base">{planName}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-primary">{planAmount}</span>
                <span className="text-xs text-muted-foreground block">/month</span>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>First Name *</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Last Name *</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Email Address *</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number *</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Grade *</Label>
                  <Input value={grade} onChange={(e) => setGrade(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>School *</Label>
                  <Input value={school} onChange={(e) => setSchool(e.target.value)} required />
                </div>
              </div>

              {/* Subject Selection */}
              <div className="space-y-2 pt-2 border-t">
                <Label className="text-base font-semibold">Subjects of Interest</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  {allSubjects.map((sub) => (
                    <div key={sub} className="flex items-center space-x-2 border rounded-lg p-2.5 hover:bg-muted/40 cursor-pointer">
                      <Checkbox id={sub} checked={subjects.includes(sub)} onCheckedChange={() => toggleSubject(sub)} />
                      <label htmlFor={sub} className="text-xs font-medium cursor-pointer leading-none">
                        {sub}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5 pt-2 border-t">
                <Label>Create Password *</Label>
                <Input type="password" placeholder="Create a secure password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              {/* Proof of Payment Upload */}
              <div className="space-y-2 pt-2 border-t">
                <Label className="text-base font-semibold">Upload Proof of Payment *</Label>
                <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-muted/30 transition-colors relative cursor-pointer">
                  <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" required={!fileName} />
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">{fileName ? fileName : "Click to upload proof of payment"}</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, PNG, or JPG — max 10MB</p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2">
              <Button type="submit" size="lg" className="w-full">
                Create Account & Submit Proof
              </Button>
              <div className="text-center text-xs text-muted-foreground">
                Already registered?{" "}
                <Link to="/student-login" className="text-primary font-semibold hover:underline">
                  Sign in
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
