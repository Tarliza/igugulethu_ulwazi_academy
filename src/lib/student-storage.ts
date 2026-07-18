// Lightweight client-side persistence for the registration → staff onboarding
// flow. Replace with Supabase-backed tables once the backend is wired up.

export type PendingRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  grade: string;
  school: string;
  plan: string;
  subjects: string[];
  submittedAt: string;
};

export type StudentProfile = {
  studentNumber: string;
  fullName: string;
  email: string;
  plan?: string;
  grade?: string;
  school?: string;
  phone?: string;
  subjects: string[];
  createdAt: string;
};

const PENDING_KEY = "igugulethu.pending_registrations";
const STUDENTS_KEY = "igugulethu.students";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getPendingRegistrations(): PendingRegistration[] {
  if (typeof window === "undefined") return [];
  return safeParse<PendingRegistration[]>(localStorage.getItem(PENDING_KEY), []);
}

export function addPendingRegistration(reg: PendingRegistration) {
  if (typeof window === "undefined") return;
  const existing = getPendingRegistrations().filter(
    (r) => r.email.toLowerCase() !== reg.email.toLowerCase(),
  );
  localStorage.setItem(PENDING_KEY, JSON.stringify([...existing, reg]));
}

export function findPendingRegistrationByEmail(
  email: string,
): PendingRegistration | undefined {
  const target = email.trim().toLowerCase();
  if (!target) return undefined;
  return getPendingRegistrations().find(
    (r) => r.email.toLowerCase() === target,
  );
}

export function getStudents(): StudentProfile[] {
  if (typeof window === "undefined") return [];
  return safeParse<StudentProfile[]>(localStorage.getItem(STUDENTS_KEY), []);
}

export function addStudent(student: StudentProfile) {
  if (typeof window === "undefined") return;
  const existing = getStudents().filter(
    (s) => s.email.toLowerCase() !== student.email.toLowerCase(),
  );
  localStorage.setItem(
    STUDENTS_KEY,
    JSON.stringify([...existing, student]),
  );
}
