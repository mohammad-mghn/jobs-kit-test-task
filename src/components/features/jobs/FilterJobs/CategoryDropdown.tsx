import { Icon } from "@iconify/react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

import { cn } from "@/utils/cn";
import { useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";
import Button from "../../../ui/Button";

interface CategoryDropdownProps {
	categories: any[];
	disabled?: boolean;
	pendingCategories: string[];
	pendingSubCategories: string[];
	pendingSpecialities: string[];
	openCategory: string | null;
	openSubCategory: string | null;
	anchorEl: HTMLElement | null;
	handleCategoryDropdownClick: () => void;
	handleCategoryDropdownClose: () => void;
	setOpenCategory: (slug: string | null) => void;
	setOpenSubCategory: (slug: string | null) => void;
	handleCategoryApply: () => void;
	handleCategoryReset: () => void;
	setValue: UseFormSetValue<any>;
}

const CategoryDropdown = ({
	categories,
	disabled,
	pendingCategories,
	pendingSubCategories,
	pendingSpecialities,
	openCategory,
	openSubCategory,
	anchorEl,
	handleCategoryDropdownClick,
	handleCategoryDropdownClose,
	setOpenCategory,
	setOpenSubCategory,
	handleCategoryApply,
	handleCategoryReset,
	setValue,
}: CategoryDropdownProps) => {
	const buttonLabel = useMemo(() => {
		const selections = [
			...pendingCategories,
			...pendingSubCategories,
			...pendingSpecialities,
		];

		if (selections.length === 0) return "گروه شغلی";

		if (selections.length >= 2) return `${selections.length} مورد`;

		if (pendingSpecialities.length === 1) {
			const speciality = categories
				.flatMap((cat) => cat.subCategories)
				.flatMap((sub) => sub.specialities)
				.find((spec) => spec.slug === pendingSpecialities[0]);
			return speciality?.name ?? pendingSpecialities[0];
		}

		if (pendingSubCategories.length === 1) {
			const subCategory = categories
				.flatMap((cat) => cat.subCategories)
				.find((sub) => sub.slug === pendingSubCategories[0]);
			return subCategory?.name ?? pendingSubCategories[0];
		}

		if (pendingCategories.length === 1) {
			const category = categories.find(
				(cat) => cat.slug === pendingCategories[0],
			);
			return category?.name ?? pendingCategories[0];
		}
	}, [
		categories,
		pendingCategories,
		pendingSubCategories,
		pendingSpecialities,
	]);

	return (
		<>
			<Button
				variant="muted"
				size="md"
				buttonType="button"
				onClick={handleCategoryDropdownClick}
				disabled={disabled}
				className="hidden md:flex w-[calc(100%/12*2.5)]"
			>
				<Icon
					icon="hugeicons:layers-01"
					className="text-neutral"
					width={20}
					height={20}
				/>
				<span
					className={cn(
						"w-full text-start text-base font-normal truncate",
						pendingCategories.length === 0 &&
							pendingSpecialities.length === 0 &&
							pendingSubCategories.length === 0
							? "text-neutral"
							: "text-primary",
					)}
				>
					{buttonLabel}
				</span>

				<Icon
					icon={"eva:arrow-ios-downward-outline"}
					width={20}
					height={20}
					className={cn(
						"transition-transform duration-300",
						anchorEl ? "rotate-180" : "rotate-0",
					)}
				/>
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleCategoryDropdownClose}
				PaperProps={{
					style: { minWidth: 320, maxHeight: 400, overflowY: "auto" },
				}}
			>
				<FormControl component="fieldset" className="w-full px-4 py-2">
					<FormLabel component="legend">دسته بندی و زیرمجموعه‌ها</FormLabel>
					<FormGroup>
						{categories.map((cat: any) => (
							<div key={cat.slug}>
								<div style={{ display: "flex", alignItems: "center" }}>
									<FormControlLabel
										control={
											<Checkbox
												checked={pendingCategories.includes(cat.slug)}
												onChange={(e) => {
													const checked = e.target.checked;
													setValue(
														"categories",
														checked
															? [...pendingCategories, cat.slug]
															: pendingCategories.filter(
																	(slug) => slug !== cat.slug,
																),
													);
												}}
											/>
										}
										label={cat.name}
									/>
									<IconButton
										aria-label={
											openCategory === cat.slug ? "Collapse" : "Expand"
										}
										onClick={() =>
											setOpenCategory(
												openCategory === cat.slug ? null : cat.slug,
											)
										}
										size="small"
									>
										{openCategory === cat.slug ? (
											<ExpandLessIcon />
										) : (
											<ExpandMoreIcon />
										)}
									</IconButton>
								</div>
								<Collapse
									in={openCategory === cat.slug}
									timeout="auto"
									unmountOnExit
								>
									{cat.subCategories?.map((sub: any) => (
										<div key={sub.slug} style={{ paddingLeft: 24 }}>
											<FormControlLabel
												control={
													<Checkbox
														checked={pendingSubCategories.includes(sub.slug)}
														onChange={(e) => {
															const checked = e.target.checked;
															setValue(
																"subCategories",
																checked
																	? [...pendingSubCategories, sub.slug]
																	: pendingSubCategories.filter(
																			(slug) => slug !== sub.slug,
																		),
															);
														}}
													/>
												}
												label={sub.name}
											/>
											<IconButton
												aria-label={
													openSubCategory === sub.slug ? "Collapse" : "Expand"
												}
												onClick={() =>
													setOpenSubCategory(
														openSubCategory === sub.slug ? null : sub.slug,
													)
												}
												size="small"
											>
												{openSubCategory === sub.slug ? (
													<ExpandLessIcon />
												) : (
													<ExpandMoreIcon />
												)}
											</IconButton>
											<Collapse
												in={openSubCategory === sub.slug}
												timeout="auto"
												unmountOnExit
											>
												{sub.specialities?.map((spec: any) => (
													<div key={spec.slug} style={{ paddingLeft: 24 }}>
														<FormControlLabel
															control={
																<Checkbox
																	checked={pendingSpecialities.includes(
																		spec.slug,
																	)}
																	onChange={(e) => {
																		const checked = e.target.checked;
																		setValue(
																			"specialities",
																			checked
																				? [...pendingSpecialities, spec.slug]
																				: pendingSpecialities.filter(
																						(slug) => slug !== spec.slug,
																					),
																		);
																	}}
																/>
															}
															label={spec.name}
														/>
													</div>
												))}
											</Collapse>
										</div>
									))}
								</Collapse>
							</div>
						))}
					</FormGroup>
					<div className="flex justify-between mt-4">
						<Button
							buttonType="button"
							onClick={handleCategoryApply}
							variant="accent"
						>
							اعمال
						</Button>
						<Button
							buttonType="button"
							onClick={handleCategoryReset}
							variant="accent"
						>
							ریست
						</Button>
					</div>
				</FormControl>
			</Menu>
		</>
	);
};

export default CategoryDropdown;
