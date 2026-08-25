
import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCurrentStudent, addTutorBooking, Student } from "@/lib/student-storage";
import { BookmarkPlus, CheckCircle2, Lock, ArrowRight, ShieldCheck, Video } from "lucide-react";

export const Route = createFileRoute("/student/book")({
  component: StudentBookPage,
});

export function StudentBookPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const curr = getCurrentStudent();
    setStudent(curr);
    if (curr?.subjects && curr.subjects.length > 0) {
      setSubject(curr.subjects[0]);
    }
  }, []);

  const hasAccess = student?.plan === "3 Subjects";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student || !date || !time) return;

    addTutorBooking({
      studentId: student.id,
      studentName: student.fullName,
      studentNumber: student.studentNumber,
      subject,
      date,
      time,
      notes,
    });

    setBooked(true);
  };

  return (
    <PortalShell role="student" title="1-on-1 Tutor Booking">
      <div className="space-y-6 max-w-2xl mx-auto">
        <div>
          <h2 className="text-xl font-bold">Book a 1-on-1 Private Consultation</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Exclusive benefit for students on the <strong>3 Subjects (R750/month)</strong> plan.
          </p>
        </div>

        {!hasAccess ? (
          <Card className="border-amber-500/30 bg-amber-500/5 shadow-sm text-center p-8 space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Lock className="h-7 w-7" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <Badge className="bg-amber-500/20 text-amber-800 border-amber-500/30">Plan Upgrade Required</Badge>
              <h3 className="text-xl font-bold text-foreground">1-on-1 Sessions are for R750 Plan Members</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You are currently enrolled in the <strong>{student?.plan || "1 or 2 Subjects"}</strong> plan. Upgrade to the 3 Subjects plan to unlock personal private consultation sessions with our senior tutors.
              </p>
            </div>
            <Link to="/student/payment">
              <Button className="font-bold gap-2 text-xs">
                Upgrade to 3 Subjects Plan <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        ) : booked ? (
          <Card className="p-8 text-center border-dashed space-y-3 shadow-sm">
            <div className="mx-auto w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="font-bold text-xl">1-on-1 Session Requested!</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
              Your request for <strong>{subject}</strong> on <strong>{date} at {time}</strong> has been sent to the tutor team. You will receive a confirmation and Teams meeting link shortly.
            </p>
            <Button size="sm" variant="outline" onClick={() => setBooked(false)}>Book another session</Button>
          </Card>
        ) : (
          <Card className="border shadow-sm">
            <form onSubmit={handleSubmit}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold">Request Private Consultation</CardTitle>
                <CardDescription className="text-xs">Select your subject and preferred time slot.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-3 text-xs">
                <div className="space-y-1">
                  <Label>Subject *</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {student?.subjects.map((sub) => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Preferred Date *</Label>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <Label>Preferred Time *</Label>
                    <Input placeholder="e.g. 15:00 - 16:00" value={time} onChange={(e) => setTime(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Specific Topics to Focus On</Label>
                  <Textarea placeholder="e.g. Need assistance with Calculus Optimization problems." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
                </div>
              </CardContent>

              <CardFooter className="pt-2 border-t">
                <Button type="submit" className="w-full font-bold">Submit 1-on-1 Booking Request</Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </PortalShell>
  );
}

export default StudentBookPage;
