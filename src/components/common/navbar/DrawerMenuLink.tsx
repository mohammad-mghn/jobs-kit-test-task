import { Icon } from "@iconify/react";
import Link from "next/link";

import { DrawerNavLinkType } from "@/types/navbar";
import { cn } from "@/utils/cn";

interface DrawerMenuLinkProps {
	link: DrawerNavLinkType;
	pathname: string;
}

const DrawerMenuLink = ({ link, pathname }: DrawerMenuLinkProps) => (
	<Link
		key={link.href}
		href={link.href}
		className={cn(
			"flex items-center gap-x-4 text-sm px-4 py-3.5 transition-colors",
			pathname === link.href
				? "bg-accent/10 text-accent font-semibold"
				: "hover:bg-primary/5 text-[#919eab] font-medium",
		)}
	>
		<Icon icon={link.icon} width={20} height={20} />
		<span>{link.label}</span>
	</Link>
);

export default DrawerMenuLink;
