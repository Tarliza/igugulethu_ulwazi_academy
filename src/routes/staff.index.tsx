
import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  getPendingRegistrations,
  getStudents,
  getResources,
  getScheduleEvents,
  getTutorBookings,
  addResource,
  addStudentDirectly,
  addScheduleEvent,
  Registration,
  Student,
  ACADEMY_SUBJECTS,
  AcademySubject
} from "@/lib/student-storage";
import {
  Users,
  Clock,
  CreditCard,
  BookOpen,
  Plus,
  UploadCloud,
  ArrowRight,
  UserCheck,
  Calendar,
  Video,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export const Route = createFileRoute("/staff/")({
  component: StaffDashboardPage,
});

export function StaffDashboardPage() {
  const [pending, setPending] = useState<Registration[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [resourceCount, setResourceCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const [bookingRequestsCount, setBookingRequestsCount] = useState(0);

  // Quick Action Dialogs
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openResourceModal, setOpenResourceModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [generatedStudentInfo, setGeneratedStudentInfo] = useState<{ student: Student; studentNumber: string } | null>(null);

  // Resource Form
  const [resTitle, setResTitle] = useState("");
  const [resSubject, setResSubject] = useState<string>("Mathematics");
  const [resDesc, setResDesc] = useState("");
  const [resFileName, setResFileName] = useState("");

  // Student Form (Same fields as registration)
  const [stuFirstName, setStuFirstName] = useState("");
  const [stuLastName, setStuLastName] = useState("");
  const [stuEmail, setStuEmail] = useState("");
  const [stuPhone, setStuPhone] = useState("");
  const [stuGrade, setStuGrade] = useState("Grade 11");
  const [stuSchool, setStuSchool] = useState("");
  const [stuPlan, setStuPlan] = useState<"1 Subject" | "2 Subjects" | "3 Subjects">("2 Subjects");
  const [stuPassword, setStuPassword] = useState("");

  // Schedule Session Form
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionSubject, setSessionSubject] = useState<string>("Mathematics");
  const [tutorName, setTutorName] = useState("Mr. Moiane");
  const [teamsLink, setTeamsLink] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");

  const loadDashboardData = () => {
    const pend = getPendingRegistrations();
    const stu = getStudents();
    const res = getResources();
    const sched = getScheduleEvents();
    const bookings = getTutorBookings();
    setPending(pend);
    setStudents(stu);
    setResourceCount(res.length);
    setSessionCount(sched.length);
    setBookingRequestsCount(bookings.filter((b) => b.status === "pending").length);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stuFirstName || !stuEmail) return;

    const newStu = addStudentDirectly({
      fullName: `${stuFirstName} ${stuLastName}`.trim(),
      email: stuEmail.trim(),
      phone: stuPhone.trim() || "+27 00 000 0000",
      grade: stuGrade,
      school: stuSchool.trim() || "Academy",
      subjects: stuPlan === "1 Subject" ? ["Mathematics"] : stuPlan === "3 Subjects" ? ["Mathematics", "Physical Sciences", "Life Science"] : ["Mathematics", "Physical Sciences"],
      plan: stuPlan,
      amount: stuPlan === "1 Subject" ? "R300" : stuPlan === "3 Subjects" ? "R750" : "R550",
      password: stuPassword || "password123",
      status: "Active",
    });

    setGeneratedStudentInfo({ student: newStu, studentNumber: newStu.studentNumber });
    setStuFirstName("");
    setStuLastName("");
    setStuEmail("");
    setStuPhone("");
    setStuSchool("");
    setStuPassword("");
    loadDashboardData();
  };

  const handleUploadResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle) return;

    addResource({
      title: resTitle,
      subject: resSubject,
      description: resDesc,
      fileName: resFileName || (resTitle.toLowerCase().replace(/\s+/g, "_") + ".pdf"),
      uploadedBy: "Staff Administration",
    });

    setResTitle("");
    setResDesc("");
    setResFileName("");
    setOpenResourceModal(false);
    loadDashboardData();
  };

  const handleScheduleSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionTitle || !sessionDate || !sessionTime) return;

    addScheduleEvent({
      title: sessionTitle,
      subject: sessionSubject,
      tutorName: tutorName || "Academy Faculty",
      teamsLink: teamsLink || "https://teams.microsoft.com",
      date: sessionDate,
      time: sessionTime,
    });

    setSessionTitle("");
    setTeamsLink("");
    setSessionDate("");
    setSessionTime("");
    setOpenScheduleModal(false);
    loadDashboardData();
  };

  // Calculate overdue/restricted accounts
  const restrictedStudents = students.filter((s) => s.status === "Access Denied" || s.status === "Payment Overdue");
  const totalOverdueZAR = restrictedStudents.reduce((sum, s) => {
    const num = parseInt(s.amount.replace(/\D/g, ""), 10) || 550;
    return sum + num;
  }, 0);

  return (
    <PortalShell role="staff" title="Staff Overview Dashboard">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Staff Operations Center</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage student registrations, capture test marks, upload curriculum notes, and schedule Microsoft Teams classes.
            </p>
          </div>
          <Link to="/staff/verifications">
            <Button variant={pending.length > 0 ? "default" : "outline"} size="sm" className="gap-2 font-bold shadow-sm">
              <UserCheck className="h-4 w-4" />
              Pending Verifications ({pending.length})
            </Button>
          </Link>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Total Enrolled</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-extrabold">{students.length}</div>
              <p className="text-[11px] text-muted-foreground mt-1">Active learners across all grades</p>
            </CardContent>
          </Card>

          <Card className={`shadow-sm border ${pending.length > 0 ? "border-amber-500/40 bg-amber-500/5" : ""}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className={`text-xs sm:text-sm font-semibold ${pending.length > 0 ? "text-amber-700" : "text-muted-foreground"}`}>
                Pending Verifications
              </CardTitle>
              <Clock className={`h-4 w-4 ${pending.length > 0 ? "text-amber-600" : "text-muted-foreground"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl sm:text-3xl font-extrabold ${pending.length > 0 ? "text-amber-700" : ""}`}>{pending.length}</div>
              <p className="text-[11px] text-muted-foreground mt-1">Awaiting proof of payment review</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Outstanding / Overdue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-extrabold">ZAR {totalOverdueZAR}</div>
              <p className="text-[11px] text-muted-foreground mt-1">{restrictedStudents.length} learner(s) with restricted access</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Active Resources</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-extrabold">{resourceCount}</div>
              <p className="text-[11px] text-muted-foreground mt-1">Published study worksheets</p>
            </CardContent>
          </Card>
        </div>

        {/* 2-Column Section: Recent Registration & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Pending Applications Queue */}
          <Card className="lg:col-span-2 shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-bold">Recent Registration Activity</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Submitted applications awaiting proof of payment confirmation</CardDescription>
              </div>
              <Link to="/staff/verifications">
                <Button variant="ghost" size="sm" className="gap-1 text-xs font-bold text-primary">
                  Review all ({pending.length}) <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {pending.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground text-sm border border-dashed rounded-xl">
                  <CheckCircle2 className="h-8 w-8 mx-auto text-green-500 mb-2 opacity-80" />
                  <p className="font-semibold">All registrations have been verified!</p>
                  <p className="text-xs text-muted-foreground mt-0.5">New student applications will appear here automatically.</p>
                </div>
              ) : (
                <div className="divide-y border rounded-xl overflow-hidden">
                  {pending.map((reg) => (
                    <div key={reg.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-muted/20 transition-colors">
                      <div>
                        <p className="font-bold text-sm text-foreground">{reg.fullName}</p>
                        <p className="text-xs text-muted-foreground">
                          {reg.email} • {reg.grade} • <strong className="text-primary">{reg.plan}</strong>
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Proof: <span className="font-mono">{reg.proofOfPaymentName}</span>
                        </p>
                      </div>
                      <Link to="/staff/verifications">
                        <Button size="sm" variant="default" className="text-xs font-bold gap-1">
                          Inspect & Approve
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions Panel */}
          <Card className="shadow-sm border">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Staff Quick Actions</CardTitle>
              <CardDescription className="text-xs">Direct actions to manage learners and classes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Enroll New Student Modal */}
              <Dialog open={openStudentModal} onOpenChange={(val) => { setOpenStudentModal(val); if (!val) setGeneratedStudentInfo(null); }}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2.5 h-11 text-xs font-bold hover:border-primary">
                    <Plus className="h-4 w-4 text-primary" />
                    + Enroll New Student (Instant ID)
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Enroll New Student Manually</DialogTitle>
                    <DialogDescription className="text-xs">
                      Enrolls student with instant account activation (no proof of payment required).
                    </DialogDescription>
                  </DialogHeader>

                  {generatedStudentInfo ? (
                    <div className="space-y-4 py-3">
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center space-y-2">
                        <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto" />
                        <h4 className="font-bold text-base text-foreground">Student Enrolled Successfully!</h4>
                        <div className="bg-background p-3 rounded-lg border font-mono text-sm space-y-1">
                          <p className="text-xs text-muted-foreground">Generated Student Number:</p>
                          <p className="text-lg font-bold text-primary">{generatedStudentInfo.studentNumber}</p>
                          <p className="text-xs text-muted-foreground mt-2">Login Email: {generatedStudentInfo.student.email}</p>
                        </div>
                      </div>
                      <Button onClick={() => { setOpenStudentModal(false); setGeneratedStudentInfo(null); }} className="w-full">
                        Done
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleAddStudent} className="space-y-3 py-2 text-xs">
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <Label>First Name *</Label>
                          <Input value={stuFirstName} onChange={(e) => setStuFirstName(e.target.value)} required />
                        </div>
                        <div className="space-y-1">
                          <Label>Last Name *</Label>
                          <Input value={stuLastName} onChange={(e) => setStuLastName(e.target.value)} required />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label>Email Address *</Label>
                        <Input type="email" value={stuEmail} onChange={(e) => setStuEmail(e.target.value)} required />
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <Label>Phone</Label>
                          <Input value={stuPhone} onChange={(e) => setStuPhone(e.target.value)} placeholder="+27..." />
                        </div>
                        <div className="space-y-1">
                          <Label>Grade</Label>
                          <Input value={stuGrade} onChange={(e) => setStuGrade(e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label>School</Label>
                        <Input value={stuSchool} onChange={(e) => setStuSchool(e.target.value)} placeholder="High School Name" />
                      </div>
                      <div className="space-y-1">
                        <Label>Assigned Plan</Label>
                        <Select value={stuPlan} onValueChange={(val: any) => setStuPlan(val)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 Subject">1 Subject (R300/mo)</SelectItem>
                            <SelectItem value="2 Subjects">2 Subjects (R550/mo)</SelectItem>
                            <SelectItem value="3 Subjects">3 Subjects (R750/mo)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Temporary Password</Label>
                        <Input type="password" value={stuPassword} onChange={(e) => setStuPassword(e.target.value)} placeholder="Default: password123" />
                      </div>
                      <DialogFooter className="pt-2">
                        <Button type="submit" className="w-full font-bold">Generate Student Number & Activate</Button>
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>

              {/* Upload Resource Modal (Subject Dropdown) */}
              <Dialog open={openResourceModal} onOpenChange={setOpenResourceModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2.5 h-11 text-xs font-bold hover:border-primary">
                    <UploadCloud className="h-4 w-4 text-primary" />
                    + Upload Learning Resource
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Learning Resource</DialogTitle>
                    <DialogDescription className="text-xs">
                      Select subject to publish notes or past papers exclusively to enrolled learners.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleUploadResource} className="space-y-3 py-2 text-xs">
                    <div className="space-y-1">
                      <Label>Subject (Select from offered subjects) *</Label>
                      <Select value={resSubject} onValueChange={setResSubject}>
                        <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                        <SelectContent>
                          {ACADEMY_SUBJECTS.map((sub) => (
                            <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label>Document / Topic Title *</Label>
                      <Input placeholder="e.g. Grade 11 Chemistry Chemical Change Notes" value={resTitle} onChange={(e) => setResTitle(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label>Description / Instructions</Label>
                      <Textarea placeholder="Overview of questions or theory covered..." value={resDesc} onChange={(e) => setResDesc(e.target.value)} rows={3} />
                    </div>
                    <div className="space-y-1">
                      <Label>Upload File (PDF / DOCX)</Label>
                      <Input type="file" onChange={(e) => e.target.files && setResFileName(e.target.files[0].name)} />
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="submit" className="w-full font-bold">Publish to Enrolled Students</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Schedule Calendar Session Modal */}
              <Dialog open={openScheduleModal} onOpenChange={setOpenScheduleModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2.5 h-11 text-xs font-bold hover:border-primary">
                    <Calendar className="h-4 w-4 text-primary" />
                    + Schedule Live Class (Teams Link)
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule Live Tutoring Class</DialogTitle>
                    <DialogDescription className="text-xs">
                      Set class time and provide the Microsoft Teams meeting link for students.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleScheduleSession} className="space-y-3 py-2 text-xs">
                    <div className="space-y-1">
                      <Label>Subject *</Label>
                      <Select value={sessionSubject} onValueChange={setSessionSubject}>
                        <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                        <SelectContent>
                          {ACADEMY_SUBJECTS.map((sub) => (
                            <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label>Topic / Lesson Title *</Label>
                      <Input placeholder="e.g. Maths: Functions & Inverses Revision" value={sessionTitle} onChange={(e) => setSessionTitle(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label>Tutor In Charge *</Label>
                      <Input value={tutorName} onChange={(e) => setTutorName(e.target.value)} placeholder="e.g. Mr. G. Moiane" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="space-y-1">
                        <Label>Date *</Label>
                        <Input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} required />
                      </div>
                      <div className="space-y-1">
                        <Label>Time Slot *</Label>
                        <Input placeholder="e.g. 10:00 - 11:30" value={sessionTime} onChange={(e) => setSessionTime(e.target.value)} required />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="flex items-center gap-1.5 font-bold text-primary">
                        <Video className="h-3.5 w-3.5" /> Microsoft Teams Meeting Link *
                      </Label>
                      <Input placeholder="https://teams.microsoft.com/l/meetup-join/..." value={teamsLink} onChange={(e) => setTeamsLink(e.target.value)} required />
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="submit" className="w-full font-bold">Publish to Student Timetables</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Link to="/staff/bookings" className="block w-full">
                <Button variant="outline" className="w-full justify-between h-11 text-xs font-bold hover:border-primary">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    1-on-1 Session Requests
                  </span>
                  {bookingRequestsCount > 0 && (
                    <Badge className="bg-primary text-primary-foreground text-[10px]">{bookingRequestsCount}</Badge>
                  )}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}

export default StaffDashboardPage;
