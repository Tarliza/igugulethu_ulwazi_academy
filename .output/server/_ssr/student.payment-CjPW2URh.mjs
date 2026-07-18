import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { N as CreditCard, o as Upload } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.payment-CjPW2URh.js
var import_jsx_runtime = require_jsx_runtime();
function PaymentPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:col-span-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
				title: "Payment history",
				description: "Every invoice and proof of payment you have submitted.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: CreditCard,
					title: "No payments recorded",
					description: "Your payment history will show up here once your first invoice is generated."
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
			title: "Submit proof of payment",
			description: "Upload a screenshot or PDF of your EFT / deposit.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: "bg-brand-amber-soft text-brand-navy hover:bg-brand-amber-soft",
				children: "Pending"
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-4",
				onSubmit: (e) => e.preventDefault(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-dashed border-border bg-brand-cream/40 p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mx-auto h-6 w-6 text-brand-navy" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "PNG, JPG or PDF up to 10 MB"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							className: "mt-3 w-full text-xs"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full bg-brand-navy text-white hover:bg-brand-navy-deep",
					children: "Submit for review"
				})]
			})
		}) })]
	});
}
//#endregion
export { PaymentPage as component };
