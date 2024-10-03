/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,json}'],
  important: '#root',
  theme: {
    extend: {},
  },
  plugins: [],
}

