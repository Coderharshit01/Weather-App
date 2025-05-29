/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to scan all JS/JSX/TS/TSX files in src
    "./public/index.html" // Include your HTML file too
  ],
  theme: {
    extend: {}, // You can extend default theme here
  },
  plugins: [], // Add Tailwind plugins here if needed
}