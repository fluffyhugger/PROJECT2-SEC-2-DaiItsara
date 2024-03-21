/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // Include Vue files (*.vue)
  // theme: {
  //   extend: {},
  //   colors: {
  //     nct: '#39FF14',
  //   },
  // },
  plugins: [require('daisyui'), require('@tailwindcss/aspect-ratio')],
}
