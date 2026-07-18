import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { O as GraduationCap, y as Mail } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, t as SiteFooter } from "./SiteFooter-BySgwlrg.mjs";
import { t as supabase } from "./client-C0JvBYE6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-login-YRdbtJwH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentLogin() {
	const [studentNumber, setStudentNumber] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const studentNumberValue = studentNumber.trim();
		const passwordValue = password;
		const email = `${studentNumberValue.toLowerCase()}@student.igugulethu.local`;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password: passwordValue
		});
		if (error) alert("Invalid student number or password.");
		else navigate({ to: "/student" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-brand-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-md px-6 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-card p-8 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-14 w-14 place-items-center rounded-2xl bg-brand-navy text-brand-amber",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-7 w-7" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-4 font-display text-2xl font-extrabold text-brand-navy",
									children: "Student Login"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Welcome back — let's keep learning."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex gap-3 rounded-2xl border border-brand-amber/40 bg-brand-cream/60 p-4 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 h-5 w-5 shrink-0 text-brand-navy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-brand-navy/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-brand-navy",
									children: "First time signing in?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1",
									children: "Your student number and password are emailed to you by the Igugulethu team once your proof of payment has been verified. Check your inbox (and spam folder) for your login credentials."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-8 space-y-4",
							onSubmit: handleSubmit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block text-sm font-semibold text-brand-navy",
									children: "Student number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: studentNumber,
									onChange: (e) => setStudentNumber(e.target.value),
									placeholder: "RA-2026-0001",
									className: "w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block text-sm font-semibold text-brand-navy",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "w-full rounded-full bg-brand-amber px-6 py-3 text-sm font-bold text-brand-navy shadow-soft transition hover:brightness-105",
									children: "Sign in"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-center text-sm text-muted-foreground",
							children: [
								"New here?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/subscription",
									className: "font-semibold text-brand-navy hover:underline",
									children: "Choose a plan to sign up"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { StudentLogin as component };
