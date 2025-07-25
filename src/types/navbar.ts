import { IconifyIcon } from "@iconify/react/dist/iconify.js";

export type NavLinkType = {
	label: React.ReactNode;
	href: string;
};

export type DrawerNavLinkType = {
	label: React.ReactNode;
	href: string;
	icon: string | IconifyIcon;
};
