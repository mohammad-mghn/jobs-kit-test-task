import localFont from "next/font/local";

export const yekanBakh = localFont({
	src: [
		{
			path: "./yekan-bakh/yekan-bakh-regular.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-yekan-bakh",
	display: "swap",
});
