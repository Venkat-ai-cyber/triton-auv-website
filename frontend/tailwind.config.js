/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: '#F5F8F8',
        glacier: '#E8F1F3',
        mist: '#EDF3F4',
        graphite: '#172832',
        darkocean: '#163C4B',
        tealmarine: '#087F83',
        oceangreen: '#14A9A0',
        aqua: '#66D4CF',
        coral: '#D98B73',
        silver: '#B9C7CC',
        ocean: {
          deep: '#163C4B',
          midnight: '#172832',
          blue: '#087F83',
          cyan: '#14A9A0',
          aqua: '#66D4CF',
          gold: '#D98B73',
          ice: '#F5F8F8'
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      backgroundImage: {
        'ocean-radial': 'radial-gradient(circle at 50% 20%, #E8F1F3 0%, #F5F8F8 80%)',
        'pearl-gradient': 'linear-gradient(180deg, #F5F8F8 0%, #E8F1F3 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(232, 241, 243, 0.96) 100%)'
      }
    },
  },
  plugins: [],
}
