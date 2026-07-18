import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { C as Library } from "../_libs/lucide-react.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.library-BIN5HZEL.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
	title: "Library",
	description: "Notes, past papers, and study material.",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Library,
		title: "Library is empty",
		description: "Resources uploaded by your tutors will appear here for you to download."
	})
});
//#endregion
export { SplitComponent as component };
