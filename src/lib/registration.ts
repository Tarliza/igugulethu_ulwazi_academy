import { supabase } from "@/integrations/client";
import { ACADEMY_SUBJECTS, Plan } from "@/lib/student-storage";

export interface SubmitRegistrationInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  grade: string;
  school: string;
  plan: Plan;
  subjects: string[];
  proofFile: File;
}

export async function submitRegistration(input: SubmitRegistrationInput) {
  const allowed = new Set<string>(ACADEMY_SUBJECTS);
  if (input.subjects.some((subject) => !allowed.has(subject))) {
    throw new Error("One or more selected subjects are invalid.");
  }

  const expectedCount = input.plan === "1 Subject" ? 1 : input.plan === "3 Subjects" ? 3 : 2;
  if (input.subjects.length !== expectedCount) {
    throw new Error(`Please select exactly ${expectedCount} subject${expectedCount === 1 ? "" : "s"}.`);
  }

  const form = new FormData();
  form.set("firstName", input.firstName);
  form.set("lastName", input.lastName);
  form.set("email", input.email);
  form.set("phone", input.phone);
  form.set("grade", input.grade);
  form.set("school", input.school);
  form.set("plan", input.plan);
  form.set("subjects", JSON.stringify(input.subjects));
  form.set("proof", input.proofFile, input.proofFile.name);
  form.set("website", "");

  const { data, error } = await supabase.functions.invoke("submit-registration", { body: form });
  if (error) throw new Error(error.message || "We could not submit your application.");
  if (!data?.success) throw new Error(data?.error || "We could not submit your application.");
  return data as { success: true; registrationId: string; proofFileName: string; message: string };
}
