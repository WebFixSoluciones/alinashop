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
        alina: {
          50: "#fff1f6",
          100: "#fde5f0",
          200: "#fccce2",
          300: "#faa2cb",
          400: "#f469aa",
          500: "#e83d84",
          600: "#d3226a",
          700: "#b51453",
          800: "#951445",
          900: "#7c153c",
          950: "#4b0520",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
