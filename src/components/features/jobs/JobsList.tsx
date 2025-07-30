import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Pagination from "@/components/common/Pagination";
import { jobsService } from "@/services/jobs";
import { FilterFormValues, Job, JobsResponse } from "@/types/job";
import JobCard from "./JobCard";
import JobCardLoading from "./JobCardLoading";

type JobsListProps = {
	filters: FilterFormValues;
	orderBy: string | undefined;
	onTotalCount?: (count: number) => void;
};

export default function JobsList({
	filters,
	orderBy,
	onTotalCount,
}: JobsListProps) {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(10);

	// Reset page to 1 when filters or orderBy change
	useEffect(() => {
		setPage(1);
	}, [filters, orderBy]);

	const { data, isLoading, isError, refetch } = useQuery<JobsResponse, Error>({
		queryKey: ["jobs", filters, orderBy, page],
		queryFn: () =>
			jobsService.getJobs({
				...filters,
				page,
				limit: 9,
				orderBy,
			}),
	});

	useEffect(() => {
		if (onTotalCount && data?.pagination.total !== undefined) {
			onTotalCount(data.pagination.total);
		}
	}, [data?.pagination.total, onTotalCount]);

	useEffect(() => {
		setTotalPages((prevValue) => data?.pagination.totalPages || prevValue);
	}, [data?.pagination.totalPages]);

	const hasPrevPage = page > 1;
	const hasNextPage = page < totalPages;

	if (isError) {
		return (
			<div className="text-red-500 p-4">
				خطا در دریافت اطلاعات شغل‌ها
				<button onClick={() => refetch()} className="ml-2 underline">
					تلاش مجدد
				</button>
			</div>
		);
	}

	if (!isLoading && (!data || !data.data || !data.data.length)) {
		return <div>هیچ شغلی یافت نشد</div>;
	}

	return (
		<>
			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{isLoading
					? [...new Array(9)].map((_, index) => <JobCardLoading key={index} />)
					: data?.data.map((job: Job) => (
							<JobCard key={job.id} job={job} expired={filters.expired} />
						))}
			</div>

			<Pagination
				page={page}
				totalPages={totalPages}
				hasPrevPage={hasPrevPage}
				hasNextPage={hasNextPage}
				onPageChange={setPage}
			/>
		</>
	);
}
