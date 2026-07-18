import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { H as Check, b as MailOpen, h as MessageSquare, y as Mail } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-C0JvBYE6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff.messages-0IyNNGZV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StaffMessages() {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		fetchMessages();
	}, []);
	const fetchMessages = async () => {
		try {
			const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			setMessages(data || []);
		} catch (error) {
			console.error("Error fetching messages:", error);
			toast.error("Failed to load messages.");
		} finally {
			setLoading(false);
		}
	};
	const markAsRead = async (id) => {
		try {
			const { error } = await supabase.from("messages").update({ is_read: true }).eq("id", id);
			if (error) throw error;
			setMessages(messages.map((msg) => msg.id === id ? {
				...msg,
				is_read: true
			} : msg));
			toast.success("Message marked as read.");
		} catch (error) {
			console.error("Error updating message:", error);
			toast.error("Failed to mark message as read.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
		title: "Messages",
		description: "Direct conversations between staff and students.",
		children: !loading && messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: MessageSquare,
			title: "No messages yet",
			description: "Incoming student messages will appear here so you can reply from one place."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4",
			children: messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex flex-col gap-4 rounded-xl border p-5 transition-all sm:flex-row sm:items-start ${msg.is_read ? "border-border bg-card opacity-70" : "border-brand-navy/40 bg-brand-cream/20 shadow-sm"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 hidden sm:block",
						children: msg.is_read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailOpen, { className: "h-5 w-5 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-brand-navy" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: `font-semibold ${msg.is_read ? "text-muted-foreground" : "text-brand-navy"}`,
									children: msg.subject
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whitespace-nowrap text-xs text-muted-foreground",
									children: new Date(msg.created_at).toLocaleString([], {
										dateStyle: "medium",
										timeStyle: "short"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs font-medium text-muted-foreground",
								children: ["From: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${msg.sender_email}`,
									className: "hover:underline hover:text-brand-navy",
									children: msg.sender_email
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `mt-2 text-sm ${msg.is_read ? "text-muted-foreground" : "text-foreground"}`,
								children: msg.content
							})
						]
					}),
					!msg.is_read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-2 sm:pt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => markAsRead(msg.id),
							className: "w-full sm:w-auto hover:bg-brand-navy hover:text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-2 h-4 w-4" }), " Mark as Read"]
						})
					})
				]
			}, msg.id))
		})
	});
}
//#endregion
export { StaffMessages as component };
