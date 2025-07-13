/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Professional EdTech Color Palette
        primary: {
          DEFAULT: '#1e40af', // Blue-700 - Main brand color
          light: '#3b82f6',   // Blue-500
          dark: '#1e3a8a',    // Blue-800
          50: '#eff6ff',      // Blue-50
          100: '#dbeafe',     // Blue-100
          200: '#bfdbfe',     // Blue-200
          300: '#93c5fd',     // Blue-300
          400: '#60a5fa',     // Blue-400
          500: '#3b82f6',     // Blue-500
          600: '#2563eb',     // Blue-600
          700: '#1e40af',     // Blue-700
          800: '#1e3a8a',     // Blue-800
          900: '#1e3a8a',     // Blue-900
        },
        accent: {
          DEFAULT: '#0891b2', // Cyan-600 - Secondary brand color
          light: '#06b6d4',   // Cyan-500
          dark: '#0e7490',    // Cyan-700
          50: '#ecfeff',      // Cyan-50
          100: '#cffafe',     // Cyan-100
          200: '#a5f3fc',     // Cyan-200
          300: '#67e8f9',     // Cyan-300
          400: '#22d3ee',     // Cyan-400
          500: '#06b6d4',     // Cyan-500
          600: '#0891b2',     // Cyan-600
          700: '#0e7490',     // Cyan-700
          800: '#155e75',     // Cyan-800
          900: '#164e63',     // Cyan-900
        },
        secondary: {
          DEFAULT: '#475569', // Slate-600 - Text and subtle elements
          light: '#64748b',   // Slate-500
          dark: '#334155',    // Slate-700
          50: '#f8fafc',      // Slate-50
          100: '#f1f5f9',     // Slate-100
          200: '#e2e8f0',     // Slate-200
          300: '#cbd5e1',     // Slate-300
          400: '#94a3b8',     // Slate-400
          500: '#64748b',     // Slate-500
          600: '#475569',     // Slate-600
          700: '#334155',     // Slate-700
          800: '#1e293b',     // Slate-800
          900: '#0f172a',     // Slate-900
        },
        success: {
          DEFAULT: '#059669', // Emerald-600 - Success states
          light: '#10b981',   // Emerald-500
          dark: '#047857',    // Emerald-700
          50: '#ecfdf5',      // Emerald-50
          100: '#d1fae5',     // Emerald-100
          200: '#a7f3d0',     // Emerald-200
          300: '#6ee7b7',     // Emerald-300
          400: '#34d399',     // Emerald-400
          500: '#10b981',     // Emerald-500
          600: '#059669',     // Emerald-600
          700: '#047857',     // Emerald-700
          800: '#065f46',     // Emerald-800
          900: '#064e3b',     // Emerald-900
        },
        warning: {
          DEFAULT: '#d97706', // Amber-600 - Warning states
          light: '#f59e0b',   // Amber-500
          dark: '#b45309',    // Amber-700
          50: '#fffbeb',      // Amber-50
          100: '#fef3c7',     // Amber-100
          200: '#fde68a',     // Amber-200
          300: '#fcd34d',     // Amber-300
          400: '#fbbf24',     // Amber-400
          500: '#f59e0b',     // Amber-500
          600: '#d97706',     // Amber-600
          700: '#b45309',     // Amber-700
          800: '#92400e',     // Amber-800
          900: '#78350f',     // Amber-900
        },
        error: {
          DEFAULT: '#dc2626', // Red-600 - Error states
          light: '#ef4444',   // Red-500
          dark: '#b91c1c',    // Red-700
          50: '#fef2f2',      // Red-50
          100: '#fee2e2',     // Red-100
          200: '#fecaca',     // Red-200
          300: '#fca5a5',     // Red-300
          400: '#f87171',     // Red-400
          500: '#ef4444',     // Red-500
          600: '#dc2626',     // Red-600
          700: '#b91c1c',     // Red-700
          800: '#991b1b',     // Red-800
          900: '#7f1d1d',     // Red-900
        },
        // Gradient colors for modern UI
        gradient1: '#1e40af', // Blue-700
        gradient2: '#0891b2', // Cyan-600
        gradient3: '#06b6d4', // Cyan-500
        // Text colors
        text: {
          primary: '#1e293b',   // Slate-800
          secondary: '#475569',  // Slate-600
          tertiary: '#64748b',   // Slate-500
          inverse: '#ffffff',    // White
        },
        // Background colors
        background: {
          DEFAULT: '#ffffff',    // White
          secondary: '#f8fafc',  // Slate-50
          tertiary: '#f1f5f9',   // Slate-100
        },
      },
      // Custom gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-edtech': 'linear-gradient(135deg, #1e40af 0%, #0891b2 50%, #06b6d4 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #eff6ff 0%, #ecfeff 100%)',
      },
      // Custom shadows
      boxShadow: {
        'edtech': '0 4px 6px -1px rgba(30, 64, 175, 0.1), 0 2px 4px -1px rgba(8, 145, 178, 0.06)',
        'edtech-lg': '0 10px 15px -3px rgba(30, 64, 175, 0.1), 0 4px 6px -2px rgba(8, 145, 178, 0.05)',
        'edtech-xl': '0 20px 25px -5px rgba(30, 64, 175, 0.1), 0 10px 10px -5px rgba(8, 145, 178, 0.04)',
      },
    },
  },
  plugins: [],
}

