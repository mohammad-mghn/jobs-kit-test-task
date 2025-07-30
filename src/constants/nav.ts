import { routes } from "@/constants/routes";

import { DrawerNavLinkType } from "@/types/navbar";

export const NAV_LINKS: DrawerNavLinkType[] = [
	{
		label: "صفحه اصلی",
		href: routes.HOME,
		icon: "material-symbols-light:home-outline-rounded",
	},
	{
		label: "فرصت های شغلی",
		href: routes.JOBS,
		icon: "hugeicons:job-search",
	},
	{
		label: "اعلان ها",
		href: routes.HOW_TO_USE_ALERTS,
		icon: "carbon:settings-services",
	},
	{
		label: "وبلاگ",
		href: routes.BLOG,
		icon: "iconamoon:news-thin",
	},
	{
		label: "درباره ما",
		href: routes.ABOUT,
		icon: "fluent-mdl2:people",
	},
	{
		label: "تماس با ما",
		href: routes.CONTACT,
		icon: "mynaui:telephone",
	},
];
