import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { F as Clock, I as CircleX, K as CalendarDays, c as Trash2, p as Plus, z as CircleCheckBig } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-C0JvBYE6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff.bookings-CqhM_uVW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BookingsPage() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const bookingsTable = supabase.from("bookings");
	const [title, setTitle] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [time, setTime] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		fetchBookings();
	}, []);
	const fetchBookings = async () => {
		try {
			const { data, error } = await bookingsTable.select("*").order("session_date", { ascending: true }).order("session_time", { ascending: true });
			if (error) throw error;
			setBookings(data || []);
		} catch (error) {
			console.error("Error fetching bookings:", error);
			toast.error("Failed to load bookings.");
		} finally {
			setLoading(false);
		}
	};
	const handleAddEvent = async (e) => {
		e.preventDefault();
		setSaving(true);
		try {
			const { error } = await bookingsTable.insert({
				subject: title + (notes ? ` - ${notes}` : ""),
				session_date: date,
				session_time: time,
				student_email: "Staff Event",
				status: "confirmed"
			});
			if (error) throw error;
			toast.success("Event added successfully!");
			setOpen(false);
			setTitle("");
			setDate("");
			setTime("");
			setNotes("");
			fetchBookings();
		} catch (error) {
			console.error(error);
			toast.error("Failed to save event.");
		} finally {
			setSaving(false);
		}
	};
	const updateStatus = async (id, newStatus) => {
		try {
			const { error } = await bookingsTable.update({ status: newStatus }).eq("id", id);
			if (error) throw error;
			toast.success(`Booking ${newStatus}.`);
			fetchBookings();
		} catch (error) {
			console.error(error);
			toast.error("Failed to update status.");
		}
	};
	const deleteBooking = async (id) => {
		if (!confirm("Are you sure you want to permanently delete this event?")) return;
		try {
			const { error } = await bookingsTable.delete().eq("id", id);
			if (error) throw error;
			toast.success("Event deleted.");
			fetchBookings();
		} catch (error) {
			console.error(error);
			toast.error("Failed to delete event.");
		}
	};
	const getStatusBadge = (status) => {
		switch (status) {
			case "confirmed": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700",
				children: "Confirmed"
			});
			case "cancelled": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700",
				children: "Cancelled"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-brand-amber/20 px-2.5 py-0.5 text-xs font-semibold text-brand-navy",
				children: "Pending"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
		title: "Bookings & Calendar",
		description: "Scheduled classes, tutor sessions, and school events.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "bg-brand-navy text-white hover:bg-brand-navy-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add Event"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-brand-navy",
					children: "Add Calendar Event"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Schedule a new class, meeting, or school event." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: handleAddEvent,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "title",
								children: "Event title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "title",
								value: title,
								onChange: (e) => setTitle(e.target.value),
								placeholder: "e.g. Grade 11 Maths – Trig Revision",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "date",
									children: "Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "date",
									type: "date",
									value: date,
									onChange: (e) => setDate(e.target.value),
									required: true
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "time",
									children: "Time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "time",
									type: "time",
									value: time,
									onChange: (e) => setTime(e.target.value),
									required: true
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "notes",
								children: "Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "notes",
								rows: 3,
								value: notes,
								onChange: (e) => setNotes(e.target.value),
								placeholder: "Optional agenda or link"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: saving,
							className: "bg-brand-navy text-white hover:bg-brand-navy-deep",
							children: saving ? "Saving..." : "Save event"
						})] })
					]
				})]
			})]
		}),
		children: !loading && bookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: CalendarDays,
			title: "No bookings yet",
			description: "Upcoming class bookings and requests from students will appear here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: bookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [getStatusBadge(booking.status), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mr-1 h-3 w-3" }), booking.session_time.substring(0, 5)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-brand-navy line-clamp-2",
						children: booking.subject
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-medium text-muted-foreground",
						children: new Date(booking.session_date).toLocaleDateString([], {
							weekday: "short",
							month: "short",
							day: "numeric"
						})
					}),
					booking.student_email !== "Staff Event" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: [
							"Requested by:",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-brand-navy",
								children: booking.student_email
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center gap-2 border-t border-border pt-4",
					children: [booking.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "flex-1 border-green-200 text-green-700 hover:bg-green-50",
						onClick: () => updateStatus(booking.id, "confirmed"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "mr-1 h-4 w-4" }), " Approve"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "flex-1 border-red-200 text-red-700 hover:bg-red-50",
						onClick: () => updateStatus(booking.id, "cancelled"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mr-1 h-4 w-4" }), " Decline"]
					})] }), booking.status !== "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						className: "w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10",
						onClick: () => deleteBooking(booking.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), " Remove Event"]
					})]
				})]
			}, booking.id))
		})
	});
}
//#endregion
export { BookingsPage as component };
