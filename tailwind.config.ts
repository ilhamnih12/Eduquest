import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        edu: {
          bgLight: '#F4F5F7',
          textLight: '#1E293B',
          accentLight: '#4A7BB0',
          cardLight: '#FFFFFF',
          borderLight: '#E2E8F0',
          bgDark: '#1E222A',
          textDark: '#E5E9F0',
          accentDark: '#88C0D0',
          cardDark: '#2E3440',
          borderDark: '#3B4252',
        },
        primary: {
          DEFAULT: '#4A7BB0',
          dark: '#88C0D0',
          50: '#F0F5FA',
          100: '#E1EBF5',
          200: '#C3D7EB',
          300: '#9ABFE0',
          400: '#6FA3D3',
          500: '#4A7BB0',
          600: '#3A638F',
          700: '#2D4D6F',
          800: '#21374F',
          900: '#152433',
        },
        nord: {
          polar1: '#2E3440',
          polar2: '#3B4252',
          polar3: '#434C5E',
          polar4: '#4C566A',
          snow1: '#D8DEE9',
          snow2: '#E5E9F0',
          snow3: '#ECEFF4',
          frost1: '#8FBCBB',
          frost2: '#88C0D0',
          frost3: '#81A1C1',
          frost4: '#5E81AC',
          auroraRed: '#BF616A',
          auroraOrange: '#D08770',
          auroraYellow: '#EBCB8B',
          auroraGreen: '#A3BE8C',
          auroraPurple: '#B48EAD',
        },
      },
      animation: {
        'bounce-subtle': 'bounce 2s infinite ease-in-out',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shake': 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-2px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(3px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
