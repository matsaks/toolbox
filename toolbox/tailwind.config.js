/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '11/10' : '110%',
      },
      colors: {
        'pu' : {
          gul : '#FFD542',
          grunn : 'F7F7F7',
          svart : '#000000',
          ghost: '#64748B',
          gray: '#212121',
        },
        'dark' : {
          svart : '#1d1d1d',
          ghost : '#FEFEFF',
          graa : '#212121',
          lysGraa : '#292929',
          white : '#e3e3e3',
        },
      },
      boxShadow: {
        'special': 'inset 0 0 0 1px hsla(0,0%,0%, 0.1))',
      },
    },
  },
  plugins: [],
}
