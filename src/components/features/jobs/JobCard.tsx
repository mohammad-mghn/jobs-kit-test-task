import { Job } from "@/types/job";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback } from "react";

import { SQUARED_FLAGS_COUNTRIES } from "@/constants/jobs-filter-options";
import { routes } from "@/constants/routes";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/format-date";
import Button from "../../ui/Button";

interface Detail {
	icon?: string;
	value: string;
	label: string;
}

interface JobCardProps {
	job: Job;
	expired?: boolean;
}

const JobCard: React.FC<JobCardProps> = memo(({ job, expired = false }) => {
	const country = SQUARED_FLAGS_COUNTRIES.find((c) => c.code === job.country);

	const details: Detail[] = [
		{ icon: "majesticons:suitcase", value: job.jobType, label: "Job Type" },
		{
			icon: "mdi:person-star",
			value:
				job.positionLevel === "UNKNOWN" ? "Not specified" : job.positionLevel,
			label: "Position Level",
		},
		{
			icon: "solar:clock-circle-bold",
			value: job.employmentType.replaceAll("_", " "),
			label: "Employment Type",
		},
		{
			icon: country?.icon,
			value: `${job.country}${job.location ? `, ${job.location}` : ""}`,
			label: "Location",
		},
		{ icon: "mdi:shape", value: job.category.name, label: "Category" },
		{
			icon: "mdi:shape-outline",
			value: job.subCategory.name,
			label: "Subcategory",
		},
	];

	const handleShare = useCallback(
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			e.stopPropagation();

			const shareUrl = `${window.location.origin}${routes.JOB(job.id.toString())}`;
			const shareData = {
				title: job.title,
				text: `Check out this job opportunity at ${job.company.name}`,
				url: shareUrl,
			};

			try {
				if (navigator.share) {
					await navigator.share(shareData);
				} else {
					await navigator.clipboard.writeText(shareUrl);
					alert("Job URL copied to clipboard!");
				}
			} catch (err) {
				console.error("Error sharing:", err);
			}
		},
		[job.id, job.title, job.company.name],
	);

	return (
		<div dir="ltr" className="relative h-full">
			<Link
				href={routes.JOB(job.id.toString())}
				className="h-full bg-light-background px-3 py-6 flex flex-col justify-between gap-y-6 shadow-dark rounded-2xl"
			>
				<div className="px-3 space-y-4">
					<Image
						src={job.company.imageURL}
						alt={`${job.company.name} logo`}
						width={48}
						height={48}
						sizes="48px"
						className="rounded-xl object-cover"
					/>

					<div className="space-y-1">
						<h2
							className={cn("text-base font-medium text-primary", {
								"line-through": expired,
							})}
						>
							{job.title}
						</h2>
						<Link
							href={routes.COMPANY(job.company.id.toString())}
							onClick={(e) => e.stopPropagation()}
							className="text-base font-semibold text-accent hover:underline"
						>
							{job.company.name}
						</Link>
						<p className="text-xs text-tertiary">
							Posted:{" "}
							<time dateTime={job.datePosted}>
								{formatDate(job.datePosted)}
							</time>
						</p>
					</div>
				</div>

				<ul
					className="border-t border-dashed border-t-[#919eab33] pt-4 px-3 pb-2 grid grid-cols-2 gap-y-3"
					aria-label="Job details"
				>
					{details.map(({ icon, value, label }, index) => (
						<li key={label} className="flex items-center gap-1 text-secondary">
							{icon && <Icon icon={icon} className="flex-shrink-0 w-4 h-4" />}
							<span
								className="text-xs truncate capitalize"
								title={value?.toLowerCase()}
							>
								{value?.toLowerCase()}
							</span>
							<span className="sr-only">{label}</span>
						</li>
					))}
				</ul>
			</Link>

			<Button
				variant="icon"
				size="sm-icon"
				aria-label="اشتراک گذاری"
				className="absolute top-2 right-3 w-8 h-8 hover:bg-primary/5"
				onClick={handleShare}
			>
				<Icon icon="solar:share-bold" className="text-[#c4cdd5]" />
			</Button>
		</div>
	);
});

JobCard.displayName = "JobCard";
export default JobCard;
