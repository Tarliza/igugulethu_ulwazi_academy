
import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addBooking } from "@/lib/student-storage";
import { Calendar, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/student/book")({
  component: StudentBookPage,
});

export function StudentBookPage() {
  const [subject, setSubject] = useState("Mathematics");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    addBooking({
      title: `${subject} 1-on-1 Consultation`,
      date,
      time,
      notes,
    });
    setBooked(true);
  };

  return (
    <PortalShell role="student" title="Book a 1-on-1 Tutoring Session">
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="text-xl font-bold">Schedule Personal Consultation</h2>
          <p className="text-sm text-muted-foreground">Request individual tutoring time with an academy instructor.</p>
        </div>

        {booked ? (
          <Card className="p-6 text-center border-dashed space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Session Request Sent!</h3>
            <p className="text-xs text-muted-foreground">Your tutor will confirm your booking appointment.</p>
            <Button size="sm" variant="outline" onClick={() => setBooked(false)}>Book another session</Button>
          </Card>
        ) : (
          <Card className="border shadow-sm">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-1.5">
                  <Label>Subject</Label>
                  <Input value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Date</Label>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Time</Label>
                    <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Specific Topics to Focus On</Label>
                  <Textarea placeholder="e.g. Help with Trigonometric Identities" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <Button type="submit" className="w-full">Confirm Session Request</Button>
              </CardContent>
            </form>
          </Card>
        )}
      </div>
    </PortalShell>
  );
}
