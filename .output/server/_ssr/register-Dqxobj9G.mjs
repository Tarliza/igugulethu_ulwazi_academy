import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-Dqxobj9G.js
var $$splitComponentImporter = () => import("./register-g8oPxRyf.mjs");
var Route = createFileRoute("/register")({
	validateSearch: (search) => ({ plan: typeof search.plan === "string" ? search.plan : "2-subjects" }),
	head: () => ({ meta: [
		{ title: "Apply Now | Igugulethu Ulwazi Academy" },
		{
			name: "description",
			content: "Secure your spot at Igugulethu Ulwazi Academy today. Fill out our simple online registration form."
		},
		{
			property: "og:title",
			content: "Register for Igugulethu Ulwazi Academy"
		},
		{
			property: "og:description",
			content: "Secure your spot at Igugulethu Ulwazi Academy today."
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
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
