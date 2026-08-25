
import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getStudents, addStudentDirectly, Student } from "@/lib/student-storage";
import { UserCheck, Users, Plus, Search, BookOpen, Mail, Phone, School, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/staff/students")({
  component: StaffStudentsPage,
});

export function StaffStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // New Student Form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("Grade 11");
  const [school, setSchool] = useState("");
  const [plan, setPlan] = useState("2 Subjects");

  const loadData = () => {
    setStudents(getStudents());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    addStudentDirectly({
      fullName,
      email,
      phone: phone || "0000000000",
      grade,
      school: school || "Academy",
      subjects: ["Mathematics", "Physical Sciences"],
      plan,
      amount: "R550",
      status: "Active",
    });

    setOpenModal(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setSchool("");
    loadData();
  };

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PortalShell role="staff">
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Student Management Roster</h1>
            <p className="text-muted-foreground text-sm mt-1">
              View and manage all enrolled students, their generated student numbers, and assigned subjects.
            </p>
          </div>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button className="gap-2 shrink-0">
                <Plus className="h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Enroll New Student</DialogTitle>
                <DialogDescription>Directly register and activate a student account.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddStudent} className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label>Full Name</Label>
                  <Input placeholder="e.g. Thandeka Ndlovu" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="student@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Phone Number</Label>
                    <Input placeholder="0681234567" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Grade</Label>
                    <Input placeholder="Grade 11" value={grade} onChange={(e) => setGrade(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>School</Label>
                  <Input placeholder="High School Name" value={school} onChange={(e) => setSchool(e.target.value)} />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="submit" className="w-full">Save & Generate Student ID</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student number, name, or email..."
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredStudents.length === 0 ? (
          <Card className="text-center py-12 border-dashed">
            <CardContent className="space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">No active students enrolled yet</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Go to the Pending Verifications page to approve registered applicants, or click &quot;Add Student&quot; above to create one.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link to="/staff/verifications">
                  <Button variant="default" size="sm" className="gap-1.5">
                    <UserCheck className="h-4 w-4" />
                    Review Pending Verifications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStudents.map((stu) => (
              <Card key={stu.id} className="shadow-sm border hover:border-primary/40 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge variant="outline" className="font-mono text-xs font-bold text-primary bg-primary/10 mb-1.5">
                        {stu.studentNumber}
                      </Badge>
                      <CardTitle className="text-base font-bold">{stu.fullName}</CardTitle>
                      <CardDescription className="text-xs flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3" />
                        {stu.email}
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-500/15 text-green-700 border-green-500/30 text-xs">
                      {stu.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2 bg-muted/40 p-2.5 rounded-lg">
                    <div>
                      <span className="text-muted-foreground">Grade:</span> <span className="font-semibold">{stu.grade}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">School:</span> <span className="font-semibold truncate block">{stu.school}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Subjects Enrolled:</span>
                    <div className="flex flex-wrap gap-1">
                      {stu.subjects.map((sub) => (
                        <Badge key={sub} variant="secondary" className="text-[11px] font-normal py-0">
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
