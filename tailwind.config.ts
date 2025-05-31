import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          100: "#f7edd9",
          200: "#eedcb3",
          300: "#e5ca8d",
          400: "#dcb967",
          500: "#b89a4c", // Original amber shade
          600: "#997f3f",
          700: "#796432",
          800: "#594a25",
          900: "#3a3018",
        },
      },
    },
  },
  plugins: [],
};

export default config;
