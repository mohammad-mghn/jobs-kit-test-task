"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAV_LINKS } from "@/constants/nav";
import { NavLinkType } from "@/types/navbar";
import Button from "../../ui/Button";
import DrawerMenu from "./DrawerMenu";
import NavLink from "./NavLink";

const Navbar = () => {
	const pathname = usePathname();

	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={`sticky top-0 inset-x-0 w-full flex items-center justify-center z-50 transition-all duration-300 ${
				scrolled ? "bg-[#21252d] shadow-darker" : "bg-background"
			}`}
		>
			<div className="relative w-full max-w-screen-lg pl-6 pr-6 lg:pr-7 py-3 lg:py-[1.875rem] flex items-center justify-between !z-50">
				{/* Logo */}
				<Image
					src="/logo/logo.svg"
					alt="لوگوی جابزکیت"
					width={107}
					height={28}
				/>

				{/* Desktop nav */}
				<nav className="hidden lg:flex items-center gap-x-8">
					{NAV_LINKS.map((link: NavLinkType) => (
						<NavLink
							key={link.href}
							label={link.label}
							href={link.href}
							active={pathname === link.href}
						/>
					))}
				</nav>

				{/* Login button */}
				<Button
					startIcon={
						<Icon
							icon="hugeicons:login-01"
							width={24}
							height={24}
							className="w-6 h-6 ml-1"
						/>
					}
					className="hidden lg:flex"
				>
					<div className="flex items-center gap-x-1 font-semibold">
						<span>ورود</span>
						<span className="h-4 w-0 border border-primary" />
						<span>
							<span>ثبت نام</span>
						</span>
					</div>
				</Button>

				{/* Mobile menu button */}
				<Button
					variant="icon"
					size="sm-icon"
					aria-label="open drawer"
					onClick={handleDrawerToggle}
					className="lg:hidden"
				>
					<Icon
						icon={"solar:hamburger-menu-line-duotone"}
						className="w-7 h-7 text-primary"
						width={32}
						height={32}
					/>
				</Button>
			</div>

			{/* Mobile drawer */}
			<DrawerMenu
				pathname={pathname}
				open={mobileOpen}
				onClose={handleDrawerToggle}
			/>
		</div>
	);
};

export default Navbar;
