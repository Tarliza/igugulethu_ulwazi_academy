
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAnnouncements, addAnnouncement, Announcement } from "@/lib/student-storage";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/staff/messages")({
  component: StaffMessagesPage,
});

export function StaffMessagesPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const loadData = () => {
    setAnnouncements(getAnnouncements());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addAnnouncement({
      title,
      content,
      author: "Mr. G. Moiane (Academic Lead)",
    });

    setTitle("");
    setContent("");
    loadData();
  };

  return (
    <PortalShell role="staff" title="Announcements & Messages">
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Student Broadcasts & Announcements</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Send direct notices, exam reminders, and updates to all registered students.
          </p>
        </div>

        {/* Post Form */}
        <Card className="shadow-sm border">
          <CardHeader>
            <CardTitle className="text-base font-bold">Post New Announcement</CardTitle>
            <CardDescription className="text-xs">Broadcast a message to student dashboards.</CardDescription>
          </CardHeader>
          <form onSubmit={handlePost}>
            <CardContent className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <Label>Announcement Title *</Label>
                <Input placeholder="e.g. Weekend Masterclass Timetable Confirmation" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-1">
                <Label>Message Content *</Label>
                <Textarea placeholder="Type announcement details for students..." value={content} onChange={(e) => setContent(e.target.value)} rows={4} required />
              </div>
              <Button type="submit" size="sm" className="gap-1.5 font-bold">
                <Send className="h-3.5 w-3.5" /> Post Announcement
              </Button>
            </CardContent>
          </form>
        </Card>

        {/* List of Sent Announcements */}
        <div className="space-y-3">
          <h3 className="font-bold text-base">Published Announcements ({announcements.length})</h3>
          {announcements.length === 0 ? (
            <Card className="p-8 text-center border-dashed">
              <p className="text-xs text-muted-foreground">No announcements posted yet.</p>
            </Card>
          ) : (
            announcements.map((ann) => (
              <Card key={ann.id} className="border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-bold">{ann.title}</CardTitle>
                    <span className="text-[11px] text-muted-foreground">{new Date(ann.createdAt).toLocaleDateString()}</span>
                  </div>
                  <CardDescription className="text-xs font-semibold text-primary">{ann.author}</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                  {ann.content}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </PortalShell>
  );
}

export default StaffMessagesPage;
