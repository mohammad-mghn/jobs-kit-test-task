import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.licdn.com",
				port: "",
				pathname: "/dms/image/**",
			},
			{
				protocol: "https",
				hostname: "d2q79iu7y748jz.cloudfront.net",
				port: "",
				pathname: "/s/_squarelogo/**",
			},
			{
				protocol: "https",
				hostname: "static.licdn.com",
				port: "",
				pathname: "/aero-v1/sc/h/**",
			},
			{
				protocol: "https",
				hostname: "media.glassdoor.com",
				port: "",
				pathname: "/sql/**",
			},
		],
	},
};

export default nextConfig;
