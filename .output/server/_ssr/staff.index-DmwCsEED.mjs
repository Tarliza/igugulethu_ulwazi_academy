import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { F as Clock, H as Check, N as CreditCard, X as BookOpen, Z as Bell, d as Send, g as MessageCircle, h as MessageSquare, i as UserPlus, n as Users, o as Upload, q as CalendarClock, tt as ArrowRight, y as Mail } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-C0JvBYE6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BWInSfTu.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as objectType, r as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff.index-DmwCsEED.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var activateStudentAccount = createServerFn({ method: "POST" }).validator(objectType({ registrationId: stringType() })).handler(createSsrRpc("ffc20378f5eb091fd032d20ee416a314002c6194bd88eda6e8ff3a98241806cd"));
var sendReminderEmails = createServerFn({ method: "POST" }).validator(objectType({
	recipients: arrayType(objectType({
		email: stringType(),
		name: stringType(),
		amount: stringType()
	})),
	messageTemplate: stringType()
})).handler(createSsrRpc("9b3631870f244f1cf831731ac37bf3d80405d4f4d767853b2d6e37e76ef37c75"));
var overdueStudents = [{
	id: "test-1",
	name: "Gabriel Moiane",
	email: "moiane158@gmail.com",
	plan: "Grade 12 Premium",
	amount: "ZAR 450",
	daysOverdue: 3
}];
var newMessages = [];
var bookingRequests = [];
function StaffDashboard() {
	const [reminderOpen, setReminderOpen] = (0, import_react.useState)(false);
	const [addStudentOpen, setAddStudentOpen] = (0, import_react.useState)(false);
	const [stats, setStats] = (0, import_react.useState)({
		totalStudents: 0,
		pendingRegs: 0
	});
	const [pendingFeed, setPendingFeed] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		async function fetchDashboardStats() {
			try {
				const { count: studentCount } = await supabase.from("students").select("*", {
					count: "exact",
					head: true
				});
				const { count: pendingCount, data: pendingData } = await supabase.from("pending_registrations").select("*", { count: "exact" }).eq("status", "pending").order("created_at", { ascending: false }).limit(3);
				setStats({
					totalStudents: studentCount || 0,
					pendingRegs: pendingCount || 0
				});
				if (pendingData) setPendingFeed(pendingData.map((reg) => ({
					id: reg.id,
					title: `${reg.first_name} ${reg.last_name}`,
					subtitle: reg.email,
					time: new Date(reg.created_at || reg.submitted_at || Date.now()).toLocaleDateString()
				})));
			} catch (error) {
				console.error("Failed to load dashboard stats", error);
			}
		}
		fetchDashboardStats();
	}, []);
	const dynamicKpis = [
		{
			label: "Total Enrolled Learners",
			value: stats.totalStudents.toString(),
			meta: stats.totalStudents === 1 ? "1 active student" : `${stats.totalStudents} active students`,
			icon: Users,
			tone: "navy"
		},
		{
			label: "Pending Registrations",
			value: stats.pendingRegs.toString(),
			meta: stats.pendingRegs === 1 ? "1 waiting for activation" : `${stats.pendingRegs} waiting for activation`,
			icon: Clock,
			tone: "amber"
		},
		{
			label: "Outstanding Payments",
			value: "ZAR 0",
			meta: "Module coming soon",
			icon: CreditCard,
			tone: "amber"
		},
		{
			label: "Active Resources",
			value: "0",
			meta: "Module coming soon",
			icon: BookOpen,
			tone: "navy"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentReminderDialog, {
				open: reminderOpen,
				onOpenChange: setReminderOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddStudentDialog, {
				open: addStudentOpen,
				onOpenChange: setAddStudentOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4",
				children: dynamicKpis.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `relative overflow-hidden rounded-3xl bg-card p-6 shadow-card ${k.tone === "navy" ? "border-l-4 border-brand-navy" : "border-l-4 border-brand-amber"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid h-11 w-11 place-items-center rounded-2xl ${k.tone === "navy" ? "bg-brand-navy text-white" : "bg-brand-amber text-brand-navy"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(k.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 text-sm text-muted-foreground",
							children: k.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-display text-3xl font-extrabold text-brand-navy",
							children: k.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-xs text-muted-foreground",
							children: k.meta
						})
					]
				}, k.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-card p-6 shadow-soft lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-extrabold text-brand-navy",
							children: "Recent Activity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Proof of payments, new student messages, and booking requests will appear here as they come in."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-3 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityFeed, {
									icon: UserPlus,
									title: "Pending Registrations",
									emptyText: "No pending registrations right now.",
									linkTo: "/staff/verifications",
									linkLabel: "Review all",
									items: pendingFeed
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityFeed, {
									icon: MessageSquare,
									title: "New Messages",
									emptyText: "No new messages from students.",
									linkTo: "/staff/messages",
									linkLabel: "Open inbox",
									items: newMessages
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityFeed, {
									icon: CalendarClock,
									title: "Booking Requests",
									emptyText: "No pending booking requests.",
									linkTo: "/staff/bookings",
									linkLabel: "View calendar",
									items: bookingRequests
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-card p-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-extrabold text-brand-navy",
						children: "Quick Actions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setAddStudentOpen(true),
								className: "flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-brand-navy transition hover:bg-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }),
									" Add New Student",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto text-[10px] font-normal uppercase text-muted-foreground",
										children: "emails credentials"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/staff/resources",
								className: "flex w-full items-center gap-3 rounded-xl bg-brand-amber-soft px-4 py-3 text-sm font-medium text-brand-navy transition hover:brightness-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), " Upload Resource"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setReminderOpen(true),
								className: "flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-brand-navy transition hover:bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), " Send Payment Reminders"]
							})
						]
					})]
				})]
			})
		]
	});
}
function ActivityFeed({ icon: Icon, title, emptyText, linkTo, linkLabel, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col rounded-2xl border border-border bg-brand-cream/40 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-9 w-9 place-items-center rounded-xl bg-brand-amber-soft text-brand-navy",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold text-brand-navy",
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex-1",
				children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: emptyText
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: items.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-background px-3 py-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-brand-navy",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground",
								children: item.subtitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-[10px] uppercase text-muted-foreground",
								children: item.time
							})
						]
					}, item.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: linkTo,
				className: "mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-navy hover:underline",
				children: [
					linkLabel,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })
				]
			})
		]
	});
}
function PaymentReminderDialog({ open, onOpenChange }) {
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [channels, setChannels] = (0, import_react.useState)({
		email: true,
		sms: false
	});
	const [message, setMessage] = (0, import_react.useState)("Hi {name}, this is a friendly reminder that your Igugulethu Ulwazi Academy subscription payment of {amount} is overdue. Please upload your proof of payment via the student portal. Thank you!");
	const [sending, setSending] = (0, import_react.useState)(false);
	const allSelected = overdueStudents.length > 0 && selected.length === overdueStudents.length;
	const toggleAll = () => {
		setSelected(allSelected ? [] : overdueStudents.map((s) => s.id));
	};
	const toggleOne = (id) => {
		setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
	};
	const handleSend = async () => {
		if (selected.length === 0) {
			toast.error("Select at least one student to remind.");
			return;
		}
		if (!channels.email && !channels.sms) {
			toast.error("Choose at least one channel (email or SMS).");
			return;
		}
		setSending(true);
		try {
			const recipients = overdueStudents.filter((student) => selected.includes(student.id)).map((student) => ({
				email: student.email,
				name: student.name,
				amount: student.amount
			}));
			if (channels.email) {
				const result = await sendReminderEmails({ data: {
					recipients,
					messageTemplate: message
				} });
				if (!result.success) throw new Error(result.error);
			}
			if (channels.sms) console.log("SMS feature coming soon");
			toast.success(`Reminder sent successfully to ${selected.length} student${selected.length === 1 ? "" : "s"}.`);
			onOpenChange(false);
			setSelected([]);
		} catch (error) {
			console.error(error);
			toast.error("Failed to send reminders. Check console.");
		} finally {
			setSending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-brand-navy",
					children: "Send Payment Reminders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"Notify students with outstanding subscription payments. Personalise the message with ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "{name}" }),
					" and ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "{amount}" }),
					"."
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-sm font-semibold text-brand-navy",
								children: "Students with outstanding payments"
							}), overdueStudents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: toggleAll,
								className: "text-xs font-medium text-brand-navy hover:underline",
								children: allSelected ? "Deselect all" : "Select all"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-56 overflow-y-auto rounded-xl border border-border bg-background",
							children: overdueStudents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-6 text-center text-sm text-muted-foreground",
								children: "No students currently have outstanding payments. Reminders will appear here as subscriptions become overdue."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-border",
								children: overdueStudents.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3 px-3 py-2.5 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: selected.includes(s.id),
										onCheckedChange: () => toggleOne(s.id),
										id: `stu-${s.id}`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: `stu-${s.id}`,
										className: "flex flex-1 cursor-pointer items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-brand-navy",
											children: s.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground",
											children: [
												s.plan,
												" • ",
												s.email
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-brand-navy",
												children: s.amount
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-destructive",
												children: [s.daysOverdue, "d overdue"]
											})]
										})]
									})]
								}, s.id))
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm font-semibold text-brand-navy",
							children: "Delivery channels"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: `flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${channels.email ? "border-brand-navy bg-brand-navy text-white" : "border-border bg-background text-brand-navy"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: channels.email,
										onCheckedChange: (v) => setChannels((c) => ({
											...c,
											email: !!v
										})),
										className: "sr-only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }),
									" Email"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: `flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${channels.sms ? "border-brand-navy bg-brand-navy text-white" : "border-border bg-background text-brand-navy"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: channels.sms,
										onCheckedChange: (v) => setChannels((c) => ({
											...c,
											sms: !!v
										})),
										className: "sr-only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }),
									" SMS"
								]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "reminder-msg",
							className: "text-sm font-semibold text-brand-navy",
							children: "Message template"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "reminder-msg",
							rows: 4,
							value: message,
							onChange: (e) => setMessage(e.target.value),
							className: "mt-2"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleSend,
					disabled: sending,
					className: "bg-brand-navy text-white hover:bg-brand-navy-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-2 h-4 w-4" }), sending ? "Sending…" : `Send reminder${selected.length === 1 ? "" : "s"}${selected.length ? ` (${selected.length})` : ""}`]
				})] })
			]
		})
	});
}
function AddStudentDialog({ open, onOpenChange }) {
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [creds, setCreds] = (0, import_react.useState)(null);
	const [sending, setSending] = (0, import_react.useState)(false);
	const reset = () => {
		setFullName("");
		setEmail("");
		setCreds(null);
		setSending(false);
	};
	const handleClose = (v) => {
		if (!v) reset();
		onOpenChange(v);
	};
	const handleGenerate = async (e) => {
		e.preventDefault();
		if (!fullName.trim() || !email.trim()) {
			toast.error("Please enter the student's name and email.");
			return;
		}
		setSending(true);
		try {
			const normalizedEmail = email.trim().toLowerCase();
			const { data: pending, error: pendingError } = await supabase.from("pending_registrations").select("id, email, subjects, status").eq("email", normalizedEmail).maybeSingle();
			if (pendingError) throw pendingError;
			if (!pending) {
				toast.error("No pending registration was found for that email.");
				setSending(false);
				return;
			}
			if (pending.status === "activated") {
				toast.error("That registration has already been activated.");
				setSending(false);
				return;
			}
			const result = await activateStudentAccount({ data: { registrationId: pending.id } });
			if (!result.success || !result.studentNumber || !result.password) throw new Error(result.error ?? "Student activation failed.");
			setCreds({
				studentNumber: result.studentNumber,
				password: result.password,
				subjects: pending.subjects ?? []
			});
			toast.success(`Student account activated for ${normalizedEmail}. ${Math.max((pending.subjects ?? []).length, 0)} subject${(pending.subjects ?? []).length === 1 ? "" : "s"} attached to the profile.`);
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "Student activation failed.");
		} finally {
			setSending(false);
		}
	};
	const copy = (label, value) => {
		navigator.clipboard?.writeText(value);
		toast.success(`${label} copied.`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-brand-navy",
				children: "Add New Student"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Activates a pending registration, creates the student account, and returns the login details for the student." })] }), !creds ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleGenerate,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "new-name",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "new-name",
							value: fullName,
							onChange: (e) => setFullName(e.target.value),
							placeholder: "e.g. Thandiwe Ndlovu",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "new-email",
								children: "Student email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "new-email",
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "student@example.com",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Login credentials will be sent to this address."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => handleClose(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: sending,
						className: "bg-brand-navy text-white hover:bg-brand-navy-deep",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-2 h-4 w-4" }), sending ? "Generating…" : "Generate & Email"]
					})] })
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-brand-cream/40 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase text-muted-foreground",
							children: "Student number"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-lg font-bold text-brand-navy",
								children: creds.studentNumber
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => copy("Student number", creds.studentNumber),
								children: "Copy"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-brand-cream/40 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase text-muted-foreground",
							children: "Temporary password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-lg font-bold text-brand-navy",
								children: creds.password
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => copy("Password", creds.password),
								children: "Copy"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-brand-cream/40 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase text-muted-foreground",
							children: "Subjects of interest"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: creds.subjects.length > 0 ? creds.subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-semibold text-brand-navy",
								children: s
							}, s)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "No pending registration found for this email — no subjects attached."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"These credentials have been emailed to ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
							". The student will be prompted to change the password on first login."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => handleClose(false),
						className: "bg-brand-navy text-white hover:bg-brand-navy-deep",
						children: "Done"
					}) })
				]
			})]
		})
	});
}
//#endregion
export { StaffDashboard as component };
