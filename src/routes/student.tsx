import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/client";

export const Route = createFileRoute("/student")({
  beforeLoad: async () => {
    // Supabase browser sessions live in localStorage; SSR has no access to them.
    // Defer this guard to the browser rather than redirecting valid users during SSR.
    if (typeof window === "undefined") return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw redirect({ to: "/student-login" });

    const { data: student, error } = await supabase
      .from("students")
      .select("id,status,user_id,student_number,full_name,email,phone,grade,school,subjects,plan,amount,enrolled_at")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error) {
      // Do not turn a transient query failure into a destructive sign-out.
      console.error("[student-route] student verification failed", {
        code: error.code ?? "UNKNOWN",
        message: error.message,
      });
      throw new Error("We couldn't verify your student access right now. Please refresh to try again.");
    }

    if (!student) {
      throw redirect({ to: "/student-login" });
    }

    if (student.status !== "Active") {
      // Allow the child UI to render the existing access-denied state if desired,
      // but never treat an inactive record as authenticated student data.
      throw redirect({ to: "/student-login" });
    }
  },
  head: () => ({
    meta: [
      { title: "Student Portal — Igugulethu Ulwazi Academy" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StudentLayout,
});

export function StudentLayout() {
  return <Outlet />;
}
