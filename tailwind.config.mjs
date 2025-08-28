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
      heading: ["Cinzel", "sans-serif"],
      body: ["Inter", "sans-serif"],
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.zinc.400"),
            "--tw-prose-headings": theme("colors.zinc.200"),
            "--tw-prose-lead": theme("colors.zinc.400"),
            "--tw-prose-links": theme("colors.yellow.400"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.zinc.500"),
            "--tw-prose-bullets": theme("colors.zinc.300"),
            "--tw-prose-hr": theme("colors.zinc.700"),
            "--tw-prose-quotes": theme("colors.zinc.200"),
            "--tw-prose-quote-borders": theme("colors.zinc.700"),
            "--tw-prose-captions": theme("colors.zinc.500"),
            "--tw-prose-code": theme("colors.yellow.300"), // Untuk inline code
            "--tw-prose-pre-code": theme("colors.zinc.300"), // Untuk blok kode
            "--tw-prose-pre-bg": theme("colors.zinc.800"), // Untuk latar belakang blok kode
            "--tw-prose-th-borders": theme("colors.zinc.600"),
            "--tw-prose-td-borders": theme("colors.zinc.700"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};