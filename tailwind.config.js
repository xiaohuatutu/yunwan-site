/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'TT Norms Pro'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        // 全站统一缓动曲线：ease-brand
        brand: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      transitionDuration: {
        brand: '240ms',
      },
      colors: {
        ink: '#1a1a1a',
        plum: '#2B2644',
      },
    },
  },
  plugins: [],
}
