import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { d as Send, h as MessageSquare } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.messages-DlO_lPe8.js
var import_jsx_runtime = require_jsx_runtime();
function StudentMessages() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageCard, {
		title: "Communication",
		description: "Chat with your tutors and the academy.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: MessageSquare,
			title: "No conversations yet",
			description: "Start a conversation with your tutor — replies will appear here."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-6 flex items-center gap-2",
			onSubmit: (e) => e.preventDefault(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "Type a message to your tutor…" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "bg-brand-navy text-white hover:bg-brand-navy-deep",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
			})]
		})]
	});
}
//#endregion
export { StudentMessages as component };
