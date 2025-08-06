/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx,svelte,vue}",
    "./components/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Cinzel, serif",
        cinzel: "Cinzel, serif",
        inter: "Inter, sans-serif",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
