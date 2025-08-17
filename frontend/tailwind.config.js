/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/**/*.{js,jsx,ts,tsx,md,mdx}`
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0ea5e9',
          dark: '#0369a1'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

