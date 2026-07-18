import { n as __toESM } from "../_runtime.mjs";
import { t as logo_default } from "./logo-B3I47etB.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { _ as Menu, m as Phone, t as X, v as MapPin, y as Mail } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-BySgwlrg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Logo({ variant = "dark", className = "" }) {
	const textColor = variant === "light" ? "text-white" : "text-brand-navy";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-3 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: logo_default,
			alt: "Igugulethu Ulwazi Academy",
			className: "h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-black/10",
			width: 44,
			height: 44
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `font-display text-sm font-extrabold tracking-wide ${textColor}`,
				children: "IGUGULETHU ULWAZI"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-bold tracking-[0.2em] text-brand-amber",
				children: "ACADEMY"
			})]
		})]
	});
}
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 bg-brand-cream/90 backdrop-blur border-b border-border/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "text-sm font-medium text-brand-navy/80 transition hover:text-brand-navy",
							children: "About Us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/subscription",
							className: "text-sm font-medium text-brand-navy/80 transition hover:text-brand-navy",
							children: "Subscriptions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "text-sm font-medium text-brand-navy/80 transition hover:text-brand-navy",
							children: "Contact Us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/student-login",
							className: "text-sm font-medium text-brand-navy/80 transition hover:text-brand-navy",
							children: "Student Login"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/staff-login",
							className: "text-sm font-medium text-brand-navy/80 transition hover:text-brand-navy",
							children: "Staff Login"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/student-signup",
							className: "inline-flex items-center rounded-full bg-brand-amber px-6 py-2.5 text-sm font-semibold text-brand-navy shadow-soft transition hover:brightness-105",
							children: "Sign Up"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen((v) => !v),
					className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-white md:hidden",
					"aria-label": "Toggle menu",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border/60 bg-brand-cream md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-accent",
						children: "About Us"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/subscription",
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-accent",
						children: "Subscriptions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-accent",
						children: "Contact Us"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/student-login",
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-accent",
						children: "Student Login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/staff-login",
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-accent",
						children: "Staff Login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/student-signup",
						onClick: () => setOpen(false),
						className: "mt-1 rounded-full bg-brand-amber px-4 py-2.5 text-center text-sm font-semibold text-brand-navy",
						children: "Sign Up"
					})
				]
			})
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-brand-navy-deep text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3 lg:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { variant: "light" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xs text-sm text-white/70",
					children: "Expert tutors, curated resources, and a proven approach that guarantees A grades."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs font-bold tracking-[0.2em] text-brand-amber",
					children: "SUBJECTS OFFERED"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Physical Sciences" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Mathematics" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Math Literacy" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Economics" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Business Studies" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "History" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Geography" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Life Sciences" })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs font-bold tracking-[0.2em] text-brand-amber",
					children: "CONTACT US"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-sm text-white/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-brand-amber" }), " 067 148 6015"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-brand-amber" }), " moiane158@gmail.com"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-brand-amber" }), " Johannesburg,\xA0 South Africa"]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-4 text-xs text-white/50 lg:px-10",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Igugulethu Ulwazi Academy. All rights reserved."
				]
			})
		})]
	});
}
//#endregion
export { SiteHeader as n, SiteFooter as t };
