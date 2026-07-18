import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { H as Check, tt as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, t as SiteFooter } from "./SiteFooter-BySgwlrg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/subscription-CUMbMv7R.js
var import_jsx_runtime = require_jsx_runtime();
var plans = [
	{
		id: "1-subject",
		name: "1 Subject",
		price: "R300",
		tagline: "Perfect for focused improvement",
		highlight: false,
		features: [
			"1 subject of your choice",
			"Weekly live tutor sessions",
			"Access to study resources",
			"Practice quizzes & feedback"
		]
	},
	{
		id: "2-subjects",
		name: "2 Subjects",
		price: "R550",
		tagline: "Our most popular option",
		highlight: true,
		features: [
			"2 subjects of your choice",
			"Weekly live tutor sessions",
			"Full library & past papers",
			"Priority tutor messaging"
		]
	},
	{
		id: "3-subjects",
		name: "3 Subjects",
		price: "R750",
		tagline: "Best value for A-grade seekers",
		highlight: false,
		features: [
			"3 subjects of your choice",
			"Unlimited live tutor sessions",
			"Full library & past papers",
			"1-on-1 tutor bookings"
		]
	}
];
function SubscriptionPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-brand-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-6 py-20 lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-block rounded-full bg-brand-amber-soft px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-navy",
								children: "SUBSCRIPTION PLANS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl",
								children: "Choose the plan that fits you."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted-foreground",
								children: "Simple monthly pricing. Cancel anytime. A-grade support included."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-6 md:grid-cols-3",
						children: plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `relative flex flex-col rounded-3xl p-8 shadow-card transition hover:-translate-y-1 ${p.highlight ? "bg-brand-navy text-white" : "bg-card text-brand-navy border border-border"}`,
							children: [
								p.highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-amber px-3 py-1 text-[10px] font-bold tracking-widest text-brand-navy",
									children: "MOST POPULAR"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-extrabold",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `mt-1 text-sm ${p.highlight ? "text-white/70" : "text-muted-foreground"}`,
									children: p.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex items-baseline gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-5xl font-black",
										children: p.price
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-sm ${p.highlight ? "text-white/60" : "text-muted-foreground"}`,
										children: "/month"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-6 space-y-3 text-sm",
									children: p.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: `mt-0.5 h-4 w-4 shrink-0 ${p.highlight ? "text-brand-amber" : "text-brand-navy"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
									}, f))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/register",
									search: { plan: p.id },
									className: `mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${p.highlight ? "bg-brand-amber text-brand-navy hover:brightness-105" : "bg-brand-navy text-white hover:brightness-110"}`,
									children: ["Select plan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							]
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-10 text-center text-sm text-muted-foreground",
						children: [
							"Already have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/student-login",
								className: "font-semibold text-brand-navy hover:underline",
								children: "Sign in as a student"
							}),
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { SubscriptionPage as component };
