import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "oye-black": "#121212",
        "oye-red": "#ED1C24",
        "oye-dark": "#1a1a1a",
        "oye-card": "#282828",
        "oye-hover": "#3E3E3E",
      },
    },
  },
  plugins: [],
};
export default config;
