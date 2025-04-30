/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
        },
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        light: 'rgb(var(--color-light) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
      },
      transitionDuration: {
        '800': '800ms',
      },
      animation: {
        'talk': 'talk 1s infinite',
        'call-ring': 'call-ring 3s infinite cubic-bezier(0.215, 0.61, 0.355, 1)',
        'success-pulse': 'success-pulse 2s infinite alternate',
      },
      boxShadow: {
        'success': '0 15px 35px rgba(0, 200, 83, 0.25)',
      },
      perspective: {
        '1500': '1500px',
      },
    },
  },
  plugins: [],
};