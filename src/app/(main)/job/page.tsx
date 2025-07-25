import JobDataFetcher from "@/components/jobs/JobsDataFetcher";
import { Suspense } from "react";

export default function JobsPage() {
	return (
		<Suspense fallback={<div>در حال بارگذاری...</div>}>
			<JobDataFetcher />
		</Suspense>
	);
}
