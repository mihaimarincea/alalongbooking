/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainbg: "#FAFBFC",
      },
      backgroundImage: {
        "white-to-transparent":
          "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
      },
    },
  },
  plugins: [],
};
