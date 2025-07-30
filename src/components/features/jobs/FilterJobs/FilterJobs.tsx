"use client";

import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Layout from "@/components/common/layout/Layout";
import Button from "@/components/ui/Button";
import CheckboxButton from "@/components/ui/CheckboxButton";
import Input from "@/components/ui/Input";
import { COUNTRIES, JOBS_TYPE_OPTIONS } from "@/constants/jobs-filter-options";
import { jobsService } from "@/services/jobs";
import { FilterFormValues } from "@/types/job";
import CategoryDropdown from "./CategoryDropdown";
import CountryDropdown from "./CountryDropdown";
import JobTypeDropdown from "./JobTypeDropdown";

// Define query functions outside the component
const fetchCategories = async () => {
	const res = await jobsService.getCategories();
	return res.data || [];
};

const fetchCountries = async () => {
	const res = await jobsService.getCountries();
	return res.data || [];
};

interface FilterJobsProps {
	onFilter: (filters: FilterFormValues) => void;
	initialFilters: FilterFormValues;
}

const FilterJobs = ({ onFilter, initialFilters }: FilterJobsProps) => {
	const { control, handleSubmit, setValue, watch, reset } =
		useForm<FilterFormValues>({
			defaultValues: initialFilters,
		});
	const router = useRouter();
	const [openCategory, setOpenCategory] = useState<string | null>(null);
	const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [anchorElCountry, setAnchorElCountry] = useState<null | HTMLElement>(
		null,
	);
	const [jobTypesDropdownOpen, setJobTypesDropdownOpen] = useState(false);
	const [countries, setCountries] = useState<any[]>([]); // State for filtered countries

	const selectedCountryCount = watch("countries")?.length || 0;

	// Fetch categories and countries using React Query
	const {
		data: categories = [],
		isLoading: isCategoriesLoading,
		isError: isCategoriesError,
		error: categoriesError,
	} = useQuery<any[], Error>({
		queryKey: ["categories"],
		queryFn: fetchCategories,
		retry: 2,
		refetchOnWindowFocus: false,
	});

	const {
		data: apiCountries = [],
		isLoading: isCountriesLoading,
		isError: isCountriesError,
		error: countriesError,
	} = useQuery<string[], Error>({
		queryKey: ["countries"],
		queryFn: fetchCountries,
		retry: 2,
		refetchOnWindowFocus: false,
	});

	// Filter COUNTRIES based on apiCountries
	useEffect(() => {
		if (apiCountries.length > 0) {
			const supportedCountries = COUNTRIES.filter((country) =>
				apiCountries.includes(country.code),
			);
			setCountries(supportedCountries);
		} else {
			setCountries([]);
		}
	}, [apiCountries]);

	const isLoading = isCategoriesLoading || isCountriesLoading;
	const isError = isCategoriesError || isCountriesError;

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
		onFilter(data);
		updateSearchParams(data);
	};

	const handleParentReset = () => {
		const resetFilters: FilterFormValues = {
			title: "",
			categories: [],
			subCategories: [],
			specialities: [],
			countries: [],
			expired: false,
			internship: false,
			jobTypes: [],
		};
		reset(resetFilters);
		onFilter(resetFilters);
		router.replace("?");
	};

	const handleCategoryApply = () => {
		const categories = watch("categories") || [];
		const subCategories = watch("subCategories") || [];
		const specialities = watch("specialities") || [];
		setAnchorEl(null);
		const filters = { ...watch(), categories, subCategories, specialities };
		onFilter(filters);
		updateSearchParams(filters);
	};

	const handleCategoryReset = () => {
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
		const jobTypes = watch("jobTypes") || [];
		setJobTypesDropdownOpen(false);
		const filters = { ...watch(), jobTypes };
		onFilter(filters);
		updateSearchParams(filters);
	};

	const handleJobTypesReset = () => {
		setValue("jobTypes", []);
		setJobTypesDropdownOpen(false);
		const filters = { ...watch(), jobTypes: [] };
		onFilter(filters);
		updateSearchParams(filters);
	};

	// Trigger submit when 'expired' or 'internship' changes
	useEffect(() => {
		if (!isLoading) {
			handleSubmit(onSubmit)();
		}
	}, [watch("expired"), watch("internship"), isLoading, handleSubmit]);

	if (isError) {
		return (
			<Layout className="px-0 sm:px-6 pt-1 sm:pt-[1.3675rem] sm:pb-6">
				<div className="text-red-500 p-4">
					خطا در بارگذاری داده‌ها: {(categoriesError || countriesError)?.message}
				</div>
			</Layout>
		);
	}

	return (
		<Layout className="px-0 sm:px-6 pt-1 sm:pt-[1.3675rem] sm:pb-6">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="w-full bg-light-background p-6 shadow-darker sm:rounded-2xl flex flex-col gap-4">
					<div className="flex items-center gap-4">
						<Input
							id="title"
							icon="hugeicons:job-search"
							placeholder="جستجو عنوان شغل یا شرکت"
							control={control}
							disabled={isLoading}
						/>
						<CategoryDropdown
							categories={categories}
							pendingCategories={watch("categories") || []}
							pendingSubCategories={watch("subCategories") || []}
							pendingSpecialities={watch("specialities") || []}
							openCategory={openCategory}
							openSubCategory={openSubCategory}
							anchorEl={anchorEl}
							handleCategoryDropdownClick={() =>
								setAnchorEl(document.activeElement as HTMLElement)
							}
							handleCategoryDropdownClose={() => setAnchorEl(null)}
							setOpenCategory={setOpenCategory}
							setOpenSubCategory={setOpenSubCategory}
							handleCategoryApply={handleCategoryApply}
							handleCategoryReset={handleCategoryReset}
							setValue={setValue}
							disabled={isLoading}
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
							disabled={isLoading}
						/>
						<Button
							buttonType="submit"
							size="md"
							className="hidden md:flex w-1/6"
							disabled={isLoading}
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
								disabled={isLoading}
							>
								<Icon icon={"mage:filter"} width={20} height={20} />
							</Button>
							<p className="hidden md:inline-block text-nowrap text-sm text-muted">
								فیلتر ها :
							</p>
							<div className="w-full flex items-center gap-2 flex-nowrap overflow-x-auto scroll-smooth">
								<CheckboxButton
									control={control}
									name="expired"
									label="منقضی شده"
									disabled={isLoading}
								/>
								<CheckboxButton
									control={control}
									name="internship"
									label="کارآموزی"
									disabled={isLoading}
								/>
								<JobTypeDropdown
									jobTypeOptions={JOBS_TYPE_OPTIONS}
									jobTypes={watch("jobTypes") || []}
									jobTypesDropdownOpen={jobTypesDropdownOpen}
									handleJobTypesDropdownClick={() =>
										setJobTypesDropdownOpen(true)
									}
									handleJobTypesDropdownClose={() =>
										setJobTypesDropdownOpen(false)
									}
									handleJobTypesApply={handleJobTypesApply}
									handleJobTypesReset={handleJobTypesReset}
									setValue={setValue}
									disabled={isLoading}
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
								isLoading ||
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
