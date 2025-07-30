import { AxiosResponse } from "axios";

import { apiEndpoints } from "@/constants/api-endpoints";
import type { ApiErrorResponse } from "@/types/api";
import { Category, Country, JobsResponse } from "@/types/job";
import { api } from "./axios";

export const jobsService = {
	getCategories: async (): Promise<AxiosResponse<Category[], any>> => {
		try {
			return await api.get<Category[]>(apiEndpoints.CATEGORIES);
		} catch (error: any) {
			throw {
				message: error.message || "Failed to fetch categories",
				code: error.code,
				status: error.status,
				details: error.details,
			} as ApiErrorResponse;
		}
	},
	getCountries: async (): Promise<AxiosResponse<Country[], any>> => {
		try {
			return await api.get<Country[]>(apiEndpoints.COUNTRIES);
		} catch (error: any) {
			throw {
				message: error.message || "Failed to fetch countries",
				code: error.code,
				status: error.status,
				details: error.details,
			} as ApiErrorResponse;
		}
	},
	getJobs: async (
		params: {
			page?: number;
			limit?: number;
			order?: "ASC" | "DESC";
			orderBy?: string;
			expired?: boolean;
		} = {},
	): Promise<JobsResponse> => {
		const { data } = await api.get<JobsResponse>(apiEndpoints.ALL_JOBS, {
			params,
		});

		return data;
	},
};
