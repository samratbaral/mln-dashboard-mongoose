/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../src/Public/**/*.{html,js,css}", "./views/**/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
