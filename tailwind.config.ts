import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F8F9F7',
          100: '#d4e8d0',
          200: '#e8f2e6',
          500: '#1A6324',
          600: '#145219',
          900: '#0A2E0F',
        },
        cjip: {
          primary: '#1A6324',
          dark: '#0A2E0F',
          mid: '#145219',
          light: '#F8F9F7',
          pale: '#d4e8d0',
          muted: '#e8f2e6',
          border: '#d1e4cc',
        },
        content: {
          main: '#1a1a1a',
          muted: '#4a5568',
        },
        gold: {
          500: '#F5A623',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'Segoe UI', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
        navbar: '1280px',
      },
      boxShadow: {
        navbar: '0 2px 16px rgba(10,46,15,0.35)',
      },
    },
  },
  plugins: [],
}

export default config
