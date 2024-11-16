import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{html,ts}",
	],
	prefix: "",
} satisfies Config;

export default config;