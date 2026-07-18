import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { X as BookOpen } from "../_libs/lucide-react.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.subjects-Iqf2p0Bm.js
var import_jsx_runtime = require_jsx_runtime();
var subjects = [];
function MySubjects() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
			title: "My Subjects",
			description: "The subjects included in your active subscription plan.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: "bg-brand-amber-soft text-brand-navy hover:bg-brand-amber-soft",
				children: "No active plan"
			}),
			children: subjects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: BookOpen,
				title: "No subjects yet",
				description: "Once your registration is approved, the subjects from your plan (1, 2, or 3) will appear here."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-background p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 place-items-center rounded-xl bg-brand-amber text-brand-navy",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 font-display text-base font-extrabold text-brand-navy",
							children: s.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: ["Tutor: ", s.tutor]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-xs",
							children: ["Next: ", s.nextClass]
						})
					]
				}, s.name))
			})
		})
	});
}
//#endregion
export { MySubjects as component };
