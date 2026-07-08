module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],

  theme: {
    extend: {
      scale: {
        99: "0.995",
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Playfair Display", "ui-serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
