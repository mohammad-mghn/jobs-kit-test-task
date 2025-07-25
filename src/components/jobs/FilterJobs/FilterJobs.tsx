"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { COUNTRIES, JOBS_TYPE_OPTIONS } from "@/constants/jobs-filters";
import Button from "../../Button";
import Layout from "../../layout/Layout";
import CategoryDropdown from "./CategoryDropdown";
import CountryDropdown from "./CountryDropdown";
import ExpiredInternshipCheckboxes from "./ExpiredInternshipCheckboxes";
import JobTypeDropdown from "./JobTypeDropdown";
import TitleInput from "./TitleInput";

const fetchCategories = async () => {
	const res = await fetch("https://jobs-kit.com/api/category/category");
	return res.json();
};

const fetchCountries = async () => {
	const res = await fetch("https://jobs-kit.com/api/reference/country");
	return res.json();
};

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

interface FilterJobsProps {
	onFilter: (filters: any) => void;
	initialFilters: FilterFormValues;
}

const FilterJobs = ({ onFilter, initialFilters }: FilterJobsProps) => {
	const { control, handleSubmit, setValue, watch, reset } =
		useForm<FilterFormValues>({
			defaultValues: initialFilters,
		});
	const router = useRouter();
	const [categories, setCategories] = useState<any[]>([]);
	const [countries, setCountries] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [openCategory, setOpenCategory] = useState<string | null>(null);
	const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [anchorElCountry, setAnchorElCountry] = useState<null | HTMLElement>(
		null,
	);
	const [jobTypesDropdownOpen, setJobTypesDropdownOpen] = useState(false);
	const [pendingCategories, setPendingCategories] = useState<string[]>(
		initialFilters.categories,
	);
	const [pendingSubCategories, setPendingSubCategories] = useState<string[]>(
		initialFilters.subCategories,
	);
	const [pendingSpecialities, setPendingSpecialities] = useState<string[]>(
		initialFilters.specialities,
	);
	const [pendingJobTypes, setPendingJobTypes] = useState<string[]>(
		initialFilters.jobTypes,
	);

	const selectedCountryCount = watch("countries")?.length || 0;
	const selectedCategoryCount =
		pendingCategories.length +
		pendingSubCategories.length +
		pendingSpecialities.length;

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			const [categoryData, countryData] = await Promise.all([
				fetchCategories(),
				fetchCountries(),
			]);
			setCategories(categoryData || []);
			const supportedCountries = COUNTRIES.filter((country) =>
				countryData?.includes(country.code),
			);
			setCountries(supportedCountries);
			setLoading(false);
		};
		loadData();
	}, []);

	const updateSearchParams = useCallback(
		(filters: FilterFormValues) => {
			const params = new URLSearchParams();
			if (filters.title) params.set("title", filters.title);
			if (filters.categories.length)
				params.set("categories", filters.categories.join(","));
			if (filters.subCategories.length)
				params.set("subCategories", filters.subCategories.join(","));
			if (filters.specialities.length)
				params.set("specialities", filters.specialities.join(","));
			if (filters.countries.length)
				params.set("countries", filters.countries.join(","));
			if (filters.expired) params.set("expired", "true");
			if (filters.internship) params.set("positionLevel", "INTERN");
			if (filters.jobTypes.length) {
				filters.jobTypes.forEach((type) => params.append("jobTypes", type));
			}
			router.replace(`?${params.toString()}`);
		},
		[router],
	);

	const onSubmit = (data: FilterFormValues) => {
		const filters = {
			...data,
			categories: pendingCategories,
			subCategories: pendingSubCategories,
			specialities: pendingSpecialities,
			jobTypes: pendingJobTypes,
		};
		setValue("categories", pendingCategories);
		setValue("subCategories", pendingSubCategories);
		setValue("specialities", pendingSpecialities);
		setValue("jobTypes", pendingJobTypes);
		onFilter(filters);
		updateSearchParams(filters);
	};

	const handleParentReset = () => {
		const resetFilters = {
			title: "",
			categories: [],
			subCategories: [],
			specialities: [],
			countries: [],
			expired: false,
			internship: false,
			jobTypes: [],
		};
		setPendingCategories([]);
		setPendingSubCategories([]);
		setPendingSpecialities([]);
		setPendingJobTypes([]);
		reset(resetFilters);
		onFilter(resetFilters);
		router.replace("?");
	};

	const handleCategoryApply = () => {
		setValue("categories", pendingCategories);
		setValue("subCategories", pendingSubCategories);
		setValue("specialities", pendingSpecialities);
		setAnchorEl(null);
		const filters = {
			...watch(),
			categories: pendingCategories,
			subCategories: pendingSubCategories,
			specialities: pendingSpecialities,
		};
		onFilter(filters);
		updateSearchParams(filters);
	};

	const handleCategoryReset = () => {
		setPendingCategories([]);
		setPendingSubCategories([]);
		setPendingSpecialities([]);
		setValue("categories", []);
		setValue("subCategories", []);
		setValue("specialities", []);
		setAnchorEl(null);
		const filters = {
			...watch(),
			categories: [],
			subCategories: [],
			specialities: [],
		};
		onFilter(filters);
		updateSearchParams(filters);
	};

	const handleCountryReset = () => {
		setValue("countries", []);
		const filters = { ...watch(), countries: [] };
		onFilter(filters);
		updateSearchParams(filters);
	};

	const handleJobTypesApply = () => {
		setValue("jobTypes", pendingJobTypes);
		setJobTypesDropdownOpen(false);
		const filters = { ...watch(), jobTypes: pendingJobTypes };
		onFilter(filters);
		updateSearchParams(filters);
	};

	const handleJobTypesReset = () => {
		setPendingJobTypes([]);
		setValue("jobTypes", []);
		setJobTypesDropdownOpen(false);
		const filters = { ...watch(), jobTypes: [] };
		onFilter(filters);
		updateSearchParams(filters);
	};

	useEffect(() => {
		if (!loading) {
			handleSubmit(onSubmit)();
		}
	}, [watch("expired"), watch("internship"), loading]);

	return (
		<Layout className="px-0 sm:px-6 pt-1 sm:pt-[1.3675rem] sm:pb-6">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="w-full bg-light-background p-6 shadow-darker sm:rounded-2xl flex flex-col gap-4">
					<div className="flex items-center gap-4">
						<TitleInput control={control} />
						<CategoryDropdown
							categories={categories}
							pendingCategories={pendingCategories}
							pendingSubCategories={pendingSubCategories}
							pendingSpecialities={pendingSpecialities}
							openCategory={openCategory}
							openSubCategory={openSubCategory}
							anchorEl={anchorEl}
							handleCategoryDropdownClick={() =>
								setAnchorEl(document.activeElement as HTMLElement)
							}
							handleCategoryDropdownClose={() => setAnchorEl(null)}
							setPendingCategories={setPendingCategories}
							setPendingSubCategories={setPendingSubCategories}
							setPendingSpecialities={setPendingSpecialities}
							setOpenCategory={setOpenCategory}
							setOpenSubCategory={setOpenSubCategory}
							handleCategoryApply={handleCategoryApply}
							handleCategoryReset={handleCategoryReset}
						/>
						<CountryDropdown
							control={control}
							countryList={countries}
							selectedCountryCount={selectedCountryCount}
							anchorElCountry={anchorElCountry}
							handleCountryDropdownClick={() =>
								setAnchorElCountry(document.activeElement as HTMLElement)
							}
							handleCountryDropdownClose={() => setAnchorElCountry(null)}
							handleCountryReset={handleCountryReset}
							watch={watch}
						/>
						<Button
							buttonType="submit"
							size="md"
							className="hidden md:flex w-1/6"
						>
							جستجو در مشاغل
						</Button>
					</div>
					<div className="flex items-center justify-between gap-x-2">
						<div className="flex items-center gap-x-2">
							<Button
								variant="icon"
								size="sm-icon"
								buttonType="button"
								className="md:hidden text-accent w-9 h-9"
								onClick={handleParentReset}
							>
								<Icon icon={"mage:filter"} width={20} height={20} />
							</Button>
							<p className="hidden md:inline-block text-nowrap text-sm text-muted">
								فیلتر ها :
							</p>
							<div className="w-full flex items-center gap-2 flex-nowrap overflow-x-auto scroll-smooth">
								<ExpiredInternshipCheckboxes control={control} />
								<JobTypeDropdown
									jobTypeOptions={JOBS_TYPE_OPTIONS}
									pendingJobTypes={pendingJobTypes}
									jobTypesDropdownOpen={jobTypesDropdownOpen}
									handleJobTypesDropdownClick={() =>
										setJobTypesDropdownOpen(true)
									}
									handleJobTypesDropdownClose={() =>
										setJobTypesDropdownOpen(false)
									}
									setPendingJobTypes={setPendingJobTypes}
									setValue={setValue}
									handleJobTypesApply={handleJobTypesApply}
									handleJobTypesReset={handleJobTypesReset}
								/>
							</div>
						</div>
						<Button
							variant="outline"
							size="md"
							buttonType="button"
							className="hidden md:flex border-error py-1 px-2 text-error disabled:text-neutral disabled:border-neutral"
							onClick={handleParentReset}
							disabled={
								!Object.values(watch()).some((value) =>
									Array.isArray(value) ? value.length > 0 : value,
								)
							}
						>
							<span className="text-sm text-nowrap">پاک کردن</span>

							<Icon icon={"iconamoon:close"} width={16} height={16} />
						</Button>
					</div>
				</div>
			</form>
		</Layout>
	);
};

export default FilterJobs;
