import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { W as Calendar } from "../_libs/lucide-react.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.timetable-Cu-Fji4y.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
	title: "Timetable",
	description: "Your weekly class schedule.",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Calendar,
		title: "No timetable published",
		description: "Your weekly class times will appear here once your tutor confirms them."
	})
});
//#endregion
export { SplitComponent as component };
