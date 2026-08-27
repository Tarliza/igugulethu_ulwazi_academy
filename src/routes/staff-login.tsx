
import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { signInStaff } from "@/lib/auth";

export const Route = createFileRoute("/staff-login")({
  component: StaffLoginPage,
});

export function StaffLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const enteredEmail = email.trim().toLowerCase();
    const enteredPass = password;

    // Clear typing bar immediately on submit
    setEmail("");
    setPassword("");

    const { error: authError } = await signInStaff(enteredEmail, enteredPass);
    setLoading(false);

    if (authError) {
      setError("Invalid staff login credentials.");
      return;
    }

    navigate({ to: "/staff" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Staff Login</h1>
            <p className="text-sm text-muted-foreground">Restricted access — existing staff members only.</p>
          </div>

          <Card className="shadow-lg border">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-6">
                {error && (
                  <Alert variant="destructive" className="py-2.5">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="email">Staff Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="moiane158@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your staff password"
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

                <p className="text-center text-xs text-muted-foreground">
                  Staff accounts are created by administration. No public sign-up.
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

export default StaffLoginPage;
