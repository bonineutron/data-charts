/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#2980B9',
        'secondary-color': '#C0392B'
      },
      boxShadow: {
        'invert-lg': '0 -10px 15px -3px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: []
};
