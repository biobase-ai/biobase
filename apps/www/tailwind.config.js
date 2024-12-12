/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_blog/*.mdx',
    './components/**/*.tsx',
    './data/**/*.tsx',
    './layouts/**/*.tsx',
    './lib/mdx/mdxComponents.tsx',
    './pages/**/*.{tsx,mdx}',
    './../../packages/ui/src/**/*.{tsx,ts,js}',
    './../../packages/ui-patterns/**/*.{tsx,ts,js}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--color-background) / <alpha-value>)',
        foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
        'background-alternative': 'hsl(var(--color-background-alternative) / <alpha-value>)',
        'border-strong': 'hsl(var(--color-border-strong) / <alpha-value>)',
      },
      keyframes: {
        'flash-code': {
          '0%': { backgroundColor: 'rgba(63, 207, 142, 0.1)' },
          '100%': { backgroundColor: 'transparent' },
        },
        slideIn: {
          '0%': { transform: 'translate3d(0,-100%,0)' },
          '100%': { transform: 'translate3d(0,0,0)' },
        },
        spinner: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'marquee-vertical': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'pulse-radar': {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '50%': { opacity: 0.8 },
          '100%': { transform: 'scale(100%)', opacity: 0 },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'flash-code': 'flash-code 1s forwards',
        'flash-code-slow': 'flash-code 2s forwards',
        spinner: 'spinner 1s both infinite',
        marquee: 'marquee 35s linear infinite',
        'marquee-vertical': 'marquee-vertical 180s linear infinite both',
        'pulse-radar': 'pulse-radar 3s linear infinite',
        'slide-in': 'slideIn 250ms ease-in both',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      transitionDelay: {
        1200: '1200ms',
        1500: '1500ms',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};
