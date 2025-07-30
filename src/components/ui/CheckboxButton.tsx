import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react";
import { Controller } from "react-hook-form";
import Button from "./Button";

interface CheckboxButtonProps<T> {
	control: any;
	name: any;
	label: string;
	disabled?: boolean;
	className?: string;
}

function CheckboxButton<T>({
	control,
	name,
	label,
	disabled,
	className,
}: CheckboxButtonProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Button
					variant="outline"
					size="md"
					buttonType="button"
					disabled={disabled}
					className={cn(
						"py-1 px-2 flex items-center gap-2",
						field.value ? "border-accent text-accent" : "text-neutral",
						className,
					)}
					onClick={() => field.onChange(!field.value)}
				>
					<span className="text-sm text-nowrap">{label}</span>
					{field.value && (
						<Icon
							icon="iconamoon:close"
							width={16}
							height={16}
							onClick={(e) => {
								e.stopPropagation();
								field.onChange(false);
							}}
						/>
					)}
				</Button>
			)}
		/>
	);
}

export default CheckboxButton;
