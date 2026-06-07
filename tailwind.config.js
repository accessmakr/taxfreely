/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],

  // Theme is toggled by adding/removing the 'dark' class on <html>
  // ThemeContext handles this — system preference respected on first load
  darkMode: 'class',

  theme: {
    extend: {

      // All colour tokens reference CSS custom properties defined in index.css
      // This lets dark/light mode switch by toggling the .dark class on <html>
      // without any JavaScript colour logic in individual components
      colors: {
        'tf-bg':          'var(--tf-bg)',
        'tf-surface':     'var(--tf-surface)',
        'tf-surface-2':   'var(--tf-surface-2)',
        'tf-surface-3':   'var(--tf-surface-3)',
        'tf-border':      'var(--tf-border)',
        'tf-border-2':    'var(--tf-border-2)',
        'tf-text-1':      'var(--tf-text-1)',
        'tf-text-2':      'var(--tf-text-2)',
        'tf-text-3':      'var(--tf-text-3)',
        'tf-green':       'var(--tf-green)',
        'tf-green-dim':   'var(--tf-green-dim)',
        'tf-green-text':  'var(--tf-green-text)',
        'tf-red':         'var(--tf-red)',
        'tf-red-dim':     'var(--tf-red-dim)',
        'tf-red-text':    'var(--tf-red-text)',
        'tf-amber':       'var(--tf-amber)',
        'tf-amber-dim':   'var(--tf-amber-dim)',
        'tf-amber-text':  'var(--tf-amber-text)',
        'tf-blue':        'var(--tf-blue)',
        'tf-blue-dim':    'var(--tf-blue-dim)',
        'tf-blue-text':   'var(--tf-blue-text)'
      },

      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif'
        ],
        mono: [
          '"SF Mono"',
          '"Cascadia Code"',
          '"Fira Code"',
          'Consolas',
          'monospace'
        ]
      },

      // Type scale from design system — financial numbers need to read clearly
      fontSize: {
        '2xs':  ['10px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'xs':   ['11px', { lineHeight: '1.5' }],
        'sm':   ['13px', { lineHeight: '1.5' }],
        'base': ['15px', { lineHeight: '1.6' }],
        'lg':   ['17px', { lineHeight: '1.4' }],
        'xl':   ['20px', { lineHeight: '1.3' }],
        '2xl':  ['24px', { lineHeight: '1.2' }],
        '3xl':  ['32px', { lineHeight: '1.1' }],
        '4xl':  ['40px', { lineHeight: '1.0' }],
        '5xl':  ['52px', { lineHeight: '1.0' }]
      },

      spacing: {
        '4.5': '18px',
        '11':  '44px',   // Minimum tap target — WCAG requirement
        '13':  '52px',   // Standard input height
        '15':  '60px',
        '18':  '72px',   // Bottom nav height
        '22':  '88px'
      },

      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '20px',
        '2xl': '28px'
      },

      minHeight: {
        'tap':   '44px',
        'input': '52px'
      },

      minWidth: {
        'tap': '44px'
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },

      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms'
      },

      boxShadow: {
        'card':  '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
        'modal': '0 20px 60px rgba(0, 0, 0, 0.8)',
        'sheet': '0 -4px 24px rgba(0, 0, 0, 0.5)'
      },

      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      },

      zIndex: {
        'nav':     '50',
        'overlay': '80',
        'modal':   '100',
        'toast':   '200',
        'tooltip': '300'
      },

      keyframes: {
        'count-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' }
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' }
        },
        'sheet-up': {
          from: { transform: 'translateY(100%)' },
          to:   { transform: 'translateY(0)' }
        },
        'sheet-down': {
          from: { transform: 'translateY(0)' },
          to:   { transform: 'translateY(100%)' }
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to:   { opacity: '1', transform: 'scale(1)' }
        },
        'pulse-green': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' }
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },

      animation: {
        'count-up':    'count-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in':     'fade-in 0.2s ease-out both',
        'slide-up':    'slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1) both',
        'slide-down':  'slide-down 0.2s ease-out both',
        'sheet-up':    'sheet-up 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        'sheet-down':  'sheet-down 0.25s ease-in',
        'scale-in':    'scale-in 0.2s cubic-bezier(0.4, 0, 0.2, 1) both',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'shimmer':     'shimmer 1.5s infinite linear'
      }
    }
  },

  plugins: []
}
