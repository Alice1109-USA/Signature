/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,html,js}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF2FC",
          200: "#C3D0F5",
          400: "#3355C0",
          500: "#0A2896",
          600: "#071C6E",
          700: "#051652",
        },
        blue: {
          200: "#BFDCFB",
          300: "#7DB4F5",
          500: "#006EDC",
          600: "#0058B0",
        },
        cream: "#F6F8FC",
        blush: "#EDF2FA",
        espresso: "#10151F",
        stone: "#5B6472",
        pearl: "#E2E8F4",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "0 2px 10px rgba(10,40,150,.08)",
        md: "0 8px 32px rgba(10,40,150,.12)",
        lg: "0 20px 60px rgba(10,40,150,.16)",
      },
    },
  },
  plugins: [],
};
