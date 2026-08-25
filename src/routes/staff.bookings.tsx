
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getScheduleEvents, getTutorBookings, addScheduleEvent, ScheduleEvent, TutorBooking, ACADEMY_SUBJECTS } from "@/lib/student-storage";
import { Calendar, Plus, Video, Clock, BookmarkPlus, CheckCircle2, UserCheck, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/staff/bookings")({
  component: StaffBookingsPage,
});

export function StaffBookingsPage() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [bookings, setBookings] = useState<TutorBooking[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [tutorName, setTutorName] = useState("Mr. Moiane");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [teamsLink, setTeamsLink] = useState("");

  const loadData = () => {
    setEvents(getScheduleEvents());
    setBookings(getTutorBookings());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    addScheduleEvent({
      title,
      subject,
      tutorName,
      teamsLink: teamsLink || "https://teams.microsoft.com",
      date,
      time,
    });

    setTitle("");
    setDate("");
    setTime("");
    setTeamsLink("");
    setOpenModal(false);
    loadData();
  };

  return (
    <PortalShell role="staff" title="Schedule & 1-on-1 Bookings">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Classes & Booking Management</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Schedule live Microsoft Teams classes and manage 1-on-1 tutoring consultation requests from R750 tier learners.
            </p>
          </div>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button className="gap-2 font-bold">
                <Plus className="h-4 w-4" /> Add Live Class Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule Live Class</DialogTitle>
                <DialogDescription className="text-xs">
                  Provide session details and your Microsoft Teams meeting link for learners.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEvent} className="space-y-3 py-2 text-xs">
                <div className="space-y-1">
                  <Label>Subject *</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ACADEMY_SUBJECTS.map((sub) => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Lesson Title *</Label>
                  <Input placeholder="e.g. Grade 11 Trigonometric Identities Revision" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label>Tutor In Charge *</Label>
                  <Input value={tutorName} onChange={(e) => setTutorName(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <Label>Date *</Label>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <Label>Time Slot *</Label>
                    <Input placeholder="10:00 - 11:30" value={time} onChange={(e) => setTime(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-primary flex items-center gap-1">
                    <Video className="h-3.5 w-3.5" /> Microsoft Teams Meeting Link *
                  </Label>
                  <Input placeholder="https://teams.microsoft.com/l/meetup-join/..." value={teamsLink} onChange={(e) => setTeamsLink(e.target.value)} required />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="submit" className="w-full font-bold">Publish to Timetables</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* 1-on-1 Student Booking Requests Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <BookmarkPlus className="h-5 w-5 text-primary" /> 1-on-1 Private Consultation Requests
              </h2>
              <p className="text-xs text-muted-foreground">Bookings submitted exclusively by learners on the R750 3-Subjects plan.</p>
            </div>
            <Badge variant="outline">{bookings.length} Request{bookings.length === 1 ? "" : "s"}</Badge>
          </div>

          {bookings.length === 0 ? (
            <Card className="p-8 text-center border-dashed">
              <p className="text-xs text-muted-foreground">No 1-on-1 session requests at the moment.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <Card key={b.id} className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="font-mono text-[10px] bg-primary/10 text-primary mb-1">{b.studentNumber}</Badge>
                        <CardTitle className="text-base font-bold">{b.studentName}</CardTitle>
                        <CardDescription className="text-xs">{b.subject} Private Session</CardDescription>
                      </div>
                      <Badge className="bg-amber-500/15 text-amber-700 border-amber-500/30 text-[11px]">{b.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs border-t pt-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Requested Date/Time:</span>
                      <strong className="text-foreground">{b.date} at {b.time}</strong>
                    </div>
                    {b.notes && (
                      <p className="text-muted-foreground bg-muted/40 p-2 rounded">
                        <strong>Focus:</strong> {b.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Scheduled Classes */}
        <div className="space-y-4 pt-4 border-t">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" /> Scheduled Live Classes & Sessions
          </h2>
          {events.length === 0 ? (
            <Card className="p-8 text-center border-dashed">
              <p className="text-xs text-muted-foreground">No upcoming live classes scheduled. Click &quot;Add Live Class Event&quot; above.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {events.map((ev) => (
                <Card key={ev.id} className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">{ev.subject}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {ev.time}
                      </span>
                    </div>
                    <CardTitle className="text-base font-bold mt-1.5">{ev.title}</CardTitle>
                    <CardDescription className="text-xs">Tutor: {ev.tutorName} • {ev.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2 border-t">
                    <a href={ev.teamsLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                      <Button size="sm" variant="outline" className="w-full gap-1 text-xs">
                        <ExternalLink className="h-3.5 w-3.5" /> Open Teams Meeting
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PortalShell>
  );
}

export default StaffBookingsPage;
