/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
        },
        accent: {
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
        },
        background: 'var(--color-background)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
      },

      fontFamily: {
        primary: ['var(--font-primary)'],
      },

      fontSize: {
        xs: ['var(--text-xs)', { lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-weight-regular)' }],
        sm: ['var(--text-sm)', { lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-weight-regular)' }],
        md: ['var(--text-md)', { lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-weight-regular)' }],
        lg: ['var(--text-lg)', { lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-weight-regular)' }],
        xl: ['var(--text-xl)', { lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-weight-regular)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-medium)', fontWeight: 'var(--font-weight-medium)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-medium)', fontWeight: 'var(--font-weight-medium)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--leading-medium)', fontWeight: 'var(--font-weight-bold)' }],
        '5xl': ['var(--text-5xl)', { lineHeight: 'var(--leading-tight)', fontWeight: 'var(--font-weight-bold)' }],
        '6xl': ['var(--text-6xl)', { lineHeight: 'var(--leading-tight)', fontWeight: 'var(--font-weight-bold)' }],
        '7xl': ['var(--text-7xl)', { lineHeight: 'var(--leading-tight)', fontWeight: 'var(--font-weight-bold)' }],
        '8xl': ['var(--text-8xl)', { lineHeight: 'var(--leading-tight)', fontWeight: 'var(--font-weight-bold)' }],
        '9xl': ['var(--text-9xl)', { lineHeight: 'var(--leading-tight)', fontWeight: 'var(--font-weight-bold)' }],
        '10xl': ['var(--text-10xl)', { lineHeight: 'var(--leading-tight)', fontWeight: 'var(--font-weight-bold)' }],
      },

      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        bold: 'var(--font-weight-bold)',
      },

      lineHeight: {
        tight: 'var(--line-height-tight)',
        medium: 'var(--line-height-medium)',
        relaxed: 'var(--line-height-relaxed)',
      },
    },
  },
  plugins: [],
};
