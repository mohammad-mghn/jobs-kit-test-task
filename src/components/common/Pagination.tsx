import { Icon } from "@iconify/react";
import React from "react";

import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface PaginationProps {
	page: number;
	totalPages: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	page,
	totalPages,
	hasPrevPage,
	hasNextPage,
	onPageChange,
}) => {
	function getPagination(current: number, total: number) {
		// Returns an array of page numbers and ellipsis for pagination display
		const pages: (number | string)[] = [];
		if (total <= 6) {
			for (let i = 1; i <= total; i++) pages.push(i);
			return pages;
		}
		if (current <= 3) {
			pages.push(1, 2, 3, 4, "...");
		} else if (current >= total - 2) {
			pages.push("...", total - 3, total - 2, total - 1, total);
		} else {
			pages.push("...", current - 1, current, current + 1, "...");
		}
		return pages;
	}

	return (
		<div className="mt-6 flex justify-center gap-4">
			<Button
				variant="icon"
				disabled={!hasPrevPage || page === 1}
				onClick={() => onPageChange(page - 1)}
				className="p-0 w-[22px] h-[22px] hover:bg-primary/5 focus:bg-primary/10 text-sm text-muted rounded-md"
				aria-label="صفحه قبلی"
			>
				<Icon icon={"eva:arrow-ios-forward-outline"} width={21} height={21} />
			</Button>

			{getPagination(page, totalPages).map((p, idx) =>
				typeof p === "number" ? (
					<Button
						key={"page-" + p}
						variant="icon"
						className={cn(
							"p-0 w-[22px] h-[22px] focus:bg-primary/10 text-sm opacity-100 rounded-md hover:bg-[#353F49]",
							page === p && "!bg-[#353F49] font-semibold",
						)}
						onClick={() => onPageChange(p)}
					>
						<span>{p}</span>
					</Button>
				) : (
					<span key={"ellipsis-" + idx} className="text-primary text-sm">
						...
					</span>
				),
			)}

			<Button
				variant="icon"
				disabled={!hasNextPage || page === totalPages}
				onClick={() => onPageChange(page + 1)}
				className="p-0 w-[22px] h-[22px] hover:bg-primary/5 focus:bg-primary/10 text-sm text-muted rounded-md"
				aria-label="صفحه بعدی"
			>
				<Icon icon={"eva:arrow-ios-back-outline"} width={21} height={21} />
			</Button>
		</div>
	);
};

export default Pagination;
