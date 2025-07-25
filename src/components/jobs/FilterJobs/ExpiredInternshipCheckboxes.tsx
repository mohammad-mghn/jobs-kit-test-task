import { Icon } from "@iconify/react";
import { Controller } from "react-hook-form";

import { cn } from "@/utils/cn";
import Button from "../../Button";

interface ExpiredInternshipCheckboxesProps {
	control: any;
}

const ExpiredInternshipCheckboxes = ({
	control,
}: ExpiredInternshipCheckboxesProps) => (
	<>
		<Controller
			name="expired"
			control={control}
			render={({ field }) => (
				<Button
					variant="outline"
					size="md"
					buttonType="button"
					className={cn(
						"py-1 px-2 flex items-center gap-2",
						field.value ? "border-accent text-accent" : "text-neutral",
					)}
					onClick={() => field.onChange(!field.value)}
				>
					<span className="text-sm text-nowrap">منقضی شده</span>
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
		<Controller
			name="internship"
			control={control}
			render={({ field }) => (
				<Button
					variant="outline"
					size="md"
					buttonType="button"
					className={cn(
						"py-1 px-2 flex items-center gap-2",
						field.value ? "border-accent text-accent" : "text-neutral",
					)}
					onClick={() => field.onChange(!field.value)}
				>
					<span className="text-sm text-nowrap">کارآموزی</span>
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
	</>
);

export default ExpiredInternshipCheckboxes;
