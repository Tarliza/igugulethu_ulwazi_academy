import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageCard, EmptyState } from "@/components/portal/EmptyState";

export const Route = createFileRoute("/student/messages")({
  component: StudentMessages,
});

function StudentMessages() {
  return (
    <PageCard title="Communication" description="Chat with your tutors and the academy.">
      <EmptyState
        icon={MessageSquare}
        title="No conversations yet"
        description="Start a conversation with your tutor — replies will appear here."
      />
      <form
        className="mt-6 flex items-center gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input placeholder="Type a message to your tutor…" />
        <Button className="bg-brand-navy text-white hover:bg-brand-navy-deep">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </PageCard>
  );
}
