import { Icon } from "@iconify/react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@/components/ui/Button";
import { SORT_OPTIONS } from "@/constants/jobs-filter-options";
import { cn } from "@/utils/cn";

interface JobListHeaderProps {
	totalCount: number;
	orderBy: string | undefined;
	anchorElSort: null | HTMLElement;
	handleSortButtonClick: (event: React.MouseEvent<HTMLElement>) => void;
	handleSortMenuClose: () => void;
	handleSortSelect: (value: string | undefined) => void;
}

function formatPersianCount(count: number): string {
	if (count >= 1_000_000) {
		const millions = (count / 1_000_000).toFixed(1).replace(/\.0$/, "");
		return `${millions.replace(/\./, ".")} میلیون`;
	} else if (count >= 1000) {
		const thousands = (count / 1000).toFixed(1).replace(/\.0$/, "");
		return `${thousands.replace(/\./, ".")} هزار`;
	}
	return `${count}`;
}

const JobListHeader = ({
	totalCount,
	orderBy,
	anchorElSort,
	handleSortButtonClick,
	handleSortMenuClose,
	handleSortSelect,
}: JobListHeaderProps) => {
	return (
		<div className="flex items-center justify-between mt-6 mb-2">
			<div className="sm:px-7 text-sm text-tertiary flex gap-1">
				<span>{formatPersianCount(totalCount)}</span>
				<span>نتیجه</span>
				<span className="hidden sm:inline-block">یافت شد</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="hidden sm:inline-block text-sm text-tertiary">
					مرتب سازی بر اساس :
				</span>
				<Button
					variant="outline"
					onClick={handleSortButtonClick}
					aria-controls={anchorElSort ? "sort-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={anchorElSort ? "true" : undefined}
					className="px-2 sm:px-3 py-1 sm:py-[5px] text-sm text-primary border-muted gap-2"
				>
					<span>
						{SORT_OPTIONS.find((opt) => opt.value === orderBy)?.label}
					</span>
					<Icon
						icon={"eva:arrow-ios-downward-outline"}
						width={20}
						height={20}
						className={cn(
							"transition-transform duration-300",
							anchorElSort ? "rotate-180" : "rotate-0",
						)}
					/>
				</Button>
				<Menu
					id="sort-menu"
					anchorEl={anchorElSort}
					open={Boolean(anchorElSort)}
					onClose={handleSortMenuClose}
					className="p-0"
				>
					{SORT_OPTIONS.map((opt) => (
						<MenuItem
							key={opt.value}
							selected={orderBy === opt.value}
							onClick={() => handleSortSelect(opt.value)}
						>
							{opt.label}
						</MenuItem>
					))}
				</Menu>
			</div>
		</div>
	);
};

export default JobListHeader;
