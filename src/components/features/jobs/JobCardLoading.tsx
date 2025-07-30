import Skeleton from "@/components/ui/Skeleton";
import React from "react";

const JobCardLoading = () => {
	return (
		<div className="h-full bg-light-background p-2 border border-secondary shadow-dark rounded-2xl">
			<Skeleton className="h-44 w-full rounded-2xl" />

			<div className="p-6 pt-4 flex items-center gap-4">
				<Skeleton className="flex-shrink-0 h-10 w-10 rounded-full" />
				<Skeleton className="flex-shrink-0 h-10 w-10 rounded-full" />
				<div className="w-full space-y-2">
					<Skeleton className="h-2.5 w-full rounded-2xl" />
					<Skeleton className="h-2.5 w-24 rounded-full" />
				</div>
			</div>
		</div>
	);
};

export default JobCardLoading;
