import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/student/timetable")({
  component: () => (
    <PageCard title="Timetable" description="Your weekly class schedule.">
      <EmptyState
        icon={Calendar}
        title="No timetable published"
        description="Your weekly class times will appear here once your tutor confirms them."
      />
    </PageCard>
  ),
});
