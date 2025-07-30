module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: "#ffffff",
				secondary: "#dfe3e8",
				tertiary: "#a5aeb7",
				accent: "#00996d",
				"dark-accent": "#007967",
				error: "#f44640",
				muted: "#747b88",
				neutral: "#717D8B",
				background: "#161c23",
				"light-background": "#212b36",
				"lighter-background": "#3c4856",
				"lightest-background": "#4f5e6e",
				"secondary-background": "#d9d9d9",
			},
			maxWidth: {
				"screen-lg": "1232px",
			},
			fontFamily: {
				main: [
					"var(--font-iran-yekan)",
					"var(--font-circular-std)",
					"sans-serif",
				],
				"iran-yekan": ["var(--font-iran-yekan)", "sans-serif"],
				"circular-std": ["var(--font-circular-std)", "sans-serif"],
			},
			borderColor: {
				secondary: "#919eab29",
			},
			boxShadow: {
				darker:
					"0px 0px 2px 0px rgba(0,0,0,0.2), 0px 12px 24px -4px rgba(0,0,0,0.12)",
				dark: "rgba(0, 0, 0, 0.12) 0px 1px 3px",
			},
		},
		screens: {
			lg: "1020px",
			md: "900px",
			sm: "600px",
		},
	},
	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function ({ addUtilities }: any) {
			const newUtilities = {
				".bg-red-cyan": {
					backgroundImage:
						"url('/images/cyan-blur.svg'), url('/images/red-blur.svg')",
					backgroundSize: "50%, 50%",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "right top, left bottom",
				},
			};
			addUtilities(newUtilities, ["responsive", "hover"]);
		},
	],
};
