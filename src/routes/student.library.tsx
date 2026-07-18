import { createFileRoute } from "@tanstack/react-router";
import { Library } from "lucide-react";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/student/library")({
  component: () => (
    <PageCard title="Library" description="Notes, past papers, and study material.">
      <EmptyState
        icon={Library}
        title="Library is empty"
        description="Resources uploaded by your tutors will appear here for you to download."
      />
    </PageCard>
  ),
});
