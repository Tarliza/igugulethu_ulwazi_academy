import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { getAnnouncements, Announcement } from "@/lib/student-storage";

export const Route = createFileRoute("/student/messages")({
  component: StudentMessagesPage,
});

export function StudentMessagesPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const refresh = () => setAnnouncements([...getAnnouncements()]);
    refresh();
    window.addEventListener("academy-data-updated", refresh);
    return () => window.removeEventListener("academy-data-updated", refresh);
  }, []);

  return (
    <PortalShell role="student" title="Student Messages">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div>
          <h2 className="text-xl font-bold">Academy Messages & Announcements</h2>
          <p className="text-sm text-muted-foreground">Important notices and updates published by academy staff.</p>
        </div>
        {announcements.length === 0 ? (
          <Card className="text-center py-12 border-dashed">
            <CardContent className="space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">No announcements yet</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Academy announcements will appear here when staff publish them.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="border shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <CardTitle className="text-base font-bold">{announcement.title}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {new Date(announcement.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                    </Badge>
                  </div>
                  <CardDescription>{announcement.author}</CardDescription>
                </CardHeader>
                <CardContent className="whitespace-pre-line text-sm leading-relaxed">
                  {announcement.content}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}

export default StudentMessagesPage;
