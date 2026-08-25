
export interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  grade: string;
  school: string;
  subjects: string[];
  plan: string;
  amount: string;
  password?: string;
  proofOfPaymentUrl?: string;
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
  plan: string;
  amount: string;
  password?: string;
  status: "Active" | "Pending" | "Overdue";
  enrolledAt: string;
}

export interface Resource {
  id: string;
  title: string;
  subject: string;
  description: string;
  fileName?: string;
  fileUrl?: string;
  uploadedAt: string;
}

export interface Booking {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
}

const REGISTRATIONS_KEY = "igugulethu_registrations";
const STUDENTS_KEY = "igugulethu_students";
const RESOURCES_KEY = "igugulethu_resources";
const BOOKINGS_KEY = "igugulethu_bookings";
const CURRENT_STUDENT_KEY = "igugulethu_current_student";

// Seed initial data if empty
function initializeStorage() {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(REGISTRATIONS_KEY)) {
    const initialRegistrations: Registration[] = [
      {
        id: "reg-1",
        fullName: "Kuhle Ngam",
        email: "kuhlengam65@gmail.com",
        phone: "0687921613",
        grade: "Grade 11",
        school: "Kenilworth",
        subjects: ["Mathematics", "Life Sciences"],
        plan: "2 Subjects",
        amount: "R550",
        password: "password123",
        proofOfPaymentName: "WhatsApp Image 2026-02-08.jpeg",
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      {
        id: "reg-2",
        fullName: "Daniel Moiane",
        email: "moiane158@gmail.com",
        phone: "0712345678",
        grade: "Grade 12",
        school: "Kimberley High",
        subjects: ["Physical Sciences", "Mathematics"],
        plan: "2 Subjects",
        amount: "R550",
        password: "password123",
        proofOfPaymentName: "EFT_Proof_Daniel.pdf",
        status: "pending",
        createdAt: new Date().toISOString(),
      }
    ];
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(initialRegistrations));
  }

  if (!localStorage.getItem(STUDENTS_KEY)) {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify([]));
  }

  if (!localStorage.getItem(RESOURCES_KEY)) {
    localStorage.setItem(RESOURCES_KEY, JSON.stringify([]));
  }

  if (!localStorage.getItem(BOOKINGS_KEY)) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify([]));
  }
}

export function getRegistrations(): Registration[] {
  if (typeof window === "undefined") return [];
  initializeStorage();
  try {
    const data = localStorage.getItem(REGISTRATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
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
    password: reg.password || "password123",
    status: "Active",
    enrolledAt: new Date().toISOString(),
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

export function getStudents(): Student[] {
  if (typeof window === "undefined") return [];
  initializeStorage();
  try {
    const data = localStorage.getItem(STUDENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function addStudentDirectly(student: Omit<Student, "id" | "studentNumber" | "enrolledAt">): Student {
  const students = getStudents();
  const year = new Date().getFullYear();
  const studentNum = "STU" + year + String(students.length + 1).padStart(3, "0");
  const newStudent: Student = {
    ...student,
    id: "stu-" + Date.now(),
    studentNumber: studentNum,
    enrolledAt: new Date().toISOString(),
  };
  students.unshift(newStudent);
  if (typeof window !== "undefined") {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }
  return newStudent;
}

export function getResources(): Resource[] {
  if (typeof window === "undefined") return [];
  initializeStorage();
  try {
    const data = localStorage.getItem(RESOURCES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
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

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  initializeStorage();
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function addBooking(booking: Omit<Booking, "id" | "createdAt">): Booking {
  const bookings = getBookings();
  const newBooking: Booking = {
    ...booking,
    id: "book-" + Date.now(),
    createdAt: new Date().toISOString(),
  };
  bookings.unshift(newBooking);
  if (typeof window !== "undefined") {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }
  return newBooking;
}

export function verifyStudentLogin(identifier: string, pass: string): { success: boolean; student?: Student; error?: string } {
  const cleanId = identifier.trim().toLowerCase();
  const students = getStudents();
  const student = students.find(
    (s) => s.studentNumber.toLowerCase() === cleanId || s.email.toLowerCase() === cleanId
  );

  if (student) {
    if (!student.password || student.password === pass) {
      if (typeof window !== "undefined") {
        localStorage.setItem(CURRENT_STUDENT_KEY, JSON.stringify(student));
      }
      return { success: true, student };
    }
    return { success: false, error: "Incorrect password. Please try again." };
  }

  // Check if they are in pending registrations
  const pending = getPendingRegistrations();
  const isPending = pending.some(
    (p) => p.email.toLowerCase() === cleanId
  );

  if (isPending) {
    return {
      success: false,
      error: "Your registration is still pending verification. Our staff will verify your payment and email your student number shortly.",
    };
  }

  return { success: false, error: "Invalid student number or email address." };
}

export function getCurrentStudent(): Student | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(CURRENT_STUDENT_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

export function studentSignOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CURRENT_STUDENT_KEY);
  }
}
