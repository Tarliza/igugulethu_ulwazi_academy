import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { M as Download, c as Trash2, k as FolderOpen, o as Upload, p as Plus } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-C0JvBYE6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as PageCard, t as EmptyState } from "./EmptyState-bWZOo4Oc.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff.resources-VQgFiTq5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResourcesPage() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [resources, setResources] = (0, import_react.useState)([]);
	const [title, setTitle] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [file, setFile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		fetchResources();
	}, []);
	const fetchResources = async () => {
		const { data, error } = await supabase.from("resources").select("*").order("created_at", { ascending: false });
		if (error) console.error("Error fetching resources:", error);
		else setResources(data || []);
	};
	const handleUpload = async (e) => {
		e.preventDefault();
		if (!file || !title || !subject) {
			toast.error("Please fill in all required fields and select a file.");
			return;
		}
		setUploading(true);
		try {
			const fileExt = file.name.split(".").pop();
			const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
			const filePath = `${subject}/${fileName}`;
			const { error: uploadError } = await supabase.storage.from("resources").upload(filePath, file);
			if (uploadError) throw uploadError;
			const { error: dbError } = await supabase.from("resources").insert({
				title,
				subject,
				description,
				file_path: filePath
			});
			if (dbError) throw dbError;
			toast.success("Resource uploaded successfully!");
			setOpen(false);
			setTitle("");
			setSubject("");
			setDescription("");
			setFile(null);
			fetchResources();
		} catch (err) {
			console.error(err);
			toast.error("Failed to upload resource. Please try again.");
		} finally {
			setUploading(false);
		}
	};
	const handleDelete = async (id, filePath) => {
		if (!confirm("Are you sure you want to delete this resource?")) return;
		try {
			await supabase.storage.from("resources").remove([filePath]);
			await supabase.from("resources").delete().eq("id", id);
			toast.success("Resource deleted.");
			fetchResources();
		} catch (err) {
			console.error(err);
			toast.error("Failed to delete resource.");
		}
	};
	const downloadFile = async (filePath, title) => {
		const { data, error } = await supabase.storage.from("resources").createSignedUrl(filePath, 60);
		if (error || !data) {
			toast.error("Could not generate download link.");
			return;
		}
		window.open(data.signedUrl, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, {
		title: "Learning Resources",
		description: "Notes, past papers, and worksheets shared with your students.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "bg-brand-navy text-white hover:bg-brand-navy-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add Resource"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-brand-navy",
					children: "Add New Resource"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Upload a file and assign it to a subject." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: handleUpload,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "title",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "title",
								value: title,
								onChange: (e) => setTitle(e.target.value),
								placeholder: "e.g. Grade 11 Trigonometry Notes",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Subject" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: subject,
								onValueChange: setSubject,
								required: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select subject" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "math",
										children: "Mathematics"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "physics",
										children: "Physical Sciences"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "english",
										children: "English"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "acc",
										children: "Accounting"
									})
								] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "desc",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "desc",
								value: description,
								onChange: (e) => setDescription(e.target.value),
								placeholder: "Short summary of the resource",
								rows: 3
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "file",
								children: "File"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-xl border border-dashed border-border bg-brand-cream/40 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5 text-brand-navy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "file",
									type: "file",
									onChange: (e) => setFile(e.target.files?.[0] || null),
									className: "border-0 bg-transparent p-0 shadow-none",
									required: true
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: uploading,
							className: "bg-brand-navy text-white hover:bg-brand-navy-deep",
							children: uploading ? "Uploading..." : "Upload"
						})] })
					]
				})]
			})]
		}),
		children: resources.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FolderOpen,
			title: "No resources uploaded",
			description: "Upload notes, past papers, or worksheets — they will appear here for your students."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: resources.map((res) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-full bg-brand-navy/10 px-2.5 py-0.5 text-xs font-semibold uppercase text-brand-navy",
							children: res.subject
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleDelete(res.id, res.file_path),
							className: "text-muted-foreground hover:text-destructive transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-brand-navy",
						children: res.title
					}),
					res.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground line-clamp-2",
						children: res.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[10px] text-muted-foreground",
						children: ["Uploaded ", new Date(res.created_at).toLocaleDateString()]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "mt-4 w-full",
					onClick: () => downloadFile(res.file_path, res.title),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), " Download"]
				})]
			}, res.id))
		})
	});
}
//#endregion
export { ResourcesPage as component };
