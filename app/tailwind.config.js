/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#F97316',
        'background-dark': '#121212',
        'surface-dark': '#1E1E1E',
        'text-dark-primary': '#EAEAEA',
        'text-dark-secondary': '#A0A0A0',
        'background-light': '#F5F5F5',
        'surface-light': '#FFFFFF',
        'text-light-primary': '#1E1E1E',
        'text-light-secondary': '#6B7280',
      },
    },
  },
  plugins: [],
}