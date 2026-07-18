import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/student/quizzes")({
  component: () => (
    <PageCard title="Quizzes" description="Practice quizzes and mini-tests set by your tutor.">
      <EmptyState
        icon={HelpCircle}
        title="No quizzes available"
        description="New quizzes will appear here as soon as your tutor publishes them."
      />
    </PageCard>
  ),
});
