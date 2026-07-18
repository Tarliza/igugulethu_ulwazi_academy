import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/student/subjects")({
  component: MySubjects,
});

// Replace with Supabase-driven subscription data
const subjects: { name: string; tutor: string; nextClass: string }[] = [];

function MySubjects() {
  return (
    <div className="space-y-6">
      <PageCard
        title="My Subjects"
        description="The subjects included in your active subscription plan."
        action={
          <Badge className="bg-brand-amber-soft text-brand-navy hover:bg-brand-amber-soft">
            No active plan
          </Badge>
        }
      >
        {subjects.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No subjects yet"
            description="Once your registration is approved, the subjects from your plan (1, 2, or 3) will appear here."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((s) => (
              <div key={s.name} className="rounded-2xl border border-border bg-background p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-amber text-brand-navy">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="mt-3 font-display text-base font-extrabold text-brand-navy">
                  {s.name}
                </div>
                <div className="text-xs text-muted-foreground">Tutor: {s.tutor}</div>
                <div className="mt-2 text-xs">Next: {s.nextClass}</div>
              </div>
            ))}
          </div>
        )}
      </PageCard>
    </div>
  );
}
