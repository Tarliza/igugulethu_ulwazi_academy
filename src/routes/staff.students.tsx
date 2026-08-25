
import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  getStudents,
  addStudentDirectly,
  updateStudentStatus,
  deleteStudent,
  addStudentGrade,
  getStudentAverage,
  Student,
  ACADEMY_SUBJECTS
} from "@/lib/student-storage";
import {
  Users,
  Plus,
  Search,
  BookOpen,
  Mail,
  Phone,
  School,
  Award,
  Trash2,
  Lock,
  Unlock,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";

export const Route = createFileRoute("/staff/students")({
  component: StaffStudentsPage,
});

export function StaffStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals
  const [gradeModalStudent, setGradeModalStudent] = useState<Student | null>(null);
  const [testTitle, setTestTitle] = useState("");
  const [testSubject, setTestSubject] = useState<string>("Mathematics");
  const [testScore, setTestScore] = useState("");
  const [testMax, setTestMax] = useState("100");
  const [tutorFeedback, setTutorFeedback] = useState("");

  const loadData = () => {
    setStudents(getStudents());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCaptureGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradeModalStudent || !testTitle || !testScore) return;

    addStudentGrade(gradeModalStudent.id, {
      assessment: testTitle,
      subject: testSubject,
      score: parseFloat(testScore) || 0,
      maxScore: parseFloat(testMax) || 100,
      tutorFeedback: tutorFeedback || "Solid effort. Continue practicing past exam questions.",
    });

    setTestTitle("");
    setTestScore("");
    setTutorFeedback("");
    setGradeModalStudent(null);
    loadData();
  };

  const handleToggleStatus = (student: Student) => {
    const newStatus = student.status === "Active" ? "Access Denied" : "Active";
    updateStudentStatus(student.id, newStatus);
    loadData();
  };

  const handleDelete = (studentId: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the active student roster?`)) {
      deleteStudent(studentId);
      loadData();
    }
  };

  const filtered = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PortalShell role="staff" title="Student Management Roster">
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Active Student Roster</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage student accounts, capture test marks, monitor 30-day payment standing, and adjust portal access.
            </p>
          </div>
          <Link to="/staff">
            <Button size="sm" className="gap-2 font-bold">
              <Plus className="h-4 w-4" /> Enroll New Student
            </Button>
          </Link>
        </div>

        {/* Search Filter */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Student Number (STU...), name, or email..."
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <Card className="text-center py-12 border-dashed">
            <CardContent className="space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">No students found</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Approve pending applications from the Verifications tab or enroll a student manually from the Dashboard.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((stu) => {
              const avg = getStudentAverage(stu);
              const isDenied = stu.status === "Access Denied" || stu.status === "Payment Overdue";

              return (
                <Card key={stu.id} className={`shadow-sm border transition-all ${isDenied ? "border-red-300 bg-red-50/20" : "hover:border-primary/40"}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Badge variant="outline" className="font-mono text-xs font-bold text-primary bg-primary/10 mb-1.5">
                          {stu.studentNumber}
                        </Badge>
                        <CardTitle className="text-base font-bold">{stu.fullName}</CardTitle>
                        <CardDescription className="text-xs flex items-center gap-1 mt-0.5">
                          <Mail className="h-3 w-3" /> {stu.email}
                        </CardDescription>
                      </div>
                      <Badge className={isDenied ? "bg-red-500/15 text-red-700 border-red-500/30 text-xs" : "bg-green-500/15 text-green-700 border-green-500/30 text-xs"}>
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
                        <span className="text-muted-foreground">Average:</span>{" "}
                        <span className={`font-bold ${avg > 0 ? "text-green-600" : "text-muted-foreground"}`}>{avg > 0 ? `${avg}%` : "No marks yet"}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Plan:</span> <span className="font-semibold">{stu.plan}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fee:</span> <span className="font-semibold text-primary">{stu.amount}/mo</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-muted-foreground block mb-1">Enrolled Subjects:</span>
                      <div className="flex flex-wrap gap-1">
                        {stu.subjects.map((sub) => (
                          <Badge key={sub} variant="secondary" className="text-[11px] font-normal py-0">
                            {sub}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 border-t flex flex-col gap-1.5">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setGradeModalStudent(stu);
                          setTestSubject(stu.subjects[0] || "Mathematics");
                        }}
                        className="w-full justify-center gap-1.5 text-xs font-bold"
                      >
                        <Award className="h-3.5 w-3.5 text-primary" /> Capture Test Marks
                      </Button>

                      <div className="flex gap-1.5">
                        <Button
                          type="button"
                          size="sm"
                          variant={isDenied ? "default" : "secondary"}
                          onClick={() => handleToggleStatus(stu)}
                          className="flex-1 text-[11px] font-semibold gap-1"
                        >
                          {isDenied ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                          {isDenied ? "Grant Access" : "Restrict (Overdue)"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(stu.id, stu.fullName)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-[11px] p-2"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Capture Test Marks Modal */}
        <Dialog open={!!gradeModalStudent} onOpenChange={(open) => !open && setGradeModalStudent(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Capture Student Test Marks</DialogTitle>
              <DialogDescription className="text-xs">
                Enter test score and tutor feedback for <strong>{gradeModalStudent?.fullName}</strong> ({gradeModalStudent?.studentNumber}).
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCaptureGrade} className="space-y-3.5 py-2 text-xs">
              <div className="space-y-1">
                <Label>Subject *</Label>
                <Select value={testSubject} onValueChange={setTestSubject}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {gradeModalStudent?.subjects.map((sub) => (
                      <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Assessment Name *</Label>
                <Input placeholder="e.g. Term 1 Control Test or Revision Quiz 2" value={testTitle} onChange={(e) => setTestTitle(e.target.value)} required />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <Label>Student Mark (Score) *</Label>
                  <Input type="number" placeholder="e.g. 78" value={testScore} onChange={(e) => setTestScore(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label>Total Out Of *</Label>
                  <Input type="number" placeholder="100" value={testMax} onChange={(e) => setTestMax(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Tutor Feedback / Comments</Label>
                <Textarea placeholder="e.g. Great grasp of Calculus fundamentals. Revise Geometry proofs." value={tutorFeedback} onChange={(e) => setTutorFeedback(e.target.value)} rows={3} />
              </div>

              <DialogFooter className="pt-2">
                <Button type="submit" className="w-full font-bold">Save & Publish to Student Portal</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </PortalShell>
  );
}

export default StaffStudentsPage;
