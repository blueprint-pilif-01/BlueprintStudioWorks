/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00d0ff',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#00d0ff', // Original --c1
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          DEFAULT: '#7a5cff',
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#7a5cff', // Original --c2
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        accent: {
          DEFAULT: '#ff7ad9',
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ff7ad9', // Original --c3
          600: '#ec4899',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        foreground: '#0f1730', // Original --fg
        muted: {
          DEFAULT: '#55607d', // Original --muted
          foreground: '#4d5872',
        },
        background: '#f4f7fb', // Original --bg
        card: {
          DEFAULT: 'rgba(255, 255, 255, 0.78)',
          foreground: '#0f1730',
        },
        border: 'rgba(255, 255, 255, 0.55)',
        input: 'rgba(255, 255, 255, 0.62)',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'blob-drift': 'blob-drift 28s linear infinite',
        'blob-morph': 'blob-morph 16s ease-in-out infinite alternate',
        'color-shift': 'color-shift 80s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'blob-drift': {
          '0%': { transform: 'translate3d(0,0,0) scale(1.05)' },
          '10%': { transform: 'translate3d(3vw,-1vh,0) scale(1.06)' },
          '20%': { transform: 'translate3d(6vw,-3vh,0) scale(1.08)' },
          '30%': { transform: 'translate3d(4vw,0,0) scale(1.07)' },
          '40%': { transform: 'translate3d(2vw,3vh,0) scale(1.1)' },
          '50%': { transform: 'translate3d(-1vw,4vh,0) scale(1.09)' },
          '60%': { transform: 'translate3d(-4vw,2vh,0) scale(1.07)' },
          '70%': { transform: 'translate3d(-6vw,-1vh,0) scale(1.06)' },
          '80%': { transform: 'translate3d(-4vw,-2vh,0) scale(1.06)' },
          '90%': { transform: 'translate3d(-1vw,-1vh,0) scale(1.05)' },
          '100%': { transform: 'translate3d(0,0,0) scale(1.05)' },
        },
        'blob-morph': {
          '0%': { borderRadius: '58% 42% 64% 36% / 48% 62% 38% 52%' },
          '50%': { borderRadius: '42% 58% 36% 64% / 62% 38% 52% 48%' },
          '100%': { borderRadius: '58% 42% 64% 36% / 48% 62% 38% 52%' },
        },
        'color-shift': {
          '0%': { filter: 'blur(16px) saturate(115%) hue-rotate(0deg)' },
          '25%': { filter: 'blur(16px) saturate(115%) hue-rotate(90deg)' },
          '50%': { filter: 'blur(16px) saturate(115%) hue-rotate(180deg)' },
          '75%': { filter: 'blur(16px) saturate(115%) hue-rotate(270deg)' },
          '100%': { filter: 'blur(16px) saturate(115%) hue-rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 20px rgba(0, 208, 255, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 208, 255, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.70), rgba(255,255,255,0.45))',
        'glass-gradient-strong': 'linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.16))',
      },
    },
  },
  plugins: [],
}

