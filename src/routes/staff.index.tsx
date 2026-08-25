
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
import {
  getPendingRegistrations,
  getStudents,
  getResources,
  addResource,
  addStudentDirectly,
  Registration,
  Student
} from "@/lib/student-storage";
import {
  Users,
  Clock,
  CreditCard,
  BookOpen,
  Plus,
  UploadCloud,
  Send,
  ArrowRight,
  UserCheck,
  Calendar,
  MessageSquare,
  FileText
} from "lucide-react";

export const Route = createFileRoute("/staff/")({
  component: StaffDashboardPage,
});

export function StaffDashboardPage() {
  const [pending, setPending] = useState<Registration[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [resourceCount, setResourceCount] = useState(0);

  // Quick Action Dialogs
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openResourceModal, setOpenResourceModal] = useState(false);

  // Resource Form
  const [resTitle, setResTitle] = useState("");
  const [resSubject, setResSubject] = useState("Mathematics");
  const [resDesc, setResDesc] = useState("");

  // Student Form
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  const loadDashboardData = () => {
    const pend = getPendingRegistrations();
    const stu = getStudents();
    const res = getResources();
    setPending(pend);
    setStudents(stu);
    setResourceCount(res.length);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleUploadResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle) return;
    addResource({
      title: resTitle,
      subject: resSubject,
      description: resDesc,
      fileName: resTitle.toLowerCase().replace(/\s+/g, "_") + ".pdf",
    });
    setResTitle("");
    setResDesc("");
    setOpenResourceModal(false);
    loadDashboardData();
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) return;
    addStudentDirectly({
      fullName: studentName,
      email: studentEmail,
      phone: "0000000000",
      grade: "Grade 11",
      school: "Academy",
      subjects: ["Mathematics", "Physical Sciences"],
      plan: "2 Subjects",
      amount: "R550",
      status: "Active",
    });
    setStudentName("");
    setStudentEmail("");
    setOpenStudentModal(false);
    loadDashboardData();
  };

  return (
    <PortalShell role="staff">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Staff Overview Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Welcome back. Review student registrations, publish learning modules, and manage operations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/staff/verifications">
              <Button variant="outline" size="sm" className="gap-1.5">
                <UserCheck className="h-4 w-4" />
                Verifications ({pending.length})
              </Button>
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Enrolled</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">{students.length}</div>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">Active registered learners</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-amber-500/30 bg-amber-500/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-medium text-amber-700">Pending Registrations</CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-amber-700">{pending.length}</div>
              <p className="text-[11px] sm:text-xs text-amber-600/80 mt-1">Awaiting proof verification</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Outstanding Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">ZAR 0</div>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">Module coming soon</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Active Resources</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">{resourceCount}</div>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">Files shared with students</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Pending Registrations Activity */}
          <Card className="lg:col-span-2 shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg">Recent Registration Activity</CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-0.5">Proof of payments requiring staff approval</CardDescription>
              </div>
              <Link to="/staff/verifications">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary">
                  Review all <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {pending.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <p>No pending student registrations.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {pending.slice(0, 4).map((reg) => (
                    <div key={reg.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-sm">{reg.fullName}</p>
                        <p className="text-xs text-muted-foreground">{reg.email} • {reg.grade} • {reg.plan}</p>
                      </div>
                      <Link to="/staff/verifications">
                        <Button size="sm" variant="outline" className="text-xs">
                          Inspect
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
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-xs">Manage students, modules, and communications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Add Student Modal */}
              <Dialog open={openStudentModal} onOpenChange={setOpenStudentModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2.5 h-11 text-sm">
                    <Plus className="h-4 w-4 text-primary" />
                    Enroll New Student
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enroll New Student</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddStudent} className="space-y-3 py-2">
                    <div className="space-y-1">
                      <Label>Full Name</Label>
                      <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label>Email</Label>
                      <Input type="email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} required />
                    </div>
                    <Button type="submit" className="w-full mt-2">Activate Student Account</Button>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Upload Resource Modal */}
              <Dialog open={openResourceModal} onOpenChange={setOpenResourceModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2.5 h-11 text-sm">
                    <UploadCloud className="h-4 w-4 text-primary" />
                    Upload Resource
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Learning Resource</DialogTitle>
                    <DialogDescription>Share study notes, past papers, or worksheets.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleUploadResource} className="space-y-3 py-2">
                    <div className="space-y-1">
                      <Label>Resource Title</Label>
                      <Input placeholder="e.g. Grade 11 Trigonometry Notes" value={resTitle} onChange={(e) => setResTitle(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label>Subject</Label>
                      <Input placeholder="e.g. Mathematics" value={resSubject} onChange={(e) => setResSubject(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label>Description</Label>
                      <Textarea placeholder="Short overview of the file content..." value={resDesc} onChange={(e) => setResDesc(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full mt-2">Publish to Student Library</Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Link to="/staff/bookings" className="block w-full">
                <Button variant="outline" className="w-full justify-start gap-2.5 h-11 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  Schedule Calendar Session
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}
