import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-C0JvBYE6.mjs";
import { t as Route$28 } from "./register-Dqxobj9G.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CZzzIIcq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Bfyfj86m.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$27 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Igugulethu Ulwazi Academy" },
			{
				name: "description",
				content: "Expert tutors, curated resources, and a proven approach — designed to unlock every learner's full academic potential."
			},
			{
				property: "og:title",
				content: "Igugulethu Ulwazi Academy"
			},
			{
				property: "og:description",
				content: "Change lives. Inspire dreams. Push limits."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800;900&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$27.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})]
	});
}
var $$splitComponentImporter$26 = () => import("./subscription-CUMbMv7R.mjs");
var Route$26 = createFileRoute("/subscription")({
	head: () => ({ meta: [
		{ title: "Subscriptions — Igugulethu Ulwazi Academy" },
		{
			name: "description",
			content: "Choose from 1, 2, or 3 subject plans and unlock expert tutoring, resources, and A-grade support."
		},
		{
			property: "og:title",
			content: "Subscription Plans — Igugulethu Ulwazi Academy"
		},
		{
			property: "og:description",
			content: "Affordable monthly plans: 1 Subject R300, 2 Subjects R550, 3 Subjects R750."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./student-signup-CdLBeQk3.mjs");
var Route$25 = createFileRoute("/student-signup")({
	head: () => ({ meta: [{ title: "Student Signup — Igugulethu Ulwazi Academy" }, {
		name: "description",
		content: "Create your student account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./student-login-YRdbtJwH.mjs");
var Route$24 = createFileRoute("/student-login")({
	head: () => ({ meta: [
		{ title: "Student Portal | Igugulethu Ulwazi Academy" },
		{
			name: "description",
			content: "Login to access your learning materials, messages, and class bookings."
		},
		{
			property: "og:title",
			content: "Student Portal | Igugulethu Ulwazi Academy"
		},
		{
			property: "og:description",
			content: "Login to access your learning materials, messages, and class bookings."
		},
		{
			property: "og:image",
			content: "/logo.jpeg"
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./student-B1GVeIRi.mjs");
var Route$23 = createFileRoute("/student")({
	head: () => ({ meta: [{ title: "Student Portal — Igugulethu Ulwazi Academy" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./staff-login-C7AxQzEA.mjs");
var Route$22 = createFileRoute("/staff-login")({
	head: () => ({ meta: [
		{ title: "Staff Login — Igugulethu Ulwazi Academy" },
		{
			name: "description",
			content: "Sign in to the staff portal."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./staff-BhrQMgB4.mjs");
var Route$21 = createFileRoute("/staff")({
	beforeLoad: async () => {
		const { data: { session } } = await supabase.auth.getSession();
		if (!session) throw redirect({ to: "/staff-login" });
		const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).single();
		if (!roleData || roleData.role !== "staff" && roleData.role !== "admin") throw redirect({ to: "/staff-login" });
	},
	head: () => ({ meta: [{ title: "Staff Portal — Igugulethu Ulwazi Academy" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./login-BEwSNyqM.mjs");
var Route$20 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign in — Igugulethu Ulwazi Academy" }, {
		name: "description",
		content: "Access your Student Portal or Staff Portal."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./contact-BN5x-SL1.mjs");
var Route$19 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact — Igugulethu Ulwazi Academy" }, {
		name: "description",
		content: "Get in touch with Igugulethu Ulwazi Academy."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./about-kQAw802J.mjs");
var Route$18 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — Igugulethu Ulwazi Academy" }, {
		name: "description",
		content: "Our mission, our tutors, and the approach that guarantees A grades."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./routes-Cs_W9vVv.mjs");
var Route$17 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Igugulethu Ulwazi Academy | Excellence in Education" },
		{
			name: "description",
			content: "Expert tutors, comprehensive resources, and a proven teaching approach designed to unlock full academic potential and guarantee A grades."
		},
		{
			property: "og:title",
			content: "Igugulethu Ulwazi Academy"
		},
		{
			property: "og:description",
			content: "Join Igugulethu Ulwazi Academy for premium tutoring, academic support, and a proven path to success."
		},
		{
			property: "og:image",
			content: "/logo.jpeg"
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: "Igugulethu Ulwazi Academy"
		},
		{
			name: "twitter:description",
			content: "Premium tutoring and academic support for Grade 10–12 learners."
		},
		{
			name: "twitter:image",
			content: "/logo.jpeg"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./student.index-DZTPpGFW.mjs");
var Route$16 = createFileRoute("/student/")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./staff.index-DmwCsEED.mjs");
var Route$15 = createFileRoute("/staff/")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./student.timetable-Cu-Fji4y.mjs");
var Route$14 = createFileRoute("/student/timetable")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./student.subjects-Iqf2p0Bm.mjs");
var Route$13 = createFileRoute("/student/subjects")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./student.quizzes-DCQ5PdUl.mjs");
var Route$12 = createFileRoute("/student/quizzes")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./student.profile-D-AdNG8l.mjs");
var Route$11 = createFileRoute("/student/profile")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./student.plan-CeycvIfB.mjs");
var Route$10 = createFileRoute("/student/plan")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./student.payment-CjPW2URh.mjs");
var Route$9 = createFileRoute("/student/payment")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./student.messages-DlO_lPe8.mjs");
var Route$8 = createFileRoute("/student/messages")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./student.library-BIN5HZEL.mjs");
var Route$7 = createFileRoute("/student/library")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./student.grades-DuGcM2-N.mjs");
var Route$6 = createFileRoute("/student/grades")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./student.book-BXk8VRBY.mjs");
var Route$5 = createFileRoute("/student/book")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./staff.verifications-Bkr0m2u7.mjs");
var Route$4 = createFileRoute("/staff/verifications")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./staff.students-BbgfDMno.mjs");
var Route$3 = createFileRoute("/staff/students")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./staff.resources-VQgFiTq5.mjs");
var Route$2 = createFileRoute("/staff/resources")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./staff.messages-0IyNNGZV.mjs");
var Route$1 = createFileRoute("/staff/messages")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./staff.bookings-CqhM_uVW.mjs");
var Route = createFileRoute("/staff/bookings")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var SubscriptionRoute = Route$26.update({
	id: "/subscription",
	path: "/subscription",
	getParentRoute: () => Route$27
});
var StudentSignupRoute = Route$25.update({
	id: "/student-signup",
	path: "/student-signup",
	getParentRoute: () => Route$27
});
var StudentLoginRoute = Route$24.update({
	id: "/student-login",
	path: "/student-login",
	getParentRoute: () => Route$27
});
var StudentRoute = Route$23.update({
	id: "/student",
	path: "/student",
	getParentRoute: () => Route$27
});
var StaffLoginRoute = Route$22.update({
	id: "/staff-login",
	path: "/staff-login",
	getParentRoute: () => Route$27
});
var StaffRoute = Route$21.update({
	id: "/staff",
	path: "/staff",
	getParentRoute: () => Route$27
});
var RegisterRoute = Route$28.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$27
});
var LoginRoute = Route$20.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$27
});
var ContactRoute = Route$19.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$27
});
var AboutRoute = Route$18.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$27
});
var IndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$27
});
var StudentIndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => StudentRoute
});
var StaffIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => StaffRoute
});
var StudentTimetableRoute = Route$14.update({
	id: "/timetable",
	path: "/timetable",
	getParentRoute: () => StudentRoute
});
var StudentSubjectsRoute = Route$13.update({
	id: "/subjects",
	path: "/subjects",
	getParentRoute: () => StudentRoute
});
var StudentQuizzesRoute = Route$12.update({
	id: "/quizzes",
	path: "/quizzes",
	getParentRoute: () => StudentRoute
});
var StudentProfileRoute = Route$11.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => StudentRoute
});
var StudentPlanRoute = Route$10.update({
	id: "/plan",
	path: "/plan",
	getParentRoute: () => StudentRoute
});
var StudentPaymentRoute = Route$9.update({
	id: "/payment",
	path: "/payment",
	getParentRoute: () => StudentRoute
});
var StudentMessagesRoute = Route$8.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => StudentRoute
});
var StudentLibraryRoute = Route$7.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => StudentRoute
});
var StudentGradesRoute = Route$6.update({
	id: "/grades",
	path: "/grades",
	getParentRoute: () => StudentRoute
});
var StudentBookRoute = Route$5.update({
	id: "/book",
	path: "/book",
	getParentRoute: () => StudentRoute
});
var StaffVerificationsRoute = Route$4.update({
	id: "/verifications",
	path: "/verifications",
	getParentRoute: () => StaffRoute
});
var StaffStudentsRoute = Route$3.update({
	id: "/students",
	path: "/students",
	getParentRoute: () => StaffRoute
});
var StaffResourcesRoute = Route$2.update({
	id: "/resources",
	path: "/resources",
	getParentRoute: () => StaffRoute
});
var StaffMessagesRoute = Route$1.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => StaffRoute
});
var StaffRouteChildren = {
	StaffBookingsRoute: Route.update({
		id: "/bookings",
		path: "/bookings",
		getParentRoute: () => StaffRoute
	}),
	StaffMessagesRoute,
	StaffResourcesRoute,
	StaffStudentsRoute,
	StaffVerificationsRoute,
	StaffIndexRoute
};
var StaffRouteWithChildren = StaffRoute._addFileChildren(StaffRouteChildren);
var StudentRouteChildren = {
	StudentBookRoute,
	StudentGradesRoute,
	StudentLibraryRoute,
	StudentMessagesRoute,
	StudentPaymentRoute,
	StudentPlanRoute,
	StudentProfileRoute,
	StudentQuizzesRoute,
	StudentSubjectsRoute,
	StudentTimetableRoute,
	StudentIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ContactRoute,
	LoginRoute,
	RegisterRoute,
	StaffRoute: StaffRouteWithChildren,
	StaffLoginRoute,
	StudentRoute: StudentRoute._addFileChildren(StudentRouteChildren),
	StudentLoginRoute,
	StudentSignupRoute,
	SubscriptionRoute
};
var routeTree = Route$27._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
