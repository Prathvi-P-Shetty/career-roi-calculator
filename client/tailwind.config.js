/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e293b', // Slate-800 (deep blue/gray)
          light: '#64748b',   // Slate-400
        },
        accent: {
          DEFAULT: '#0d9488', // Teal-600
          light: '#5eead4',   // Teal-300
        },
        secondary: {
          DEFAULT: '#2563eb', // Blue-600
          light: '#dbeafe',  // Blue-100
        },
        warning: {
          DEFAULT: '#f59e42', // Amber-400
        },
        error: {
          DEFAULT: '#ef4444', // Red-500
        },
        success: {
          DEFAULT: '#22c55e', // Green-500
        },
        background: {
          DEFAULT: '#f8fafc', // Slate-50
        },
      },
    },
  },
  plugins: [],
}

