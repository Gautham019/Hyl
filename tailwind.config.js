/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          50: '#F7F8FB',
          100: '#ECEFF5',
          200: '#D6DBE5',
          300: '#B3BBCA',
          400: '#8B94A7',
          500: '#5D6679',
          600: '#3B4456',
          700: '#2A3140',
          800: '#1D2330',
          850: '#161B25',
          900: '#11151D',
          950: '#090B10',
        },
        primary: {
          50: '#EEF5FF',
          100: '#D9E8FF',
          200: '#B3D1FF',
          300: '#8BB9FF',
          400: '#5C9DFF',
          500: '#3985FF',
          600: '#2A6FE6',
          700: '#1F58C4',
          800: '#1A4799',
          900: '#15387A',
        },
        secondary: {
          300: '#99F6E4',
          400: '#5EEAD4',
          500: '#2DD4BF',
          600: '#14B8A6',
        },
        accent: {
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
        },
        success: {
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
        },
        warning: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(57, 133, 255, 0.4), 0 8px 32px -4px rgba(57, 133, 255, 0.45)',
        card: '0 24px 60px -20px rgba(0, 0, 0, 0.7)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'fade-in': 'fade-in 200ms ease-out',
        'slide-up': 'slide-up 280ms ease-out',
      },
    },
  },
  plugins: [],
};
