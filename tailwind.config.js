/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // RBG Data brand colors
        teal: {
          DEFAULT: '#174F5B',
          50: '#f0fafb',
          100: '#d9f0f4',
          200: '#a8dce6',
          300: '#6ac3d3',
          400: '#3aa5c0',
          500: '#1e8ba8',
          600: '#174F5B',
          700: '#0f3a44',
          800: '#0a252d',
          900: '#051116',
        },
        coral: '#E56B52',
        cream: '#F7F1E7',
        charcoal: '#25282A',
        gold: '#D6a84B',
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      spacing: {
        // Generous whitespace
        gutter: '3rem',
      },
    },
  },
  plugins: [],
};
