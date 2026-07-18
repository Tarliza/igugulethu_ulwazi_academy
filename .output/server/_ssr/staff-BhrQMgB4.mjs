import { f as Outlet, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { K as CalendarDays, T as LayoutGrid, a as UserCheck, h as MessageSquare, k as FolderOpen, n as Users } from "../_libs/lucide-react.mjs";
import { t as PortalShell } from "./PortalShell-DmLpi1xy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-BhrQMgB4.js
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		label: "Dashboard",
		to: "/staff",
		icon: LayoutGrid
	},
	{
		label: "Verifications",
		to: "/staff/verifications",
		icon: UserCheck
	},
	{
		label: "Student Roster",
		to: "/staff/students",
		icon: Users
	},
	{
		label: "Resources",
		to: "/staff/resources",
		icon: FolderOpen
	},
	{
		label: "Bookings",
		to: "/staff/bookings",
		icon: CalendarDays
	},
	{
		label: "Messages",
		to: "/staff/messages",
		icon: MessageSquare
	}
];
var titles = {
	"/staff": "Administrative Dashboard",
	"/staff/verifications": "Pending Verifications",
	"/staff/students": "Student Roster",
	"/staff/resources": "Resources",
	"/staff/bookings": "Bookings",
	"/staff/messages": "Messages"
};
function StaffLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		portalName: "Tutor Portal",
		variant: "tutor",
		nav,
		pageTitle: titles[useRouterState({ select: (s) => s.location.pathname })] ?? "Administrative Dashboard",
		user: {
			name: "Gabriel Moiane",
			subtitle: "Academy Admin",
			initials: "GM"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { StaffLayout as component };
