import Link from "next/link";

import { NavLinkType } from "@/types/navbar";
import { cn } from "@/utils/cn";

type PropsType = NavLinkType & {
	active: boolean;
	className?: string;
};

const NavLink = ({ label, href, active, className = "" }: PropsType) => {
	return (
		<Link
			href={href}
			className={cn("focus:outline-none", className)}
			aria-current={active ? "page" : undefined}
		>
			<span
				className={cn(
					"block relative text-primary font-semibold hover:opacity-80 before:absolute before:top-1/2 before:-translate-y-1/2 before:right-0 before:translate-x-3.5 before:w-1.5 before:h-1.5 before:rounded-full transition-all duration-300",
					active ? "before:bg-dark-accent" : "hover:before:bg-primary",
				)}
			>
				{label}
			</span>
		</Link>
	);
};

export default NavLink;
