import { JobsResponse } from "@/types/job";
import axios from "axios";

export const api = axios.create({
	baseURL: "https://jobs-kit.com/api/",
	headers: {
		"Content-Type": "application/json",
	},
});

export const fetchJobs = async (
	params: {
		page?: number;
		limit?: number;
		order?: "ASC" | "DESC";
		orderBy?: string;
		expired?: boolean;
	} = {},
): Promise<JobsResponse> => {
	console.log("se");
	const { data } = await api.get<JobsResponse>("job/all", { params });
	return data;
};
