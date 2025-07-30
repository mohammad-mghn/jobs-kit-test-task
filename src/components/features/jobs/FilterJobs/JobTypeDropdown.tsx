import { Icon } from "@iconify/react";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Menu from "@mui/material/Menu";
import { useRef } from "react";
import { UseFormSetValue } from "react-hook-form";

import { JOBS_TYPE_OPTIONS } from "@/constants/jobs-filter-options";
import { cn } from "@/utils/cn";
import Button from "../../../ui/Button";

interface FilterFormValues {
	title: string;
	categories: string[];
	subCategories: string[];
	specialities: string[];
	countries: string[];
	expired: boolean;
	internship: boolean;
	jobTypes: string[];
}

interface JobTypeDropdownProps {
	disabled?: boolean;
	jobTypeOptions: { value: string; label: string }[];
	jobTypes: string[];
	jobTypesDropdownOpen: boolean;
	handleJobTypesDropdownClick: () => void;
	handleJobTypesDropdownClose: () => void;
	handleJobTypesApply: () => void;
	handleJobTypesReset: () => void;
	setValue: UseFormSetValue<FilterFormValues>;
}

const JobTypeDropdown = ({
	disabled,
	jobTypeOptions,
	jobTypes,
	jobTypesDropdownOpen,
	handleJobTypesDropdownClick,
	handleJobTypesDropdownClose,
	handleJobTypesApply,
	handleJobTypesReset,
	setValue,
}: JobTypeDropdownProps) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	const getButtonLabel = () => {
		if (jobTypes.length === 0) return "نوع شغل";
		const firstSelectedType = JOBS_TYPE_OPTIONS.find(
			(option) => option.value === jobTypes[0],
		);
		if (jobTypes.length === 1) return firstSelectedType?.label ?? jobTypes[0];
		if (jobTypes.length === 2)
			return `${firstSelectedType?.label ?? jobTypes[0]}، ...`;
		return "نوع شغل: همه";
	};

	return (
		<>
			<Button
				ref={buttonRef}
				variant="outline"
				size="md"
				buttonType="button"
				disabled={disabled}
				className={cn(
					"relative py-1 px-2 flex items-center gap-2 text-sm",
					jobTypes.length > 0 ? "border-accent text-accent" : "text-neutral",
				)}
				onClick={handleJobTypesDropdownClick}
			>
				<span className="text-nowrap">{getButtonLabel()}</span>
				{jobTypes.length > 0 && (
					<Icon
						icon="iconamoon:close"
						width={16}
						height={16}
						onClick={(e) => {
							e.stopPropagation();
							handleJobTypesReset();
						}}
					/>
				)}
			</Button>

			<Menu
				anchorEl={buttonRef.current}
				open={jobTypesDropdownOpen}
				onClose={handleJobTypesDropdownClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<FormControl component="fieldset" className="w-full px-4 py-2">
					<FormLabel component="legend">نوع شغل</FormLabel>
					<FormGroup>
						{jobTypeOptions.map((opt) => (
							<FormControlLabel
								key={opt.value}
								control={
									<Checkbox
										checked={jobTypes.includes(opt.value)}
										onChange={(e) => {
											const checked = e.target.checked;
											const newTypes = checked
												? [...jobTypes, opt.value]
												: jobTypes.filter((v) => v !== opt.value);
											setValue("jobTypes", newTypes);
										}}
									/>
								}
								label={opt.label}
							/>
						))}
					</FormGroup>
					<div className="flex justify-between mt-2">
						<Button
							buttonType="button"
							onClick={handleJobTypesApply}
							className="bg-accent text-white px-4 py-1 rounded"
						>
							اعمال
						</Button>
						<Button
							buttonType="button"
							onClick={handleJobTypesReset}
							className="bg-gray-200 text-gray-700 px-4 py-1 rounded"
						>
							ریست
						</Button>
					</div>
				</FormControl>
			</Menu>
		</>
	);
};

export default JobTypeDropdown;
