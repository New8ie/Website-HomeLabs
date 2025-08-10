/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    fontFamily: {
      heading: ["Inter", "sans-serif"],
      body: ["Cinzel", "serif"],
      cinzel: ["Cinzel", "serif"],
      inter: ["Inter", "sans-serif"],
    },
    container: {
      center: true,
      padding: {
        sm: "1.5rem",
        md: "2rem",
        lg: "5.5rem",
      },
    },
    extend: {
      colors: {
        yellow: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          900: "#78350f",
        },
        zinc: {
          800: "#27272a",
          900: "#18181b",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
