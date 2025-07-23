import type { Config } from "tailwindcss";

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				tertiary: "var(--color-tertiary)",
				accent: "var(--color-accent)",
				error: "var(--color-error)",
				muted: "var(--color-muted)",
				background: "var(--color-background)",
				"light-background": "var(--color-light-background)",
				"lighter-background": "var(--color-lighter-background)",
				"lightest-background": "var(--color-lightest-background)",
				"secondary-background": "var(--color-secondary-background)",
			},
			fontFamily: {
				sans: ["var(--font-yekan-bakh)", "sans-serif"],
				"yekan-bakh": ["var(--font-yekan-bakh)", "sans-serif"],
			},
		},
	},
	plugins: [],
};
