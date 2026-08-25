
import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Mail, AlertCircle, CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { verifyStudentLogin } from "@/lib/student-storage";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/student-login")({
  component: StudentLoginPage,
});

export function StudentLoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const result = verifyStudentLogin(identifier, password);
      setLoading(false);

      if (result.success) {
        navigate({ to: "/student" });
      } else {
        setError(result.error || "Invalid student credentials.");
      }
    }, 400);
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
            <CardHeader className="pb-4">
              <div className="p-3 bg-muted/60 rounded-lg text-xs space-y-1 text-muted-foreground border">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-primary" /> First time signing in?
                </p>
                <p>
                  You can sign in with your <strong>Student Number</strong> or your <strong>registered Email Address</strong> once approved.
                </p>
              </div>
            </CardHeader>

            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="py-2.5">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="identifier">Student Number or Email Address</Label>
                  <Input
                    id="identifier"
                    placeholder="e.g. STU2026001 or email@domain.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 pt-2">
                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <div className="text-center text-xs text-muted-foreground pt-2">
                  New here?{" "}
                  <Link to="/subscription" className="text-primary font-semibold hover:underline">
                    Choose a plan to sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
