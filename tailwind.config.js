/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-grey': '#b9c6c8',
        'brown-ish': '#8f8578',
        'dark-blue': '#1d2c36',
        'light-grey-darker': '#a0b0b2', 
        'brown-ish-lighter': '#a39b90',
      },
    },
  },
  plugins: [],
}