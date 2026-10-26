import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/client";

export const Route = createFileRoute("/staff")({
  beforeLoad: async () => {
    // Supabase browser sessions live in localStorage; SSR has no access to them.
    // Defer this guard to the browser rather than redirecting valid users during SSR.
    if (typeof window === "undefined") return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw redirect({ to: "/staff-login" });

    const { data: roleData, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error) {
      // A temporary database/RLS/network failure must not destroy a valid auth session.
      console.error("[staff-route] role verification failed", {
        code: error.code ?? "UNKNOWN",
        message: error.message,
      });
      throw new Error("We couldn't verify your staff access right now. Please refresh to try again.");
    }

    if (!roleData || !["staff", "admin"].includes(roleData.role)) {
      // Deny access without signing out; this keeps auth state intact for a safe retry.
      throw redirect({ to: "/staff-login" });
    }
  },
  head: () => ({
    meta: [
      { title: "Staff Portal — Igugulethu Ulwazi Academy" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StaffLayout,
});

function StaffLayout() {
  return <Outlet />;
}
