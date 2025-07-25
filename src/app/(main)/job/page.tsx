"use client";

import { Icon } from "@iconify/react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import FilterJobs from "@/components/jobs/FilterJobs/FilterJobs";
import JobCard from "@/components/jobs/JobCard";
import Pagination from "@/components/jobs/Pagination";
import Layout from "@/components/layout/Layout";
import { SORT_OPTIONS } from "@/constants/jobs-filters";
import { fetchJobs, Job, JobsResponse } from "@/utils/api";
import { cn } from "@/utils/cn";

export default function JobsPage() {
	const searchParams = useSearchParams();
	const initialPage = Number(searchParams.get("page")) || 1;
	const initialFilters = {
		title: searchParams.get("title") ?? "",
		categories:
			searchParams.get("categories")?.split(",").filter(Boolean) ?? [],
		subCategories:
			searchParams.get("subCategories")?.split(",").filter(Boolean) ?? [],
		specialities:
			searchParams.get("specialities")?.split(",").filter(Boolean) ?? [],
		countries: searchParams.get("countries")?.split(",").filter(Boolean) ?? [],
		expired: searchParams.get("expired") === "true",
		internship:
			searchParams.get("positionLevel")?.split(",").includes("INTERN") ?? false,
		jobTypes: searchParams.getAll("jobTypes") ?? [],
	};

	const [jobs, setJobs] = useState<Job[]>([]);
	const [page, setPage] = useState<number>(initialPage);
	const [totalPages, setTotalPages] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(false);
	const [hasPrevPage, setHasPrevPage] = useState(false);
	const [filters, setFilters] = useState<any>(initialFilters);
	const [orderBy, setOrderBy] = useState<string | undefined>("datePosted");
	const [anchorElSort, setAnchorElSort] = useState<null | HTMLElement>(null);

	const handleSortButtonClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElSort(event.currentTarget);
	};

	const handleSortMenuClose = () => {
		setAnchorElSort(null);
	};

	const handleSortSelect = (value: string | undefined) => {
		setOrderBy(value);
		setAnchorElSort(null);
	};

	function formatPersianCount(count: number): string {
		if (count >= 1_000_000) {
			const millions = (count / 1_000_000).toFixed(1).replace(/\.0$/, "");
			return `${millions.replace(/\./, ".")} میلیون`;
		} else if (count >= 1000) {
			const thousands = (count / 1000).toFixed(1).replace(/\.0$/, "");
			return `${thousands.replace(/\./, ".")} هزار`;
		}
		return `${count}`;
	}

	useEffect(() => {
		const fetchData = async () => {
			const params = {
				...filters,
				page,
				limit: 9,
				orderBy,
			};
			const jobsRes: JobsResponse = await fetchJobs(params);
			setJobs(jobsRes.data || []);
			setTotalPages(jobsRes.pagination?.totalPages || 1);
			setHasNextPage(!!jobsRes.pagination?.nextPage);
			setHasPrevPage(!!jobsRes.pagination?.prevPage);
		};
		fetchData();
	}, [filters, page, orderBy]);

	const handleFilter = (newFilters: any) => {
		setFilters(newFilters);
		setPage(1);
	};

	const totalCount = jobs.length + (totalPages - 1) * 9;

	function getPagination(current: number, total: number) {
		const pages: (number | string)[] = [];
		if (total <= 6) {
			for (let i = 1; i <= total; i++) pages.push(i);
			return pages;
		}
		if (current <= 3) {
			pages.push(1, 2, 3, 4, "...");
		} else if (current >= total - 2) {
			pages.push("...", total - 3, total - 2, total - 1, total);
		} else {
			pages.push("...", current - 1, current, current + 1, "...");
		}
		return pages;
	}

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<main>
			<FilterJobs onFilter={handleFilter} initialFilters={initialFilters} />

			<Layout>
				<div className="flex items-center justify-between mt-6 mb-2">
					<div className="sm:px-7 text-sm text-tertiary flex gap-1">
						<span>{formatPersianCount(totalCount)}</span>
						<span>نتیجه</span>
						<span className="hidden sm:inline-block">یافت شد</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="hidden sm:inline-block text-sm text-tertiary">
							مرتب سازی بر اساس :
						</span>
						<Button
							variant="outline"
							onClick={handleSortButtonClick}
							aria-controls={anchorElSort ? "sort-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={anchorElSort ? "true" : undefined}
							className="px-2 sm:px-3 py-1 sm:py-[5px] text-sm text-primary border-muted gap-2"
						>
							<span>
								{SORT_OPTIONS.find((opt) => opt.value === orderBy)?.label}
							</span>

							<Icon
								icon={"eva:arrow-ios-downward-outline"}
								width={20}
								height={20}
								className={cn(
									"transition-transform duration-300",
									anchorElSort ? "rotate-180" : "rotate-0",
								)}
							/>
						</Button>
						<Menu
							id="sort-menu"
							anchorEl={anchorElSort}
							open={Boolean(anchorElSort)}
							onClose={handleSortMenuClose}
							className="p-0"
						>
							{SORT_OPTIONS.map((opt) => (
								<MenuItem
									key={opt.value}
									selected={orderBy === opt.value}
									onClick={() => handleSortSelect(opt.value)}
								>
									{opt.label}
								</MenuItem>
							))}
						</Menu>
					</div>
				</div>

				<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{jobs.length > 0 ? (
						jobs.map((job) => (
							<JobCard key={job.id} job={job} expired={filters.expired} />
						))
					) : (
						<div>هیچ شغلی یافت نشد</div>
					)}
				</div>

				<Pagination
					page={page}
					totalPages={totalPages}
					hasPrevPage={hasPrevPage}
					hasNextPage={hasNextPage}
					onPageChange={handlePageChange}
					getPagination={getPagination}
				/>
			</Layout>
		</main>
	);
}
