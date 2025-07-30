import { circularStd, iranYekan } from "@/lib/fonts";
import type { Metadata } from "next";

import { ReactQueryProvider } from "@/lib/react-query";
import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "جابزکیت - پلتفرم کاریابی بین المللی و دلاری برای ایرانیان",
	description:
		"جابزکیت، مرجع تخصصی فرصت‌های شغلی بین‌المللی برای ایرانیان. آگهی‌های استخدامی ریموت، جاب‌آفر با ویزای کاری و موقعیت‌های جذاب کاری در سراسر جهان.",
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: "Freelance Software Engineer | جابزکیت",
		siteName: "JobsKit",
		locale: "fa_IR",
		type: "article",
		url: "https://jobs-kit.com/job/967303/",
		images: [
			{
				url: "https://jobs-kit.com/api/job/967303/image",
				width: 500,
				height: 309,
				alt: "فرصت شغلی Freelance Software Engineer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@jobs_kitt",
		title: "Freelance Software Engineer | جابزکیت",
		images: ["https://jobs-kit.com/api/job/967303/image"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fa" dir="rtl">
			<head>
				<meta name="robots" content="noindex, nofollow" />
				<meta name="og:locale" content="fa_IR" />
				<meta name="og:site_name" content="JobsKit" />
				<meta
					property="og:title"
					content="Freelance Software Engineer | جابزکیت"
				/>
				<meta property="og:url" content="https://jobs-kit.com/job/967303/" />
				<meta property="og:site_name" content="JobsKit" />
				<meta property="og:locale" content="fa_IR" />
				<meta
					property="og:image"
					content="https://jobs-kit.com/api/job/967303/image"
				/>
				<meta property="og:image:width" content="500" />
				<meta property="og:image:height" content="309" />
				<meta
					property="og:image:alt"
					content="فرصت شغلی Freelance Software Engineer"
				/>
				<meta property="og:type" content="article" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@jobs_kitt" />
				<meta
					name="twitter:title"
					content="Freelance Software Engineer | جابزکیت"
				/>
				<meta
					name="twitter:image"
					content="https://jobs-kit.com/api/job/967303/image"
				/>
			</head>
			<body
				className={`${iranYekan.variable} ${circularStd.variable} font-main bg-background antialiased`}
			>
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</body>
		</html>
	);
}
