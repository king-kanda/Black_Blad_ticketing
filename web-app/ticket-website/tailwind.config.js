/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      container:{
        center : true,
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // This makes Poppins the default font
      },
      colors: {
        'angular-red': '#dd0031',
        'deep-black': '#03071e',
      },
    },
  },
  plugins: [],
}
