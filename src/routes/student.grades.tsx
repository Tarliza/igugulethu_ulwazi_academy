import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/student/grades")({
  component: () => (
    <PageCard title="Grades" description="Assessment and quiz results across your subjects.">
      <EmptyState
        icon={GraduationCap}
        title="No grades recorded"
        description="Once you complete quizzes or assignments, your results will appear here."
      />
    </PageCard>
  ),
});
