import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as Users } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff.students-BbgfDMno.js
var import_jsx_runtime = require_jsx_runtime();
function StudentRoster() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
		title: "Student Roster",
		description: "All approved and active students appear here.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "bg-brand-navy text-white hover:bg-brand-navy-deep",
			children: "Add Student"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Users,
			title: "No students enrolled yet",
			description: "Approved students will appear here with their subjects, tutors, and payment status."
		})
	});
}
//#endregion
export { StudentRoster as component };
