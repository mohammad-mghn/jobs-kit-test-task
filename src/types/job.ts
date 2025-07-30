import { Pagination } from "./pagination";

export type Category = {
	id: number;
	name: string;
	slug: string;
	order: number;
};

export type Country = string;

export type Job = {
	id: number;
	title: string;
	featured: boolean;
	datePosted: string;
	expirationDate: string;
	employmentType: string;
	positionLevel: string;
	company: {
		id: number;
		name: string;
		industry: string;
		description: string | null;
		address: string | null;
		phone: string;
		email: string | null;
		size: number | null;
		imageId: number;
		imageURL: string;
	};
	country: string;
	location: string;
	category: Category;
	subCategory: {
		id: number;
		name: string;
		slug: string;
		order: number;
	};
	speciality: {
		id: number;
		name: string;
		slug: string;
		order: number;
	};
	jobType: string;
	views: number;
	shares: number;
};

export type JobsResponse = {
	data: Job[];
	pagination: Pagination;
};

export interface FilterFormValues {
	title: string;
	categories: string[];
	subCategories: string[];
	specialities: string[];
	countries: string[];
	expired: boolean;
	internship: boolean;
	jobTypes: string[];
}
