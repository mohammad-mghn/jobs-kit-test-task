import { Icon } from "@iconify/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { cn } from "@/utils/cn";

type InputProps<TFieldValues extends FieldValues = FieldValues> = {
	id: Path<TFieldValues>;
	icon?: string;
	placeholder?: string;
	control: Control<TFieldValues>; // Use generic Control type
	labelCN?: string; // CN stands for class name
	iconCN?: string; // CN stands for class name
	inputCN?: string; // CN stands for class name
	[key: string]: any;
};

const Input = <TFieldValues extends FieldValues = FieldValues>({
	id,
	icon,
	placeholder,
	control,
	labelCN,
	iconCN,
	inputCN,
	...other
}: InputProps<TFieldValues>) => (
	<Controller
		name={id}
		control={control}
		render={({ field }) => (
			<label
				htmlFor={id}
				className={cn(
					"w-full md:w-5/12 bg-lighter-background p-3 flex items-center gap-x-3 rounded-lg",
					labelCN,
				)}
			>
				{icon && (
					<Icon
						icon={icon}
						className={cn("text-neutral", iconCN)}
						width={20}
						height={20}
					/>
				)}
				<input
					{...field}
					id={id}
					value={field.value ?? ""}
					placeholder={placeholder}
					className={cn(
						"w-full bg-transparent text-primary placeholder:text-neutral !border-none !outline-none",
						inputCN,
					)}
					onChange={(e) => {
						field.onChange(e);
					}}
					{...other}
				/>
			</label>
		)}
	/>
);

export default Input;
