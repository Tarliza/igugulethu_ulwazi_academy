import { createFileRoute } from "@tanstack/react-router";
import { User, Lock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PageCard } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/student/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <PageCard title="Account details" description="Your personal information on file.">
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-2">
              <Label htmlFor="first">First name</Label>
              <Input id="first" defaultValue="Thabo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last">Last name</Label>
              <Input id="last" defaultValue="Mbeki" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="thabo@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="067 148 6015" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Input id="grade" defaultValue="Grade 11" />
            </div>
            <div className="sm:col-span-2">
              <Button className="bg-brand-navy text-white hover:bg-brand-navy-deep">
                <User className="mr-2 h-4 w-4" /> Save changes
              </Button>
            </div>
          </form>
        </PageCard>

        <div className="mt-6">
          <PageCard title="Change password" description="Use a strong password you don't reuse elsewhere.">
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm new password</Label>
                <Input id="confirm" type="password" />
              </div>
              <div className="sm:col-span-2">
                <Button className="bg-brand-navy text-white hover:bg-brand-navy-deep">
                  <Lock className="mr-2 h-4 w-4" /> Update password
                </Button>
              </div>
            </form>
          </PageCard>
        </div>
      </div>

      <div>
        <PageCard title="Subscription" description="Your current plan status.">
          <div className="rounded-2xl border border-border bg-brand-cream/40 p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-amber text-brand-navy">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-brand-navy">No active plan</div>
                <div className="text-xs text-muted-foreground">
                  Complete registration to activate.
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Status</span>
              <Badge className="bg-brand-amber-soft text-brand-navy hover:bg-brand-amber-soft">
                Pending
              </Badge>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Renews</span>
              <span className="font-medium text-brand-navy">—</span>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
}
