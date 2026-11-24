/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: '#061B2B',
          midnight: '#092C46',
          blue: '#087EAB',
          cyan: '#00D4FF',
          aqua: '#26E6D1',
          gold: '#D7A747',
          ice: '#EFF8FC'
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'ocean-radial': 'radial-gradient(circle at 50% 20%, #092C46 0%, #061B2B 80%)',
        'card-gradient': 'linear-gradient(180deg, rgba(12, 52, 82, 0.7) 0%, rgba(6, 27, 43, 0.9) 100%)'
      }
    },
  },
  plugins: [],
}
