import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/staff/students")({
  component: StudentRoster,
});

function StudentRoster() {
  return (
    <PageCard
      title="Student Roster"
      description="All approved and active students appear here."
      action={<Button className="bg-brand-navy text-white hover:bg-brand-navy-deep">Add Student</Button>}
    >
      <EmptyState
        icon={Users}
        title="No students enrolled yet"
        description="Approved students will appear here with their subjects, tutors, and payment status."
      />
    </PageCard>
  );
}
