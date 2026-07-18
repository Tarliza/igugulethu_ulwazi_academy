import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { X as BookOpen } from "../_libs/lucide-react.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.plan-CeycvIfB.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
	title: "Teaching Plan",
	description: "Your tutor's roadmap for each subject.",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: BookOpen,
		title: "No teaching plan yet",
		description: "Your tutor will publish the term's teaching plan here once your subjects are active."
	})
});
//#endregion
export { SplitComponent as component };
