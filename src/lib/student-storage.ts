
export const ACADEMY_SUBJECTS = [
  "Mathematics",
  "Physical Sciences",
  "Life Science",
  "Mathematical Literacy",
  "Economics",
  "Business Studies",
  "History",
  "Geography",
] as const;

export type AcademySubject = typeof ACADEMY_SUBJECTS[number];

export interface StudentGrade {
  id: string;
  assessment: string;
  subject: string;
  score: number;
  maxScore: number;
  tutorFeedback?: string;
  date: string;
}

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  grade: string;
  school: string;
  subjects: string[];
  plan: "1 Subject" | "2 Subjects" | "3 Subjects";
  amount: string;
  proofOfPaymentName?: string;
  status: "pending" | "approved" | "rejected";
  studentNumber?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  studentNumber: string;
  fullName: string;
  email: string;
  phone: string;
  grade: string;
  school: string;
  subjects: string[];
  plan: "1 Subject" | "2 Subjects" | "3 Subjects";
  amount: string;
  status: "Active" | "Access Denied" | "Payment Overdue";
  enrolledAt: string;
  grades: StudentGrade[];
}

export interface Resource {
  id: string;
  title: string;
  subject: string;
  description: string;
  fileName: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  subject: string;
  tutorName: string;
  teamsLink: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
}

export interface TutorBooking {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  subject: string;
  date: string;
  time: string;
  notes?: string;
  status: "pending" | "confirmed";
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const REGISTRATIONS_KEY = "igugulethu_registrations_v2";
const STUDENTS_KEY = "igugulethu_students_v2";
const RESOURCES_KEY = "igugulethu_resources_v2";
const SCHEDULE_KEY = "igugulethu_schedule_v2";
const BOOKINGS_KEY = "igugulethu_bookings_v2";
const ANNOUNCEMENTS_KEY = "igugulethu_announcements_v2";
const CURRENT_STUDENT_KEY = "igugulethu_active_student_v2";

function initializeStorage() {
  if (typeof window === "undefined") return;

  // Production safeguard: this legacy adapter must never seed demo students,
  // registrations, credentials, marks, or timetable data. The production data
  // source is Supabase. These empty collections only preserve compatibility
  // for legacy UI code until each feature is migrated.
  const emptyCollections: Array<[string, unknown[]]> = [
    [REGISTRATIONS_KEY, []],
    [STUDENTS_KEY, []],
    [RESOURCES_KEY, []],
    [SCHEDULE_KEY, []],
    [BOOKINGS_KEY, []],
    [ANNOUNCEMENTS_KEY, []],
  ];

  for (const [key, value] of emptyCollections) {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(value));
  }
}

// Registrations
export function getRegistrations(): Registration[] {
  if (typeof window === "undefined") return [];
  initializeStorage();
  try {
    const data = localStorage.getItem(REGISTRATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getPendingRegistrations(): Registration[] {
  return getRegistrations().filter((r) => r.status === "pending");
}

export function addRegistration(reg: Omit<Registration, "id" | "status" | "createdAt">): Registration {
  const registrations = getRegistrations();
  const newReg: Registration = {
    ...reg,
    id: "reg-" + Date.now(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  registrations.unshift(newReg);
  if (typeof window !== "undefined") {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
  }
  return newReg;
}

export function approveRegistration(registrationId: string): { student: Student; studentNumber: string } | null {
  const registrations = getRegistrations();
  const regIndex = registrations.findIndex((r) => r.id === registrationId);
  if (regIndex === -1) return null;

  const reg = registrations[regIndex];
  const students = getStudents();
  const year = new Date().getFullYear();
  const studentNum = "STU" + year + String(students.length + 1).padStart(3, "0");

  reg.status = "approved";
  reg.studentNumber = studentNum;
  registrations[regIndex] = reg;

  const newStudent: Student = {
    id: "stu-" + Date.now(),
    studentNumber: studentNum,
    fullName: reg.fullName,
    email: reg.email,
    phone: reg.phone,
    grade: reg.grade,
    school: reg.school,
    subjects: reg.subjects,
    plan: reg.plan,
    amount: reg.amount,
    status: "Active",
    enrolledAt: new Date().toISOString(),
    grades: [],
  };

  students.unshift(newStudent);

  if (typeof window !== "undefined") {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }

  return { student: newStudent, studentNumber: studentNum };
}

export function rejectRegistration(registrationId: string) {
  const registrations = getRegistrations();
  const regIndex = registrations.findIndex((r) => r.id === registrationId);
  if (regIndex !== -1) {
    registrations[regIndex].status = "rejected";
    if (typeof window !== "undefined") {
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
    }
  }
}

// Students
export function getStudents(): Student[] {
  if (typeof window === "undefined") return [];
  initializeStorage();
  try {
    const data = localStorage.getItem(STUDENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addStudentDirectly(student: Omit<Student, "id" | "studentNumber" | "enrolledAt" | "grades">): Student {
  const students = getStudents();
  const year = new Date().getFullYear();
  const studentNum = "STU" + year + String(students.length + 1).padStart(3, "0");
  const newStudent: Student = {
    ...student,
    id: "stu-" + Date.now(),
    studentNumber: studentNum,
    enrolledAt: new Date().toISOString(),
    grades: [],
  };
  students.unshift(newStudent);
  if (typeof window !== "undefined") {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }
  return newStudent;
}

export function updateStudentStatus(studentId: string, status: "Active" | "Access Denied" | "Payment Overdue") {
  const students = getStudents();
  const idx = students.findIndex((s) => s.id === studentId);
  if (idx !== -1) {
    students[idx].status = status;
    if (typeof window !== "undefined") {
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
    }
  }
}

export function deleteStudent(studentId: string) {
  const students = getStudents().filter((s) => s.id !== studentId);
  if (typeof window !== "undefined") {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }
}

export function addStudentGrade(studentId: string, grade: Omit<StudentGrade, "id" | "date">) {
  const students = getStudents();
  const idx = students.findIndex((s) => s.id === studentId);
  if (idx !== -1) {
    const newGrade: StudentGrade = {
      ...grade,
      id: "grade-" + Date.now(),
      date: new Date().toLocaleDateString("en-ZA", { month: "short", day: "numeric", year: "numeric" }),
    };
    if (!students[idx].grades) students[idx].grades = [];
    students[idx].grades.unshift(newGrade);
    if (typeof window !== "undefined") {
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
      // Update active student session if logged in
      const current = getCurrentStudent();
      if (current && current.id === studentId) {
        localStorage.setItem(CURRENT_STUDENT_KEY, JSON.stringify(students[idx]));
      }
    }
  }
}

export function getStudentAverage(student: Student | null): number {
  if (!student || !student.grades || student.grades.length === 0) return 0;
  const total = student.grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0);
  return Math.round(total / student.grades.length);
}

// Resources (Filtered strictly by enrolled subjects)
export function getResources(): Resource[] {
  if (typeof window === "undefined") return [];
  initializeStorage();
  try {
    const data = localStorage.getItem(RESOURCES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getResourcesForStudent(studentSubjects: string[]): Resource[] {
  const all = getResources();
  return all.filter((r) => studentSubjects.includes(r.subject) || r.subject === "All Subjects");
}

export function addResource(res: Omit<Resource, "id" | "uploadedAt">): Resource {
  const resources = getResources();
  const newRes: Resource = {
    ...res,
    id: "res-" + Date.now(),
    uploadedAt: new Date().toISOString(),
  };
  resources.unshift(newRes);
  if (typeof window !== "undefined") {
    localStorage.setItem(RESOURCES_KEY, JSON.stringify(resources));
  }
  return newRes;
}

export function deleteResource(id: string) {
  const resources = getResources().filter((r) => r.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(RESOURCES_KEY, JSON.stringify(resources));
  }
}

// Schedule & Calendar Sessions
export function getScheduleEvents(): ScheduleEvent[] {
  if (typeof window === "undefined") return [];
  initializeStorage();
  try {
    const data = localStorage.getItem(SCHEDULE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addScheduleEvent(event: Omit<ScheduleEvent, "id" | "createdAt">): ScheduleEvent {
  const events = getScheduleEvents();
  const newEvent: ScheduleEvent = {
    ...event,
    id: "sched-" + Date.now(),
    createdAt: new Date().toISOString(),
  };
  events.unshift(newEvent);
  if (typeof window !== "undefined") {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(events));
  }
  return newEvent;
}

// 1-on-1 Tutor Bookings (R750 Plan Only)
export function getTutorBookings(): TutorBooking[] {
  if (typeof window === "undefined") return [];
  initializeStorage();
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addTutorBooking(booking: Omit<TutorBooking, "id" | "status" | "createdAt">): TutorBooking {
  const bookings = getTutorBookings();
  const newBooking: TutorBooking = {
    ...booking,
    id: "book-" + Date.now(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  bookings.unshift(newBooking);
  if (typeof window !== "undefined") {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }
  return newBooking;
}

// Announcements
export function getAnnouncements(): Announcement[] {
  if (typeof window === "undefined") return [];
  initializeStorage();
  try {
    const data = localStorage.getItem(ANNOUNCEMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addAnnouncement(ann: Omit<Announcement, "id" | "createdAt">): Announcement {
  const list = getAnnouncements();
  const newAnn: Announcement = {
    ...ann,
    id: "ann-" + Date.now(),
    createdAt: new Date().toISOString(),
  };
  list.unshift(newAnn);
  if (typeof window !== "undefined") {
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(list));
  }
  return newAnn;
}

// Auth Verification
export function verifyStudentLogin(identifier: string, pass: string): { success: boolean; student?: Student; error?: string } {
  const cleanId = identifier.trim().toLowerCase();
  const students = getStudents();
  const student = students.find(
    (s) => s.studentNumber.toLowerCase() === cleanId || s.email.toLowerCase() === cleanId
  );

  if (student) {
    if (student.status === "Access Denied" || student.status === "Payment Overdue") {
      return {
        success: false,
        error: "Access denied due to outstanding payments. Please contact administration at moiane158@gmail.com or +27 67 148 6015 to restore your portal access.",
      };
    }

    if (!student.password || student.password === pass) {
      if (typeof window !== "undefined") {
        localStorage.setItem(CURRENT_STUDENT_KEY, JSON.stringify(student));
      }
      return { success: true, student };
    }
    return { success: false, error: "Incorrect password. Please verify and try again." };
  }

  const pending = getPendingRegistrations();
  const isPending = pending.some((p) => p.email.toLowerCase() === cleanId);
  if (isPending) {
    return {
      success: false,
      error: "Your registration is currently awaiting verification. Please check your email or contact the administration for your student credentials.",
    };
  }

  return { success: false, error: "No student account found with this student number or email address." };
}

export function getCurrentStudent(): Student | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(CURRENT_STUDENT_KEY);
    if (!data) return null;
    const stu: Student = JSON.parse(data);
    // Refresh student record from master storage
    const all = getStudents();
    const fresh = all.find((s) => s.id === stu.id);
    return fresh || stu;
  } catch {
    return null;
  }
}

export function studentSignOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CURRENT_STUDENT_KEY);
  }
}
