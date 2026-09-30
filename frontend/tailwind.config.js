/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            navy: { 900: '#0f1729', 800: '#1a2744', 700: '#243461' },
            slate: { 50: '#f8fafc' }
        }
    },
  },
  plugins: [],
}
