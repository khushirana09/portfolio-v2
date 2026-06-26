/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAFAF7',
          2: '#F3F3EE',
          3: '#EBEBЕ5',
        },
        ink: {
          DEFAULT: '#0D0D0D',
          2: '#3A3A3A',
          3: '#7A7A7A',
          4: '#BBBBBB',
        },
        rule: '#E2E2DC',
        gold: {
          DEFAULT: '#C9A84C',
          light: '#F5EDD4',
          dim: 'rgba(201,168,76,0.15)',
        },
        sage: '#2E7D52',
        crimson: '#D94F3D',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3.2rem,7vw,6rem)', { lineHeight: '0.97', letterSpacing: '-0.04em' }],
        'display': ['clamp(2rem,4vw,3.6rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        'title': ['clamp(1.4rem,2.5vw,2rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      animation: {
        'blink': 'blink 2s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.2' } },
        ticker: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
