
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, ExternalLink, UserCheck } from "lucide-react";
import { getCurrentStudent, getScheduleEvents, Student, ScheduleEvent } from "@/lib/student-storage";

export const Route = createFileRoute("/student/timetable")({
  component: StudentTimetablePage,
});

export function StudentTimetablePage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    setStudent(getCurrentStudent());
    setEvents(getScheduleEvents());
  }, []);

  const enrolledEvents = events.filter(
    (ev) => (student?.subjects || []).includes(ev.subject) || ev.subject === "All Subjects"
  );

  return (
    <PortalShell role="student" title="Live Class Timetable">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div>
          <h2 className="text-xl font-bold">Your Live Online Class Schedule</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Classes are hosted on Microsoft Teams. Click &quot;Join Live Class&quot; at the scheduled time to enter the meeting.
          </p>
        </div>

        {enrolledEvents.length === 0 ? (
          <Card className="text-center py-12 border-dashed space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">No classes scheduled yet</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Your tutors will publish weekly live session times and Microsoft Teams meeting links here.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrolledEvents.map((ev) => (
              <Card key={ev.id} className="border shadow-sm hover:border-primary/40 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs font-bold bg-primary/10 text-primary">{ev.subject}</Badge>
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {ev.time}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold mt-2">{ev.title}</CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1.5 mt-1">
                    <UserCheck className="h-3.5 w-3.5 text-primary" /> Tutor: <strong>{ev.tutorName}</strong>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-1 border-t text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Date:</span>
                    <span className="font-semibold text-foreground">{ev.date}</span>
                  </div>
                  <a href={ev.teamsLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button size="sm" className="w-full gap-1.5 font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white">
                      <Video className="h-3.5 w-3.5" /> Join Live Class (Teams)
                      <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}

export default StudentTimetablePage;
