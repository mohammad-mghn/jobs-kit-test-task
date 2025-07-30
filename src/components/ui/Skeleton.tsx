import { cn } from "@/utils/cn";

const Skeleton = ({ className }: { className?: string }) => {
	return <span className={cn("block loading", className)} />;
};

export default Skeleton;
