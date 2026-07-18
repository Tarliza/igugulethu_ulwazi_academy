import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { O as GraduationCap } from "../_libs/lucide-react.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.grades-DuGcM2-N.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
	title: "Grades",
	description: "Assessment and quiz results across your subjects.",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: GraduationCap,
		title: "No grades recorded",
		description: "Once you complete quizzes or assignments, your results will appear here."
	})
});
//#endregion
export { SplitComponent as component };
