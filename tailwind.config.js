/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
      },
      fontWeight: {
        400: "400",
        500: "500",
        700: "700",
        900: "900",
      },
      fontStyle: {
        normal: "normal",
        italic: "italic",
      },
    },
  },
  plugins: [],
};
