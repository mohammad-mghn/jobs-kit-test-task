import { PATHS } from "@/constants/routes";
import { DrawerNavLinkType } from "@/types/navbar";

export const useNavbar = (): {
	links: DrawerNavLinkType[];
} => ({
	links: [
		{
			label: "صفحه اصلی",
			href: PATHS.HOME,
			icon: "material-symbols-light:home-outline-rounded",
		},
		{
			label: "فرصت های شغلی",
			href: PATHS.JOBS,
			icon: "hugeicons:job-search",
		},
		{
			label: "اعلان ها",
			href: PATHS.HOW_TO_USE_ALERTS,
			icon: "carbon:settings-services",
		},
		{ label: "وبلاگ", href: PATHS.BLOG, icon: "iconamoon:news-thin" },
		{
			label: "درباره ما",
			href: PATHS.ABOUT,
			icon: "fluent-mdl2:people",
		},
		{
			label: "تماس با ما",
			href: PATHS.CONTACT,
			icon: "mynaui:telephone",
		},
	],
});
