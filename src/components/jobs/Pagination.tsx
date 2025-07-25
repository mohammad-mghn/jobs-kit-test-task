import { Icon } from "@iconify/react";
import React from "react";

import Button from "@/components/Button";

interface PaginationProps {
	page: number;
	totalPages: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	onPageChange: (page: number) => void;
	getPagination: (current: number, total: number) => (number | string)[];
}

const Pagination: React.FC<PaginationProps> = ({
	page,
	totalPages,
	hasPrevPage,
	hasNextPage,
	onPageChange,
	getPagination,
}) => (
	<div className="mt-6 flex justify-center gap-4">
		<Button
			variant="icon"
			disabled={!hasPrevPage || page === 1}
			onClick={() => onPageChange(page - 1)}
			className="p-0 w-[22px] h-[22px] hover:bg-primary/5 focus:bg-primary/10 text-sm text-muted rounded-md"
			aria-label="قبلی"
		>
			<Icon icon={"eva:arrow-ios-forward-outline"} width={21} height={21} />
		</Button>
		{getPagination(page, totalPages).map((p, idx) =>
			typeof p === "number" ? (
				<Button
					key={p}
					variant="icon"
					className={`p-0 w-[22px] h-[22px] hover:bg-primary/5 focus:bg-primary/10 text-sm opacity-100 rounded-md hover:bg-[#353F49] ${
						page === p && "bg-[#353F49] font-semibold"
					}`}
					onClick={() => onPageChange(p)}
					disabled={page === p}
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
			aria-label="بعدی"
		>
			<Icon icon={"eva:arrow-ios-back-outline"} width={21} height={21} />
		</Button>
	</div>
);

export default Pagination;
