import { n as __toESM } from "../_runtime.mjs";
import { t as logo_default } from "./logo-B3I47etB.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { L as CircleQuestionMark, _ as Menu, t as X, x as LogOut } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PortalShell-DmLpi1xy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Two visual styles per the Figma designs:
*  - "tutor": deep-navy sidebar, white content area
*  - "student": light sidebar with amber active pill, cool content area
*/
function PortalShell({ portalName, variant, nav, user, children, pageTitle }) {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isTutor = variant === "tutor";
	const sidebarClass = isTutor ? "bg-brand-navy text-white" : "bg-white text-brand-navy border-r border-border";
	const activeClass = isTutor ? "bg-brand-amber text-brand-navy shadow-soft" : "bg-brand-amber text-brand-navy shadow-soft";
	const inactiveClass = isTutor ? "text-white/80 hover:bg-white/5 hover:text-white" : "text-brand-navy/80 hover:bg-muted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-brand-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `hidden w-64 shrink-0 flex-col justify-between px-4 py-6 md:flex ${sidebarClass}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 pb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logo_default,
						alt: "Logo",
						width: 72,
						height: 72,
						className: "h-18 w-18 rounded-full ring-2 ring-brand-amber/50 object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center leading-tight",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `font-display text-sm font-extrabold ${isTutor ? "text-white" : "text-brand-navy"}`,
								children: "Igugulethu Ulwazi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-bold tracking-widest text-brand-amber",
								children: "ACADEMY"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-1 text-[11px] ${isTutor ? "text-white/60" : "text-muted-foreground"}`,
								children: portalName
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "space-y-1.5",
					children: nav.map((item) => {
						const active = pathname === item.to || pathname.startsWith(item.to + "/");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${active ? activeClass : inactiveClass}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: item.label
							})]
						}, item.to);
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${inactiveClass}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Logout"]
				})]
			}),
			mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/50",
					onClick: () => setMobileOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: `absolute left-0 top-0 flex h-full w-72 flex-col justify-between px-4 py-6 ${sidebarClass}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/logo-CXk_pxsf.jpeg",
								alt: "",
								width: 36,
								height: 36,
								className: "h-9 w-9 rounded-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-display text-sm font-extrabold ${isTutor ? "text-white" : "text-brand-navy"}`,
								children: portalName
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMobileOpen(false),
							className: `grid h-9 w-9 place-items-center rounded-full ${isTutor ? "bg-white/10 text-white" : "bg-muted text-brand-navy"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "space-y-1.5",
						children: nav.map((item) => {
							const active = pathname === item.to || pathname.startsWith(item.to + "/");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								onClick: () => setMobileOpen(false),
								className: `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium ${active ? activeClass : inactiveClass}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), item.label]
							}, item.to);
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						onClick: () => setMobileOpen(false),
						className: `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium ${inactiveClass}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Logout"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 bg-brand-cream/90 px-4 py-4 backdrop-blur sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMobileOpen(true),
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-navy text-white md:hidden",
								"aria-label": "Open menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate font-display text-lg font-extrabold text-brand-navy sm:text-2xl",
								children: pageTitle
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden text-right sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold text-brand-navy",
									children: user.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: user.subtitle
								})]
							}), user.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: user.avatar,
								alt: "",
								width: 40,
								height: 40,
								className: "h-10 w-10 rounded-full object-cover ring-2 ring-brand-amber/50"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-full bg-brand-amber font-bold text-brand-navy",
								children: user.initials
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 p-4 sm:p-8",
						children
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "fixed bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-brand-navy text-white shadow-card transition hover:bg-brand-navy-deep",
						"aria-label": "Help",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-5 w-5" })
					})
				]
			})
		]
	});
}
//#endregion
export { PortalShell as t };
