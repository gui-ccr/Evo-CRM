/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        // Design System – Fundo e Superfícies
        surface: {
          DEFAULT: '#FFFFFF',
          muted:   '#F8F9FA',
          subtle:  '#F1F3F5',
        },
        // Design System – Bordas
        border: {
          DEFAULT: '#E5E7EB', // gray-200
          strong:  '#D1D5DB', // gray-300
        },
        // Design System – Texto
        content: {
          primary:   '#111827', // gray-900
          secondary: '#6B7280', // gray-500
          tertiary:  '#9CA3AF', // gray-400
          inverse:   '#FFFFFF',
        },
        // Design System – Cor Primária (Indigo)
        primary: {
          50:      '#EEF2FF',
          100:     '#E0E7FF',
          200:     '#C7D2FE',
          300:     '#A5B4FC',
          400:     '#818CF8',
          500:     '#6366F1',
          600:     '#4F46E5',
          700:     '#4338CA',
          800:     '#3730A3',
          900:     '#312E81',
          DEFAULT: '#4F46E5',
          hover:   '#4338CA',
          active:  '#3730A3',
        },
        // Design System – Semânticas
        success: { DEFAULT: '#10B981', light: '#D1FAE5' },
        warning: { DEFAULT: '#F59E0B', light: '#FEF3C7' },
        danger:  { DEFAULT: '#EF4444', light: '#FEE2E2' },
        info:    { DEFAULT: '#3B82F6', light: '#DBEAFE' },
      },
      boxShadow: {
        'card':    '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-md': '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.04)',
        'card-lg': '0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -4px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        'card': '0.75rem', // 12px – padrão dos cards
      },
    },
  },
  plugins: [],
}
