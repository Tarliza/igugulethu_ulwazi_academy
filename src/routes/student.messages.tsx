
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export const Route = createFileRoute("/student/messages")({
  component: StudentMessagesPage,
});

export function StudentMessagesPage() {
  return (
    <PortalShell role="student" title="Student Messages">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">Direct Messaging</h2>
          <p className="text-sm text-muted-foreground">Communicate directly with your tutors and academy staff.</p>
        </div>
        <Card className="text-center py-12 border-dashed">
          <CardContent className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">No new messages yet</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Announcements and tutor feedback will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
