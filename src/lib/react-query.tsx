"use client";

import {
	QueryClient,
	QueryClientProvider,
	DefaultOptions,
} from "@tanstack/react-query";
import React, { ReactNode } from "react";

const defaultQueryOptions: DefaultOptions = {
	queries: {
		retry: 2,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5, // 5 minutes
	},
	mutations: {
		retry: 1,
	},
};

export const queryClient = new QueryClient({
	defaultOptions: defaultQueryOptions,
});

export function ReactQueryProvider({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
