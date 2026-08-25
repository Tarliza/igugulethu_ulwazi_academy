
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, BookOpen } from "lucide-react";
import { getCurrentStudent, Student } from "@/lib/student-storage";

export const Route = createFileRoute("/student/timetable")({
  component: StudentTimetablePage,
});

export function StudentTimetablePage() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    setStudent(getCurrentStudent());
  }, []);

  const schedule = [
    { day: "Monday", time: "16:00 - 17:30", subject: "Mathematics", topic: "Algebraic Functions & Graphs", tutor: "Mr. G. Moiane" },
    { day: "Wednesday", time: "16:00 - 17:30", subject: "Life Sciences", topic: "Cell Division & Genetics", tutor: "Ms. T. Ndlovu" },
    { day: "Saturday", time: "10:00 - 12:00", subject: "Exam Masterclass", topic: "Past Paper Question Walkthrough", tutor: "Academy Faculty" },
  ];

  return (
    <PortalShell role="student" title="Weekly Class Timetable">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">Live Session Schedule</h2>
          <p className="text-sm text-muted-foreground">Times for upcoming tutorials, group classes, and revision sessions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {schedule.map((item, i) => (
            <Card key={i} className="border shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="font-semibold text-xs">{item.day}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {item.time}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold mt-2">{item.subject}</CardTitle>
                <CardDescription className="text-xs">{item.topic}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-1 border-t text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Tutor:</span>
                  <span className="font-semibold text-foreground">{item.tutor}</span>
                </div>
                <Button size="sm" className="w-full gap-1.5 text-xs">
                  <Video className="h-3.5 w-3.5" /> Join Live Class
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
