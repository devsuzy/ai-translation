import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
    extend: {
      colors: {
        primary: "#007BFF",
      },
    },
  },
  plugins: [],
};
export default config;
