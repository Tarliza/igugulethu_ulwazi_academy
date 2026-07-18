import { f as Outlet, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { C as Library, E as Layers, G as CalendarPlus, L as CircleQuestionMark, N as CreditCard, O as GraduationCap, T as LayoutGrid, W as Calendar, X as BookOpen, h as MessageSquare, r as User } from "../_libs/lucide-react.mjs";
import { t as PortalShell } from "./PortalShell-DmLpi1xy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-B1GVeIRi.js
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		label: "Dashboard",
		to: "/student",
		icon: LayoutGrid
	},
	{
		label: "My Subjects",
		to: "/student/subjects",
		icon: Layers
	},
	{
		label: "Teaching Plan",
		to: "/student/plan",
		icon: BookOpen
	},
	{
		label: "Grades",
		to: "/student/grades",
		icon: GraduationCap
	},
	{
		label: "Timetable",
		to: "/student/timetable",
		icon: Calendar
	},
	{
		label: "Quizzes",
		to: "/student/quizzes",
		icon: CircleQuestionMark
	},
	{
		label: "Library",
		to: "/student/library",
		icon: Library
	},
	{
		label: "Book a Class",
		to: "/student/book",
		icon: CalendarPlus
	},
	{
		label: "Payment",
		to: "/student/payment",
		icon: CreditCard
	},
	{
		label: "Communication",
		to: "/student/messages",
		icon: MessageSquare
	},
	{
		label: "Profile",
		to: "/student/profile",
		icon: User
	}
];
var titles = {
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
	"/student/profile": "Profile Settings"
};
function StudentLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		portalName: "Student Portal",
		variant: "student",
		nav,
		pageTitle: titles[useRouterState({ select: (s) => s.location.pathname })] ?? "Dashboard",
		user: {
			name: "Thabo Mbeki",
			subtitle: "Grade 11 Student",
			initials: "TM"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { StudentLayout as component };
