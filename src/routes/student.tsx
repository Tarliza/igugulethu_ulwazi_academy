import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { BookOpen, Calendar, GraduationCap, HelpCircle, Library, CalendarPlus, CreditCard, MessageSquare, LayoutGrid, User, Layers } from "lucide-react";
import { PortalShell, type PortalNavItem } from "@/components/portal/PortalShell";

const nav: PortalNavItem[] = [
  { label: "Dashboard", to: "/student", icon: LayoutGrid },
  { label: "My Subjects", to: "/student/subjects", icon: Layers },
  { label: "Teaching Plan", to: "/student/plan", icon: BookOpen },
  { label: "Grades", to: "/student/grades", icon: GraduationCap },
  { label: "Timetable", to: "/student/timetable", icon: Calendar },
  { label: "Quizzes", to: "/student/quizzes", icon: HelpCircle },
  { label: "Library", to: "/student/library", icon: Library },
  { label: "Book a Class", to: "/student/book", icon: CalendarPlus },
  { label: "Payment", to: "/student/payment", icon: CreditCard },
  { label: "Communication", to: "/student/messages", icon: MessageSquare },
  { label: "Profile", to: "/student/profile", icon: User },
];

const titles: Record<string, string> = {
  "/student": "Dashboard",
  "/student/subjects": "My Subjects",
  "/student/plan": "Teaching Plan",
  "/student/grades": "Grades",
  "/student/timetable": "Timetable",
  "/student/quizzes": "Quizzes",
  "/student/library": "Library",
  "/student/book": "Book a Class",
  "/student/payment": "Payment",
  "/student/messages": "Communication",
  "/student/profile": "Profile Settings",
};

export const Route = createFileRoute("/student")({
  head: () => ({
    meta: [
      { title: "Student Portal — Igugulethu Ulwazi Academy" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StudentLayout,
});

function StudentLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const pageTitle = titles[pathname] ?? "Dashboard";

  return (
    <PortalShell
      portalName="Student Portal"
      variant="student"
      nav={nav}
      pageTitle={pageTitle}
      user={{ name: "Thabo Mbeki", subtitle: "Grade 11 Student", initials: "TM" }}
    >
      <Outlet />
    </PortalShell>
  );
}
