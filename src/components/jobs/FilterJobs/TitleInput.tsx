import { Icon } from "@iconify/react";
import { Control, Controller } from "react-hook-form";

interface FilterFormValues {
	title: string;
	categories: string[];
	subCategories: string[];
	specialities: string[];
	countries: string[];
	expired: boolean;
	internship: boolean;
	jobTypes: string[];
}

interface TitleInputProps {
	control: Control<FilterFormValues>;
}

const TitleInput = ({ control }: TitleInputProps) => (
	<Controller
		name="title"
		control={control}
		render={({ field }) => (
			<label
				htmlFor="title"
				className="w-full md:w-5/12 bg-lighter-background p-3 flex items-center gap-x-3 rounded-lg"
			>
				<Icon
					icon="hugeicons:job-search"
					className="text-neutral"
					width={20}
					height={20}
				/>
				<input
					{...field}
					id="title"
					value={field.value ?? ""}
					placeholder="جستجو عنوان شغل یا شرکت"
					className="w-full bg-transparent text-primary placeholder:text-neutral !border-none !outline-none"
					onChange={(e) => {
						field.onChange(e);
					}}
				/>
			</label>
		)}
	/>
);

export default TitleInput;
