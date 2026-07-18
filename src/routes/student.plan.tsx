import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/student/plan")({
  component: () => (
    <PageCard title="Teaching Plan" description="Your tutor's roadmap for each subject.">
      <EmptyState
        icon={BookOpen}
        title="No teaching plan yet"
        description="Your tutor will publish the term's teaching plan here once your subjects are active."
      />
    </PageCard>
  ),
});
