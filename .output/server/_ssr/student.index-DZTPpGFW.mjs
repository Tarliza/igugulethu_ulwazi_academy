import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { $ as Award, K as CalendarDays, X as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.index-DZTPpGFW.js
var import_jsx_runtime = require_jsx_runtime();
function StudentDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5 lg:col-span-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyCard, {
				icon: CalendarDays,
				title: "Today's Schedule",
				description: "No sessions scheduled yet. Your upcoming classes will appear here once your tutors publish the timetable."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyCard, {
				icon: BookOpen,
				title: "Continue Learning",
				description: "No lessons started yet. Once you begin a course, your progress will show up here."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyCard, {
				icon: Award,
				title: "Recent Grades",
				description: "No grades recorded. Complete a quiz or assignment to see your results here.",
				compact: true
			})
		})]
	});
}
function EmptyCard({ icon: Icon, title, description, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-card p-6 shadow-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-extrabold text-brand-navy",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `mt-4 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-brand-cream/40 text-center ${compact ? "p-6" : "p-10"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-12 w-12 place-items-center rounded-full bg-brand-amber-soft text-brand-navy",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted-foreground",
				children: description
			})]
		})]
	});
}
//#endregion
export { StudentDashboard as component };
