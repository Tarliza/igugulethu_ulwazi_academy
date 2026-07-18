import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { P as CloudUpload, Q as Banknote, R as CircleCheck, X as BookOpen } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, t as SiteFooter } from "./SiteFooter-BySgwlrg.mjs";
import { t as supabase } from "./client-C0JvBYE6.mjs";
import { t as Route } from "./register-Dqxobj9G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-g8oPxRyf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var planLabels = {
	"1-subject": {
		name: "1 Subject",
		price: "R300"
	},
	"2-subjects": {
		name: "2 Subjects",
		price: "R550"
	},
	"3-subjects": {
		name: "3 Subjects",
		price: "R750"
	}
};
function RegisterPage() {
	const { plan } = Route.useSearch();
	const navigate = useNavigate();
	const info = planLabels[plan] ?? planLabels["2-subjects"];
	const [proof, setProof] = (0, import_react.useState)(null);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [selectedSubjects, setSelectedSubjects] = (0, import_react.useState)([]);
	const subjectOptions = [
		"Mathematics",
		"Physical Sciences",
		"Life Sciences",
		"Accounting",
		"Business Studies",
		"Geography",
		"History",
		"English",
		"IsiZulu"
	];
	const planSubjectCount = plan === "3-subjects" ? 3 : plan === "1-subject" ? 1 : 2;
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!proof) return;
		try {
			const fileExt = proof.name.split(".").pop() ?? "bin";
			const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
			const { error: uploadError } = await supabase.storage.from("proof-of-payment").upload(fileName, proof);
			if (uploadError) throw uploadError;
			const data = new FormData(e.currentTarget);
			const { error: dbError } = await supabase.from("pending_registrations").insert({
				first_name: String(data.get("firstName") ?? "").trim(),
				last_name: String(data.get("lastName") ?? "").trim(),
				email: String(data.get("email") ?? "").trim(),
				phone: String(data.get("phone") ?? "").trim(),
				grade: String(data.get("grade") ?? "").trim(),
				school: String(data.get("school") ?? "").trim(),
				plan,
				subjects: selectedSubjects
			});
			if (dbError) throw dbError;
			setSubmitted(true);
			setTimeout(() => navigate({ to: "/student-login" }), 1600);
		} catch (err) {
			console.error("Registration error:", err);
			alert("Failed to submit registration. Please try again.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-brand-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-3xl px-6 py-16 lg:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-card p-8 shadow-card sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block rounded-full bg-brand-amber-soft px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-brand-navy",
							children: "COMPLETE REGISTRATION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl",
							children: "Almost there — let's get you set up."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-between rounded-2xl border border-border bg-brand-cream/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
								children: "Selected plan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg font-extrabold text-brand-navy",
								children: info.name
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-2xl font-extrabold text-brand-navy",
									children: info.price
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/subscription",
									className: "text-xs font-semibold text-brand-amber hover:underline",
									children: "Change plan"
								})]
							})]
						}),
						submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-emerald-600" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-xl font-extrabold text-brand-navy",
									children: "Application received"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "We'll verify your proof of payment and activate your account. Redirecting to sign in…"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "mt-8 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-5 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "First name",
											name: "firstName",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Last name",
											name: "lastName",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Email address",
											name: "email",
											type: "email",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Phone number",
											name: "phone",
											type: "tel",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Grade",
											name: "grade",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "School",
											name: "school",
											required: true
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-2 block text-sm font-semibold text-brand-navy",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }), "Subjects of interest"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: subjectOptions.map((subject) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background p-3 text-sm transition hover:border-brand-navy/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												name: "subjects",
												value: subject,
												checked: selectedSubjects.includes(subject),
												onChange: (e) => {
													const value = e.target.value;
													setSelectedSubjects((prev) => e.target.checked ? [...prev, value] : prev.filter((s) => s !== value));
												},
												className: "h-4 w-4 accent-brand-amber"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-brand-navy",
												children: subject
											})]
										}, subject))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: [
											"Your selected plan covers up to ",
											planSubjectCount,
											" subject",
											planSubjectCount !== 1 ? "s" : "",
											". Pick the ones you want to enrol for."
										]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block text-sm font-semibold text-brand-navy",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "h-4 w-4" }), "How to make payment"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border bg-brand-cream/60 p-4 text-sm text-brand-navy",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold",
											children: [
												"Amount to pay: ",
												info.price,
												" per month"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-muted-foreground",
											children: "Pay by EFT or instant money transfer. Use the email address you entered above as the payment reference."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 rounded-xl bg-background p-3 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: "Bank:"
												}), " Capitec"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: "Account Holder:"
												}), " MR Gabriel Moiane"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: "Account Type:"
												}), " Main Account"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: "Account No:"
												}), " 1709691504"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: "Branch Code:"
												}), " 470010"] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-xs text-muted-foreground",
											children: "Once the payment is confirmed, upload your proof of payment below. The staff team will verify it and email your student login credentials."
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block text-sm font-semibold text-brand-navy",
									children: "Create password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									name: "password",
									required: true,
									minLength: 8,
									className: "w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mb-2 block text-sm font-semibold text-brand-navy",
									children: ["Upload Proof of Subscription ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-500",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "proof",
									className: "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-navy/30 bg-brand-cream/50 p-8 text-center transition hover:border-brand-navy/60 hover:bg-brand-cream",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-8 w-8 text-brand-navy" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-semibold text-brand-navy",
											children: proof ? proof.name : "Click to upload proof of payment"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											children: "PDF, PNG or JPG — max 10 MB"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "proof",
											type: "file",
											accept: ".pdf,image/png,image/jpeg",
											required: true,
											className: "sr-only",
											onChange: (e) => setProof(e.target.files?.[0] ?? null)
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: !proof,
									className: "inline-flex w-full items-center justify-center rounded-full bg-brand-amber px-6 py-3.5 text-sm font-bold text-brand-navy shadow-soft transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50",
									children: "Create account"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-center text-xs text-muted-foreground",
									children: [
										"Already registered?",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/student-login",
											className: "font-semibold text-brand-navy hover:underline",
											children: "Sign in"
										})
									]
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
function Field({ label, name, type = "text", required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mb-2 block text-sm font-semibold text-brand-navy",
		children: [
			label,
			" ",
			required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				children: "*"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		name,
		required,
		className: "w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none"
	})] });
}
//#endregion
export { RegisterPage as component };
