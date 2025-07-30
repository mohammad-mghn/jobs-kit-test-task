import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { FilterFormValues } from "@/types/job";

function useJobFilters() {
	const searchParams = useSearchParams();
	const initialFilters: FilterFormValues = {
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
	const [filters, setFilters] = useState<FilterFormValues>(initialFilters);
	return { filters, setFilters, initialFilters };
}

export default useJobFilters;
