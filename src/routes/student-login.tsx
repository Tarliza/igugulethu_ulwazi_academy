
import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GraduationCap, Mail, AlertCircle, Eye, EyeOff, ArrowRight, HelpCircle, Phone } from "lucide-react";
import { signInStudent, requestPasswordReset } from "@/lib/auth";
import { supabase } from "@/integrations/client";
import { getStudentByUserId, setCurrentStudentSnapshot } from "@/lib/student-session";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/student-login")({
  component: StudentLoginPage,
});

export function StudentLoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const enteredId = identifier;
    const enteredPass = password;

    // Clear input fields immediately upon submit
    setIdentifier("");
    setPassword("");

    const { data, error: authError } = await signInStudent(enteredId, enteredPass);
    setLoading(false);

    if (authError || !data.user) {
      setError("Invalid student credentials.");
      return;
    }

    const { student, error: studentError } = await getStudentByUserId(data.user.id);
    if (studentError || !student) {
      await supabase.auth.signOut();
      setError("Your student profile is not active yet. Please contact the academy administration.");
      return;
    }

    if (student.status !== "Active") {
      await supabase.auth.signOut();
      setError("Access denied due to outstanding payments or inactive account status.");
      return;
    }

    setCurrentStudentSnapshot(student);
    navigate({ to: "/student" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Student Login</h1>
            <p className="text-sm text-muted-foreground">Welcome back — sign in to access your modules & portal.</p>
          </div>

          <Card className="shadow-lg border">
            <CardHeader className="pb-3">
              {/* Informative Guidance Banner */}
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl text-xs space-y-1.5 text-muted-foreground">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-primary" /> First time signing in?
                </p>
                <p className="leading-relaxed">
                  Please be on the lookout for a message or email from the administration with your generated Student Number and verification confirmation once your proof of payment is approved.
                </p>
              </div>
            </CardHeader>

            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="py-2.5">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs leading-relaxed">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="identifier">Student Number or Email Address</Label>
                  <Input
                    id="identifier"
                    placeholder="e.g. STU2026001 or email@domain.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-primary font-semibold hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
              </CardContent>

              <CardFooter className="flex flex-col gap-3 pt-2">
                <Button type="submit" className="w-full gap-2 font-bold h-11" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <div className="text-center text-xs text-muted-foreground pt-2">
                  New here?{" "}
                  <Link to="/subscription" className="text-primary font-bold hover:underline">
                    Choose a plan to sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Dialog open={showForgotModal} onOpenChange={setShowForgotModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
              <HelpCircle className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center">Forgot Your Credentials?</DialogTitle>
            <DialogDescription className="text-center text-xs">
              If you are an approved student and forgot your password or Student Number, please contact the academy administration.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted/50 p-4 rounded-xl text-xs space-y-2 border my-2">
            <p className="font-semibold text-foreground">Admin Contact Lines:</p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-3.5 w-3.5 text-primary" /> moiane158@gmail.com
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-3.5 w-3.5 text-primary" /> +27 67 148 6015 (WhatsApp)
            </p>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={async () => {
                if (!identifier.includes("@")) {
                  setError("Enter your email address above, then use Forgot password again.");
                  return;
                }
                const { error } = await requestPasswordReset(identifier);
                if (error) setError("We could not send the reset email. Please contact administration.");
                else setError("Password reset instructions have been sent to your email if the account exists.");
                setShowForgotModal(false);
              }}
              className="w-full"
            >Send Reset Email</Button>
            <Button onClick={() => setShowForgotModal(false)} className="w-full">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
}

export default StudentLoginPage;
