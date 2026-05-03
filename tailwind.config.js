/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        sand: {
          50: '#fdf8f0',
          100: '#f9edd8',
          200: '#f2d9b0',
          300: '#e8bf7e',
          400: '#dca04e',
          500: '#d08830',
          600: '#b86f22',
          700: '#96561d',
          800: '#7a451e',
          900: '#643a1c',
        },
        ocean: {
          50: '#eff8ff',
          100: '#dbeffe',
          200: '#bfe3fd',
          300: '#93d1fb',
          400: '#60b6f7',
          500: '#3b97f2',
          600: '#2679e7',
          700: '#1d62d4',
          800: '#1e4fac',
          900: '#1e4487',
        },
        coral: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'slide-in': 'slideIn 0.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}
