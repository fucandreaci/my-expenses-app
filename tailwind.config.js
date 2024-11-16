/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#86C5E9',
          DEFAULT: '#2A9D8F',
          dark: '#1E7870',
        },
        secondary: {
          light: '#FFD6A5',
          DEFAULT: '#FF9F1C',
          dark: '#CC7A17',
        },
        neutral: {
          light: '#F4F4F4',
          DEFAULT: '#A9A9A9',
          dark: '#5C5C5C',
        },
        success: '#28A745',
        error: '#DC3545',
        warning: '#FFC107',
        info: '#17A2B8',
      },
    },
  },
  plugins: [],
}
