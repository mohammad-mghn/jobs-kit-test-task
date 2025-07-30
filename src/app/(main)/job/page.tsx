"use client";

import { useState } from "react";

import Layout from "@/components/common/layout/Layout";
import FilterJobs from "@/components/features/jobs/FilterJobs/FilterJobs";
import JobListHeader from "@/components/features/jobs/JobListHeader";
import JobsList from "@/components/features/jobs/JobsList";
import useJobFilters from "@/hooks/jobs/useJobFilters";
import { FilterFormValues } from "@/types/job";

export default function JobsPage() {
	const { filters, setFilters, initialFilters } = useJobFilters();

	const [orderBy, setOrderBy] = useState<string | undefined>("datePosted");
	const [anchorElSort, setAnchorElSort] = useState<null | HTMLElement>(null);
	const [totalCount, setTotalCount] = useState(0);

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

	const handleFilter = (newFilters: FilterFormValues) => {
		setFilters(newFilters);
	};
	console.log("koko", filters);

	return (
		<main>
			<FilterJobs onFilter={handleFilter} initialFilters={initialFilters} />

			<Layout>
				<JobListHeader
					totalCount={totalCount}
					orderBy={orderBy}
					anchorElSort={anchorElSort}
					handleSortButtonClick={handleSortButtonClick}
					handleSortMenuClose={handleSortMenuClose}
					handleSortSelect={handleSortSelect}
				/>

				<JobsList
					filters={filters}
					orderBy={orderBy}
					onTotalCount={setTotalCount}
				/>
			</Layout>
		</main>
	);
}
