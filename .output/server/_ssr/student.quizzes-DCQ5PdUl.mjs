import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { L as CircleQuestionMark } from "../_libs/lucide-react.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.quizzes-DCQ5PdUl.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
	title: "Quizzes",
	description: "Practice quizzes and mini-tests set by your tutor.",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: CircleQuestionMark,
		title: "No quizzes available",
		description: "New quizzes will appear here as soon as your tutor publishes them."
	})
});
//#endregion
export { SplitComponent as component };
