import axios from "axios";

export const api = axios.create({
	baseURL: "https://jobs-kit.com/api/",
	headers: {
		"Content-Type": "application/json",
	},
});
