/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        'Dscreen': '100dvh'
      }, fontFamily: {
        relieve: ["MyFont", "sans-serif"],
        Gestura: ['Gestura Display TRIAL', "sans-serif"]
      },
    },
  },
  plugins: [],
};
