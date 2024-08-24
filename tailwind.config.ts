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
        disable: "#B0B8C1",
        black: "#2C2C2C",
        "gray-0": "#F9FAFB",
        "gray-1": "#E5E8EB",
        "gray-2": "#A4ABB5",
        "gray-3": "#6B7684",
        "gray-4": "#676767",
      },
    },
  },
  plugins: [],
};
export default config;
