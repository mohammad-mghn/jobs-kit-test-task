import localFont from "next/font/local";

export const iranYekan = localFont({
	src: [
		{
			path: "./iran-yekan/IRANYekanX-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./iran-yekan/IRANYekanX-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "./iran-yekan/IRANYekanX-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "./iran-yekan/IRANYekanX-Black.ttf",
			weight: "900",
			style: "normal",
		},
	],
	variable: "--font-iran-yekan",
	display: "swap",
});

export const circularStd = localFont({
	src: [
		{
			path: "./circular-std/circular-std-medium-500.ttf",
			weight: "500",
			style: "normal",
		},
	],
	variable: "--font-circular-std",
	display: "swap",
});
