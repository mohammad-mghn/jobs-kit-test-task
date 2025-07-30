export type ApiErrorResponse = {
	message: string;
	code?: string;
	status?: number;
	details?: Record<string, any>;
};
