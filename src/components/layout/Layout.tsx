import { cn } from "@/utils/cn";

interface Props {
	children: React.ReactNode;
	className?: string;
}

const Layout = ({ children, className }: Props) => {
	return (
		<div className={cn("mx-auto w-full max-w-screen-lg px-6", className)}>
			{children}
		</div>
	);
};

export default Layout;
