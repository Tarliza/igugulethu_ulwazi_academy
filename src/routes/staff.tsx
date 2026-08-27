import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/client";

export const Route = createFileRoute("/staff")({
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw redirect({ to: "/staff-login" });

    const { data: roleData, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error || !roleData || !["staff", "admin"].includes(roleData.role)) {
      await supabase.auth.signOut();
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
