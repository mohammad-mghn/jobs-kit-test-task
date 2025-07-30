export type Pagination = {
	page: number;
	limit: number;
	order: string;
	orderBy: string;
	total: number;
	totalPages: number;
	nextPage: boolean;
	prevPage: boolean;
};
