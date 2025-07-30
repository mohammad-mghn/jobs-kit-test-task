import { Icon } from "@iconify/react";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";

import { NAV_LINKS } from "@/constants/nav";
import { DrawerNavLinkType } from "@/types/navbar";
import Button from "../../ui/Button";
import DrawerMenuLink from "./DrawerMenuLink";

interface DrawerMenuProps {
	pathname: string;
	open: boolean;
	onClose: () => void;
}

const DrawerMenu = ({ pathname, open, onClose }: DrawerMenuProps) => {
	return (
		<Drawer anchor="right" open={open} onClose={onClose}>
			<div className="w-64 h-full bg-light-background flex flex-col justify-between gap-y-6">
				<div className="space-y-6">
					{/* Logo */}
					<div className="pt-5 px-6 flex items-center">
						<Image
							src="/logo/logo.svg"
							alt="لوگوی جابزکیت"
							width={107}
							height={28}
						/>
					</div>

					{/* Mobile nav */}
					<nav className="flex flex-col">
						{NAV_LINKS.map((link: DrawerNavLinkType) => (
							<DrawerMenuLink key={link.href} link={link} pathname={pathname} />
						))}
					</nav>
				</div>

				{/* Login button */}
				<div className="w-full p-3.5">
					<Button
						startIcon={
							<Icon
								icon="hugeicons:login-01"
								width={24}
								height={24}
								className="w-6 h-6 ml-1"
							/>
						}
						className="w-full"
					>
						<div className="flex items-center gap-x-2 font-semibold">
							<span>ورود</span>
							<span className="h-4 w-0 border border-primary" />
							<span>
								<span>ثبت نام</span>
							</span>
						</div>
					</Button>
				</div>
			</div>
		</Drawer>
	);
};

export default DrawerMenu;
