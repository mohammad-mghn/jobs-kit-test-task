import { Icon } from "@iconify/react";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Menu from "@mui/material/Menu";
import { Controller } from "react-hook-form";

import { cn } from "@/utils/cn";
import Button from "../../../ui/Button";

interface CountryDropdownProps {
	control: any;
	disabled?: boolean;
	countryList: any[];
	selectedCountryCount: number;
	anchorElCountry: HTMLElement | null;
	handleCountryDropdownClick: () => void;
	handleCountryDropdownClose: () => void;
	handleCountryReset: (e?: React.MouseEvent) => void;
	watch: any;
}

const CountryDropdown = ({
	control,
	disabled,
	countryList,
	selectedCountryCount,
	anchorElCountry,
	handleCountryDropdownClick,
	handleCountryDropdownClose,
	handleCountryReset,
	watch,
}: CountryDropdownProps) => (
	<>
		<Button
			variant="muted"
			size="md"
			disabled={disabled}
			buttonType="button"
			onClick={handleCountryDropdownClick}
			className="hidden md:flex h-12 w-[calc(100%/12*2.5)] relative justify-between"
		>
			<div className="flex items-center gap-x-3">
				<Icon
					icon="hugeicons:layers-01"
					className="text-neutral flex-shrink-0"
					width={20}
					height={20}
				/>
				<div className="w-24 flex items-center gap-1">
					{selectedCountryCount > 0 ? (
						<>
							{watch("countries")
								?.slice(0, 4)
								.map((code: string) => {
									const icon = countryList.find((c) => c.code === code)?.icon;
									return icon ? (
										<Icon
											key={code}
											icon={icon}
											width={18}
											height={18}
											className="flex-shrink-0"
										/>
									) : null;
								})}
							{watch("countries").length >= 4 && <span>...</span>}
						</>
					) : (
						<span>کشور</span>
					)}
				</div>
			</div>

			{selectedCountryCount > 0 && (
				<Button
					variant="icon"
					size="sm-icon"
					className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6"
				>
					<Icon
						icon={"iconamoon:close"}
						width={20}
						height={20}
						onClick={(e) => {
							e.stopPropagation();
							handleCountryReset();
						}}
						className="text-neutral"
					/>
				</Button>
			)}
			<Icon
				icon={"eva:arrow-ios-downward-outline"}
				width={20}
				height={20}
				className={cn(
					"flex-shrink-0 transition-transform duration-300",
					anchorElCountry ? "rotate-180" : "rotate-0",
				)}
			/>
		</Button>

		<Menu
			anchorEl={anchorElCountry}
			open={Boolean(anchorElCountry)}
			onClose={handleCountryDropdownClose}
			PaperProps={{
				style: { minWidth: 320, maxHeight: 400, overflowY: "auto" },
			}}
		>
			<FormControl component="fieldset" className="w-full px-4 py-2">
				<FormLabel component="legend">کشور</FormLabel>
				<FormGroup>
					<Controller
						name="countries"
						control={control}
						render={({ field }) => (
							<>
								{countryList.map((country) => (
									<FormControlLabel
										key={country.code}
										control={
											<Checkbox
												checked={field.value?.includes(country.code) || false}
												onChange={(e) => {
													const checked = e.target.checked;
													const newValue = checked
														? [...(field.value || []), country.code]
														: (field.value || []).filter(
																(slug: string) => slug !== country.code,
															);
													field.onChange(newValue);
												}}
											/>
										}
										label={
											<span className="flex items-center gap-2">
												<Icon icon={country.icon} width={20} />
												{country.fa}
											</span>
										}
									/>
								))}
							</>
						)}
					/>
				</FormGroup>
			</FormControl>
		</Menu>
	</>
);

export default CountryDropdown;
