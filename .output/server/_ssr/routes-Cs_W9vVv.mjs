import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { D as Hash, J as Calculator, R as CircleCheck, U as ChartColumn, X as BookOpen, Y as Briefcase, et as Atom, f as ScrollText, j as Earth, l as Sparkles, n as Users, s as TrendingUp, tt as ArrowRight, w as Leaf } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, t as SiteFooter } from "./SiteFooter-BySgwlrg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cs_W9vVv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_students_default = "/assets/hero-students-BN79srCV.jpg";
var hero_image2_default = "/assets/hero-image2-h6Wu8Ypi.png";
var hero_image3_default = "/assets/hero-image3-BDyarr4v.png";
var hero_image4_default = "/assets/hero-image4-BKGcMY4H.png";
var subjects = [
	{
		name: "Physical Sciences",
		icon: Atom,
		tone: "navy"
	},
	{
		name: "Mathematics",
		icon: Calculator,
		tone: "amber"
	},
	{
		name: "Mathematical Literacy",
		icon: Hash,
		tone: "navy"
	},
	{
		name: "Economics",
		icon: ChartColumn,
		tone: "amber"
	},
	{
		name: "Business Studies",
		icon: Briefcase,
		tone: "navy"
	},
	{
		name: "History",
		icon: ScrollText,
		tone: "amber"
	},
	{
		name: "Geography",
		icon: Earth,
		tone: "navy"
	},
	{
		name: "Life Sciences",
		icon: Leaf,
		tone: "amber"
	}
];
var stats = [
	{
		value: "95%",
		label: "PASS RATE",
		tone: "navy"
	},
	{
		value: "500+",
		label: "STUDENTS HELPED",
		tone: "amber"
	},
	{
		value: "8+",
		label: "SUBJECTS COVERED",
		tone: "navy"
	},
	{
		value: "A+",
		label: "GRADE GUARANTEE",
		tone: "amber"
	}
];
var bullets = [
	{
		icon: CircleCheck,
		text: "Personalised tutor-led sessions tailored to your pace"
	},
	{
		icon: TrendingUp,
		text: "Proven teaching approach that consistently delivers A grades"
	},
	{
		icon: Users,
		text: "Small group settings for focused, effective learning"
	},
	{
		icon: BookOpen,
		text: "Access to curated study resources and past papers"
	}
];
function LandingPage() {
	const slides = [
		hero_students_default,
		hero_image2_default,
		hero_image3_default,
		hero_image4_default
	];
	const [current, setCurrent] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5e3);
		return () => clearInterval(id);
	}, []);
	const go = (i) => setCurrent((i + slides.length) % slides.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-brand-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0",
					children: [slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: s,
						alt: "Hero",
						className: `absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`,
						width: 1920,
						height: 1280
					}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-b from-brand-navy/80 via-brand-navy/70 to-brand-navy/80" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex min-h-150 max-w-5xl flex-col items-center justify-center px-6 py-24 text-center text-white sm:min-h-170",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-brand-amber/60 bg-brand-amber/10 px-5 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-amber",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " GUARANTEED A GRADES"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 font-display text-4xl font-black leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: "CHANGE LIVES."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-brand-amber",
									children: "INSPIRE DREAMS."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: "PUSH LIMITS."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-2xl text-base text-white/85 sm:text-lg",
							children: "Expert tutors, comprehensive resources, and a proven teaching approach — all designed to unlock your full academic potential."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/subscription",
							className: "mt-10 inline-flex items-center gap-2 rounded-full bg-brand-amber px-8 py-4 text-sm font-bold text-brand-navy shadow-card transition hover:brightness-105 sm:text-base",
							children: ["View Subscriptions", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-14 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-8 rounded-full bg-brand-amber" }), slides.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": `Go to slide ${i + 1}`,
								onClick: () => go(i),
								className: `h-2 w-2 rounded-full ${i === current ? "bg-brand-amber" : "bg-white/40"}`
							}, i))]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-6 py-20 lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-block rounded-full bg-brand-amber-soft px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-navy",
					children: "WHY CHOOSE US"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-12 lg:grid-cols-2 lg:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl",
							children: [
								"Worried about your ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-brand-amber",
									children: "academic results?"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-[15px] leading-relaxed text-muted-foreground",
							children: [
								"We understand the pressure students face. That's why",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-brand-navy",
									children: "Igugulethu Ulwazi Academy"
								}),
								" ",
								"provides expert tutors, comprehensive resources, and a teaching approach that ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-brand-navy",
									children: "guarantees A Grades."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[15px] leading-relaxed text-muted-foreground",
							children: "Whether it's exam preparation, concept mastery, or regular weekly support — we meet learners where they are and take them where they need to be."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 space-y-4",
							children: bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-amber-soft text-brand-amber",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-brand-navy",
									children: b.text
								})]
							}, b.text))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-5 self-center",
						children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-3xl p-8 text-center shadow-card ${s.tone === "navy" ? "bg-brand-navy text-white" : "bg-brand-amber text-brand-navy"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-4xl font-black sm:text-5xl",
								children: s.value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-2 text-[11px] font-bold tracking-[0.15em] ${s.tone === "navy" ? "text-brand-amber" : "text-brand-navy/70"}`,
								children: s.label
							})]
						}, s.label))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-6 pb-16 lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block rounded-full bg-brand-amber-soft px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-navy",
						children: "OUR SUBJECTS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl",
						children: "Master every subject that matters"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4",
					children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex flex-col items-center gap-4 rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:shadow-card ${s.tone === "navy" ? "bg-muted" : "bg-brand-amber-soft/50"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `grid h-14 w-14 place-items-center rounded-2xl text-white shadow-soft ${s.tone === "navy" ? "bg-brand-navy" : "bg-brand-amber"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold text-brand-navy",
							children: s.name
						})]
					}, s.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-6 pb-20 lg:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-3xl bg-linear-to-r from-brand-navy via-brand-navy to-brand-navy-deep p-8 sm:p-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-amber/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display text-2xl font-extrabold text-white sm:text-3xl",
							children: ["Ready to unlock your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand-amber",
								children: "full potential?"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-white/70",
							children: "Join hundreds of learners already achieving A grades with us."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/login",
							className: "inline-flex items-center gap-2 rounded-full bg-brand-amber px-7 py-3.5 text-sm font-bold text-brand-navy shadow-card transition hover:brightness-105",
							children: ["Get Started Today", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { LandingPage as component };
