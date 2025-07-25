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
	category: {
		id: number;
		name: string;
		slug: string;
		icon: string | null;
		order: number;
	};
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
	pagination: {
		page: number;
		limit: number;
		order: string;
		orderBy: string;
		total: number;
		totalPages: number;
		nextPage: boolean;
		prevPage: boolean;
	};
};
