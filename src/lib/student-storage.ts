import { supabase } from "@/integrations/client";

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
export type Plan = "1 Subject" | "2 Subjects" | "3 Subjects";
export type StudentStatus = "Active" | "Access Denied" | "Payment Overdue";

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
  plan: Plan;
  amount: string;
  proofOfPaymentName?: string;
  proofOfPaymentPath?: string;
  status: "pending" | "approved" | "rejected";
  studentNumber?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  userId?: string;
  studentNumber: string;
  fullName: string;
  email: string;
  phone: string;
  grade: string;
  school: string;
  subjects: string[];
  plan: Plan;
  amount: string;
  status: StudentStatus;
  paymentStatus?: string;
  accessUntil?: string | null;
  enrolledAt: string;
  grades: StudentGrade[];
}

export interface Resource {
  id: string;
  title: string;
  subject: string;
  description: string;
  fileName: string;
  filePath?: string;
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
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

type Db = any;
const db = supabase as Db;

const registrationsCache: Registration[] = [];
const studentsCache: Student[] = [];
const resourcesCache: Resource[] = [];
const scheduleCache: ScheduleEvent[] = [];
const bookingsCache: TutorBooking[] = [];
const announcementsCache: Announcement[] = [];
let currentStudentCache: Student | null = null;
let hydrationStarted = false;

function emitDataChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("academy-data-updated"));
  }
}

function uuid() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizePlan(value: string | null | undefined): Plan {
  if (value === "1-subject" || value === "1 Subject") return "1 Subject";
  if (value === "3-subjects" || value === "3 Subjects") return "3 Subjects";
  return "2 Subjects";
}

function normalizeStatus(value: string | null | undefined): StudentStatus {
  if (value === "Access Denied" || value === "Payment Overdue") return value;
  return "Active";
}

function mapGrade(row: any): StudentGrade {
  return {
    id: row.id,
    assessment: row.assessment_name,
    subject: row.subject,
    score: Number(row.score),
    maxScore: Number(row.max_score),
    tutorFeedback: row.tutor_feedback ?? undefined,
    date: new Date(row.created_at).toLocaleDateString("en-ZA", { month: "short", day: "numeric", year: "numeric" }),
  };
}

function mapStudent(row: any, grades: StudentGrade[] = []): Student {
  return {
    id: row.id,
    userId: row.user_id,
    studentNumber: row.student_number,
    fullName: row.full_name ?? "Student",
    email: row.email ?? "",
    phone: row.phone ?? "",
    grade: row.grade ?? "",
    school: row.school ?? "",
    subjects: Array.isArray(row.subjects) ? row.subjects : [],
    plan: normalizePlan(row.plan),
    amount: row.amount ?? (normalizePlan(row.plan) === "1 Subject" ? "R300" : normalizePlan(row.plan) === "3 Subjects" ? "R750" : "R550"),
    status: normalizeStatus(row.status),
    paymentStatus: row.payment_status,
    accessUntil: row.access_until,
    enrolledAt: row.enrolled_at ?? row.created_at,
    grades,
  };
}

async function hydrate() {
  if (typeof window === "undefined" || hydrationStarted) return;
  hydrationStarted = true;

  try {
    const [{ data: registrations }, { data: students }, { data: resources }, { data: sessions }, { data: bookings }, { data: announcements }] = await Promise.all([
      db.from("pending_registrations").select("*").order("submitted_at", { ascending: false }),
      db.from("students").select("*").order("created_at", { ascending: false }),
      db.from("resources").select("*").order("created_at", { ascending: false }),
      db.from("live_sessions").select("*").order("session_date", { ascending: true }),
      db.from("tutor_bookings").select("*, students(full_name, student_number)").order("created_at", { ascending: false }),
      db.from("announcements").select("*").order("created_at", { ascending: false }),
    ]);

    if (Array.isArray(registrations)) {
      registrationsCache.splice(0, registrationsCache.length, ...registrations.map((r: any) => ({
        id: r.id,
        fullName: `${r.first_name} ${r.last_name}`.trim(),
        email: r.email,
        phone: r.phone ?? "",
        grade: r.grade ?? "",
        school: r.school ?? "",
        subjects: r.subjects ?? [],
        plan: normalizePlan(r.plan),
        amount: r.amount ?? "",
        proofOfPaymentName: r.proof_of_payment_path?.split("/").pop(),
        proofOfPaymentPath: r.proof_of_payment_path ?? undefined,
        status: r.status === "activated" || r.status === "approved" ? "approved" : r.status === "rejected" ? "rejected" : "pending",
        createdAt: r.submitted_at ?? r.created_at,
      })));
    }

    if (Array.isArray(students)) {
      const studentIds = students.map((s: any) => s.id);
      const { data: grades } = studentIds.length
        ? await db.from("student_grades").select("*").in("student_id", studentIds).order("created_at", { ascending: false })
        : { data: [] };
      const byStudent = new Map<string, StudentGrade[]>();
      (grades ?? []).forEach((g: any) => {
        const list = byStudent.get(g.student_id) ?? [];
        list.push(mapGrade(g));
        byStudent.set(g.student_id, list);
      });
      studentsCache.splice(0, studentsCache.length, ...students.map((s: any) => mapStudent(s, byStudent.get(s.id) ?? [])));

      const snapshot = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("igugulethu_active_student_snapshot") : null;
      if (snapshot) {
        try {
          const parsed = JSON.parse(snapshot) as { id?: string; user_id?: string };
          const fresh = studentsCache.find((s) => s.id === parsed.id || s.userId === parsed.user_id);
          if (fresh) {
            currentStudentCache = currentStudentCache ?? fresh;
            Object.assign(currentStudentCache, fresh);
          }
        } catch {
          // Ignore a malformed UI-only snapshot.
        }
      }
    }

    if (Array.isArray(resources)) {
      resourcesCache.splice(0, resourcesCache.length, ...resources.map((r: any) => ({
        id: r.id,
        title: r.title,
        subject: r.subject ?? "All Subjects",
        description: r.description ?? "",
        fileName: r.file_path?.split("/").pop() ?? r.file_path,
        filePath: r.file_path,
        uploadedBy: r.uploaded_by ?? "Staff",
        uploadedAt: r.created_at,
      })));
    }

    if (Array.isArray(sessions)) {
      scheduleCache.splice(0, scheduleCache.length, ...sessions.map((s: any) => ({
        id: s.id,
        title: s.title,
        subject: s.subject,
        tutorName: s.tutor_name,
        teamsLink: s.teams_link,
        date: s.session_date,
        time: s.time_slot,
        notes: s.notes ?? undefined,
        createdAt: s.created_at,
      })));
    }

    if (Array.isArray(bookings)) {
      bookingsCache.splice(0, bookingsCache.length, ...bookings.map((b: any) => ({
        id: b.id,
        studentId: b.student_id,
        studentName: b.students?.full_name ?? "Student",
        studentNumber: b.students?.student_number ?? "",
        subject: b.subject,
        date: b.booking_date,
        time: b.time_slot,
        notes: b.notes ?? undefined,
        status: b.status,
        createdAt: b.created_at,
      })));
    }

    if (Array.isArray(announcements)) {
      announcementsCache.splice(0, announcementsCache.length, ...announcements.map((a: any) => ({
        id: a.id,
        title: a.title,
        content: a.content,
        author: a.author,
        createdAt: a.created_at,
      })));
    }
  } catch (error) {
    console.error("[Academy] Failed to hydrate Supabase data", error);
  } finally {
    emitDataChanged();
  }
}

function ensureHydrated() {
  void hydrate();
}

export function getRegistrations(): Registration[] { ensureHydrated(); return registrationsCache; }
export function getPendingRegistrations(): Registration[] { ensureHydrated(); return registrationsCache.filter((r) => r.status === "pending"); }

export function addRegistration(reg: Omit<Registration, "id" | "status" | "createdAt">): Registration {
  const newReg: Registration = { ...reg, id: uuid(), status: "pending", createdAt: new Date().toISOString() };
  registrationsCache.unshift(newReg);
  void db.from("pending_registrations").insert({
    id: newReg.id,
    first_name: newReg.fullName.split(" ")[0] ?? newReg.fullName,
    last_name: newReg.fullName.split(" ").slice(1).join(" ") || "-",
    email: newReg.email,
    phone: newReg.phone,
    grade: newReg.grade,
    school: newReg.school,
    subjects: newReg.subjects,
    plan: newReg.plan,
    amount: newReg.amount,
    status: "pending",
    proof_of_payment_path: newReg.proofOfPaymentPath ?? newReg.proofOfPaymentName ?? null,
  }).then(({ error }: any) => {
    if (error) console.error("[Academy] Registration insert failed", error);
    else emitDataChanged();
  });
  emitDataChanged();
  return newReg;
}

export async function approveRegistration(registrationId: string): Promise<{ student: Student; studentNumber: string; password?: string } | null> {
  const { data, error } = await supabase.functions.invoke("activate-student", { body: { registrationId } });
  if (error || !data?.success) {
    console.error("[Academy] Activation failed", error ?? data?.error);
    return null;
  }
  await hydrate();
  const student = studentsCache.find((s) => s.studentNumber === data.studentNumber) ?? null;
  return student ? { student, studentNumber: data.studentNumber, password: data.password } : null;
}

export async function rejectRegistration(registrationId: string) {
  const { error } = await db.from("pending_registrations").update({ status: "rejected", reviewed_at: new Date().toISOString() }).eq("id", registrationId);
  if (error) throw error;
  const item = registrationsCache.find((r) => r.id === registrationId);
  if (item) item.status = "rejected";
  emitDataChanged();
}

export function getStudents(): Student[] { ensureHydrated(); return studentsCache; }

export async function addStudentDirectly(student: Omit<Student, "id" | "studentNumber" | "enrolledAt" | "grades">) {
  const { data, error } = await supabase.functions.invoke("create-student", { body: student });
  if (error || !data?.success) throw new Error(data?.error ?? error?.message ?? "Student creation failed");
  await hydrate();
  return studentsCache.find((s) => s.studentNumber === data.studentNumber) ?? null;
}

export async function updateStudentStatus(studentId: string, status: StudentStatus) {
  const { error } = await db.from("students").update({ status, updated_at: new Date().toISOString() }).eq("id", studentId);
  if (error) throw error;
  const student = studentsCache.find((s) => s.id === studentId);
  if (student) student.status = status;
  emitDataChanged();
}

export async function deleteStudent(studentId: string) {
  const { error } = await db.from("students").delete().eq("id", studentId);
  if (error) throw error;
  const index = studentsCache.findIndex((s) => s.id === studentId);
  if (index >= 0) studentsCache.splice(index, 1);
  emitDataChanged();
}

export function addStudentGrade(studentId: string, grade: Omit<StudentGrade, "id" | "date">) {
  const id = uuid();
  const createdAt = new Date().toISOString();
  void db.from("student_grades").insert({ id, student_id: studentId, subject: grade.subject, assessment_name: grade.assessment, score: grade.score, max_score: grade.maxScore, tutor_feedback: grade.tutorFeedback ?? null }).then(({ error }: any) => {
    if (error) console.error("[Academy] Grade insert failed", error);
    else void hydrate();
  });
  const student = studentsCache.find((s) => s.id === studentId);
  if (student) student.grades.unshift({ ...grade, id, date: new Date(createdAt).toLocaleDateString("en-ZA", { month: "short", day: "numeric", year: "numeric" }) });
  emitDataChanged();
}

export function getStudentAverage(student: Student | null): number {
  if (!student?.grades?.length) return 0;
  const total = student.grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0);
  return Math.round(total / student.grades.length);
}

export function getResources(): Resource[] { ensureHydrated(); return resourcesCache; }
export function getResourcesForStudent(studentSubjects: string[]): Resource[] {
  ensureHydrated();
  return resourcesCache.filter((r) => studentSubjects.includes(r.subject) || r.subject === "All Subjects");
}
export function addResource(res: Omit<Resource, "id" | "uploadedAt">): Resource {
  const resource: Resource = { ...res, id: uuid(), uploadedAt: new Date().toISOString() };
  resourcesCache.unshift(resource);
  void db.from("resources").insert({ id: resource.id, title: resource.title, subject: resource.subject, description: resource.description, file_path: resource.filePath ?? resource.fileName }).then(({ error }: any) => {
    if (error) console.error("[Academy] Resource insert failed", error);
    else emitDataChanged();
  });
  emitDataChanged();
  return resource;
}
export async function deleteResource(id: string) {
  const { error } = await db.from("resources").delete().eq("id", id);
  if (error) throw error;
  const index = resourcesCache.findIndex((r) => r.id === id);
  if (index >= 0) resourcesCache.splice(index, 1);
  emitDataChanged();
}

export function getScheduleEvents(): ScheduleEvent[] { ensureHydrated(); return scheduleCache; }
export function addScheduleEvent(event: Omit<ScheduleEvent, "id" | "createdAt">): ScheduleEvent {
  const item: ScheduleEvent = { ...event, id: uuid(), createdAt: new Date().toISOString() };
  scheduleCache.unshift(item);
  void db.from("live_sessions").insert({ id: item.id, title: item.title, subject: item.subject, tutor_name: item.tutorName, teams_link: item.teamsLink, session_date: item.date, time_slot: item.time, notes: item.notes ?? null }).then(({ error }: any) => {
    if (error) console.error("[Academy] Schedule insert failed", error);
    else emitDataChanged();
  });
  emitDataChanged();
  return item;
}

export function getTutorBookings(): TutorBooking[] { ensureHydrated(); return bookingsCache; }
export function addTutorBooking(booking: Omit<TutorBooking, "id" | "status" | "createdAt">): TutorBooking {
  const item: TutorBooking = { ...booking, id: uuid(), status: "pending", createdAt: new Date().toISOString() };
  bookingsCache.unshift(item);
  void db.from("tutor_bookings").insert({ id: item.id, student_id: item.studentId, subject: item.subject, booking_date: item.date, time_slot: item.time, notes: item.notes ?? null, status: "pending" }).then(({ error }: any) => {
    if (error) console.error("[Academy] Booking insert failed", error);
    else emitDataChanged();
  });
  emitDataChanged();
  return item;
}

export function getAnnouncements(): Announcement[] { ensureHydrated(); return announcementsCache; }
export function addAnnouncement(ann: Omit<Announcement, "id" | "createdAt">): Announcement {
  const item: Announcement = { ...ann, id: uuid(), createdAt: new Date().toISOString() };
  announcementsCache.unshift(item);
  void db.from("announcements").insert({ id: item.id, title: item.title, content: item.content, author: item.author }).then(({ error }: any) => {
    if (error) console.error("[Academy] Announcement insert failed", error);
    else emitDataChanged();
  });
  emitDataChanged();
  return item;
}

export function verifyStudentLogin(): { success: boolean; error?: string } {
  return { success: false, error: "Legacy password verification has been removed. Use Supabase Auth." };
}

export function getCurrentStudent(): Student | null {
  if (typeof window === "undefined") return null;
  ensureHydrated();
  if (currentStudentCache) return currentStudentCache;
  const snapshot = sessionStorage.getItem("igugulethu_active_student_snapshot");
  if (!snapshot) return null;
  try {
    currentStudentCache = JSON.parse(snapshot) as Student;
    return currentStudentCache;
  } catch {
    return null;
  }
}

export function studentSignOut() {
  currentStudentCache = null;
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("igugulethu_active_student_snapshot");
    void supabase.auth.signOut();
    emitDataChanged();
  }
}
