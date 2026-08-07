/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,html,js}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FBF6EE",
          200: "#F4EBDA",
        },
        espresso: {
          400: "#5A4F45",
          500: "#3E362E",
          600: "#2B2420",
          700: "#1C1815",
        },
        sage: {
          50: "#F1F4EC",
          200: "#D7DFC9",
          400: "#9DAD87",
          500: "#7C8B6F",
          600: "#647159",
        },
        gold: {
          300: "#D9BD8C",
          400: "#C7A468",
          500: "#B8935F",
          600: "#93754C",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        squircle: "2rem",
      },
      boxShadow: {
        soft: "0 30px 60px -20px rgba(43, 36, 32, 0.18)",
        "soft-sm": "0 12px 30px -12px rgba(43, 36, 32, 0.15)",
        "inner-hi": "inset 0 1px 1px rgba(255,255,255,0.4)",
      },
      transitionTimingFunction: {
        fluid: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};
