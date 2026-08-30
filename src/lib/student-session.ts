import { supabase } from "@/integrations/client";

export type StudentSession = {
  id: string;
  user_id: string;
  student_number: string;
  full_name: string;
  email: string;
  phone: string | null;
  grade: string | null;
  school: string | null;
  subjects: string[];
  plan: string | null;
  amount: string | null;
  status: string;
  enrolled_at: string;
  payment_status: string | null;
  access_until: string | null;
};

export async function getStudentByUserId(userId: string) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  return { student: data as StudentSession | null, error };
}

export function setCurrentStudentSnapshot(student: StudentSession) {
  if (typeof window === "undefined") return;
  // UI convenience only. Authorization/data access never relies on this snapshot.
  sessionStorage.setItem("igugulethu_active_student_snapshot", JSON.stringify(student));
}

export function clearCurrentStudentSnapshot() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem("igugulethu_active_student_snapshot");
}
