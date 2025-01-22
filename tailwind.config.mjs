/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    screens: {
      player: "50em",
      lg: "1024px",
      mb: "362px",
    },
  },
  plugins: [],
};
