import { Job } from "@/utils/api";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

import { COUNTRIES } from "@/constants/jobs-filters";
import { PATHS } from "@/constants/routes";
import { cn } from "@/utils/cn";
import Button from "../Button";

interface JobCardProps {
	job: Job;
	expired?: boolean;
}

const JobCard: React.FC<JobCardProps> = memo(({ job, expired }) => {
	const country = COUNTRIES.find((country) => country.code === job.country);

	const details = [
		{
			icon: "majesticons:suitcase",
			value: job.jobType,
			label: "Job Type",
		},
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
		{
			icon: "mdi:shape",
			value: job.category.name,
			label: "Category",
		},
		{
			icon: "mdi:shape-outline",
			value: job.subCategory.name,
			label: "Subcategory",
		},
	];

	const handleShare = async () => {
		const shareUrl = `${window.location.origin}${PATHS.JOB(job.id.toString())}`;
		const shareData = {
			title: job.title,
			text: `Check out this job opportunity at ${job.company.name}`,
			url: shareUrl,
		};

		if (navigator.share) {
			try {
				await navigator.share(shareData);
			} catch (err) {
				console.error("Error sharing:", err);
			}
		} else {
			// Fallback: Copy URL to clipboard
			await navigator.clipboard.writeText(shareUrl);
			alert("Job URL copied to clipboard!");
		}
	};

	return (
		<div>
			<Link
				href={PATHS.JOB(job.id.toString())}
				dir="ltr"
				className="relative h-full bg-light-background px-3 flex flex-col justify-between gap-y-6 shadow-dark rounded-2xl"
			>
				<div className="pt-6 px-3">
					<figure className="w-12 h-12 rounded-xl overflow-hidden">
						<Image
							src={job.company.imageURL}
							alt={`${job.company.name} logo`}
							width={100}
							height={100}
							sizes="100px"
							className="object-cover"
							priority={false}
						/>
					</figure>

					<div className="mt-4">
						<h2
							className={cn(
								"text-base font-medium text-primary",
								expired && "line-through",
							)}
						>
							{job.title}
						</h2>
						<Link
							href={PATHS.COMPANY(job.company.id.toString())}
							onClick={(e) => {
								e.stopPropagation();
							}}
							className="text-base font-semibold text-accent cursor-pointer hover:underline"
						>
							{job.company.name}
						</Link>
						<p className="mt-1 text-xs text-tertiary">
							Posted date:{" "}
							<time dateTime={job.datePosted}>
								{new Date(job.datePosted).toLocaleDateString("en-GB", {
									day: "numeric",
									month: "short",
									year: "numeric",
								})}
							</time>
						</p>
					</div>
				</div>

				<ul
					className="border-t border-dashed border-t-[#919eab33] pt-4 px-3 pb-8 grid grid-cols-2 gap-y-3"
					aria-label="Job details"
				>
					{details.map(({ icon, value, label }, index) => (
						<li key={index} className="flex items-center gap-1 text-secondary">
							{icon && (
								<Icon
									icon={icon}
									className="flex-shrink-0 w-4 h-4"
									width={16}
									height={16}
									aria-hidden="true"
								/>
							)}
							<span
								className="text-xs truncate capitalize"
								title={value.toLowerCase() || "-"}
							>
								{value.toLowerCase() || "-"}
							</span>
							<span className="sr-only">{label}</span>
						</li>
					))}
				</ul>
			</Link>

			<Button
				variant="icon"
				size="sm-icon"
				aria-label={"اشتراک گذاری"}
				className="absolute top-2 right-3 w-8 h-8 hover:bg-primary/[2.5%]"
				onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
					e.preventDefault();
					e.stopPropagation();
					handleShare();
				}}
			>
				<Icon icon="solar:share-bold" className="text-[#c4cdd5]" />
			</Button>
		</div>
	);
});

export default JobCard;
