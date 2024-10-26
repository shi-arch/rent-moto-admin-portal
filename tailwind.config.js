/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "lighter-gray": "#F5F7FB",
        "light-gray": "#FAFBFD",
        // "theme-blue": "#0077D6",
        "theme-blue": "#8286FB",
        // "theme-blue-light": "#009fea",
        "theme-blue-light": "#71A9FC",
        "theme-purple": "#7B96FF",
        "theme-purple-dark": "#0F0248",
        "theme-purple-light": "#58D3FF",
        "theme-cyan": "#00bfd9",
      },
    },
  },
  plugins: [],
};
