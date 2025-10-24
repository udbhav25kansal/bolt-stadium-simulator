/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stadium-base': '#E5E7EB',
        'stadium-field': '#10B981',
        'stadium-premium': '#FBBF24',
        'stadium-express': '#8B5CF6',
        'stadium-osb': '#3B82F6',
        'stadium-queue': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
