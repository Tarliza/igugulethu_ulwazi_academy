import { createFileRoute, Outlet, useRouterState, redirect } from "@tanstack/react-router";
import { LayoutGrid, Users, FolderOpen, CalendarDays, MessageSquare, UserCheck } from "lucide-react";
import { PortalShell, type PortalNavItem } from "@/components/portal/PortalShell";
import { supabase } from "@/integrations/client";

const nav: PortalNavItem[] = [
  { label: "Dashboard", to: "/staff", icon: LayoutGrid },
  { label: "Verifications", to: "/staff/verifications", icon: UserCheck },
  { label: "Student Roster", to: "/staff/students", icon: Users },
  { label: "Resources", to: "/staff/resources", icon: FolderOpen },
  { label: "Bookings", to: "/staff/bookings", icon: CalendarDays },
  { label: "Messages", to: "/staff/messages", icon: MessageSquare },
];

const titles: Record<string, string> = {
  "/staff": "Administrative Dashboard",
  "/staff/verifications": "Pending Verifications",
  "/staff/students": "Student Roster",
  "/staff/resources": "Resources",
  "/staff/bookings": "Bookings",
  "/staff/messages": "Messages",
};

export const Route = createFileRoute("/staff")({
  // --- NEW SECURITY BOUNCER ---
  beforeLoad: async () => {
    // 1. Check if the user is logged into Supabase
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw redirect({ to: "/staff-login" });
    }

    // 2. Check if they have the 'staff' or 'admin' role in the database
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .single();

    if (!roleData || (roleData.role !== "staff" && roleData.role !== "admin")) {
      // If they are logged in but don't have the right role, kick them out
      throw redirect({ to: "/staff-login" });
    }
  },
  // -----------------------------
  head: () => ({
    meta: [
      { title: "Staff Portal — Igugulethu Ulwazi Academy" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StaffLayout,
});

function StaffLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const pageTitle = titles[pathname] ?? "Administrative Dashboard";

  return (
    <PortalShell
      portalName="Tutor Portal"
      variant="tutor"
      nav={nav}
      pageTitle={pageTitle}
      user={{ name: "Gabriel Moiane", subtitle: "Academy Admin", initials: "GM" }}
    >
      <Outlet />
    </PortalShell>
  );
}