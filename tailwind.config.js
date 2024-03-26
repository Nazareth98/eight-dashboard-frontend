/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      colors: {
        gray: {
          50: "#E5F0E4",
          100: "#DBE5DA",
          200: "#C2CCC2",
          300: "#AAB2AA",
          400: "#929991",
          500: "#7A8079",
          600: "#616661",
          700: "#494D49",
          800: "#313330",
          900: "#1D1F1D",
          950: "#131413",
        },
        primary: {
          50: "#CAFFC7",
          100: "#AEF6A8",
          200: "#79E771",
          300: "#59D950",
          400: "#45C93B",
          500: "#36BC2D",
          600: "#29AD20",
          700: "#15880C",
          800: "#0A6C04",
          900: "#055200",
          950: "#043800",
          // Adding extra dark green
        },
      },
    },
  },
  plugins: [],
};
