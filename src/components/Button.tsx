import React from "react";

import { cn } from "@/utils/cn";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: any;
	ref?: any;
	href?: string;
	size?: "sm" | "sm-icon" | "md";
	variant?: "accent" | "icon" | "outline" | "muted";
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	disabled?: boolean;
	className?: string;
	buttonType?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	href,
	ref,
	size = "sm",
	variant = "accent",
	startIcon,
	endIcon,
	disabled = false,
	buttonType = "button",
	className = "",
	...other
}) => {
	const baseStyles =
		"inline-flex items-center justify-center font-medium rounded-md transition-all duration-300";

	const sizeStyles = {
		sm: "px-2 py-1.5 gap-1 text-base rounded-lg",
		"sm-icon": "h-10 w-10 rounded-full",
		md: "p-3 flex items-center gap-x-3 rounded-lg",
	};

	const variantStyles = {
		accent: "bg-accent text-primary hover:bg-accent/90 disabled:!bg-accent/80",
		icon: "bg-primary/0 text-primary hover:bg-primary/10 border-none shadow-none disabled:!bg-transparent",
		outline:
			"bg-transparent hover:bg-primary/10 border border-neutral hover:border-primary disabled:border-neutral/0 disabled:bg-transform",
		muted: "bg-lighter-background text-neutral p-3",
	};

	const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

	const classes = cn(
		baseStyles,
		sizeStyles[size],
		variantStyles[variant],
		disabledStyles,
		className,
	);

	if (href && !disabled) {
		return (
			<a
				href={href}
				className={classes}
				onClick={onClick}
				tabIndex={0}
				role="button"
				ref={ref}
				{...other}
			>
				{startIcon && <span className="flex items-center">{startIcon}</span>}
				{children}
				{endIcon && <span className="flex items-center">{endIcon}</span>}
			</a>
		);
	}

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={classes}
			type={buttonType}
			ref={ref}
			{...other}
		>
			{startIcon && <span className="flex items-center">{startIcon}</span>}
			{children}
			{endIcon && <span className="flex items-center">{endIcon}</span>}
		</button>
	);
};

export default Button;
