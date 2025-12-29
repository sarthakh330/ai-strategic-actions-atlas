/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Entity class colors
        'big-tech': '#334155',
        'startup': '#4f46e5',
        'frontier-lab': '#059669',
        'open-source': '#d97706',
        // Reference design colors
        'primary': '#111111',
        'background-light': '#ffffff',
        'border-subtle': '#e5e5e5',
        'text-main': '#171717',
        'text-muted': '#737373',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'dot': '0 1px 2px rgba(0,0,0,0.1), 0 0 0 1px #ffffff',
        'dot-hover': '0 4px 12px rgba(0,0,0,0.15), 0 0 0 2px #ffffff',
      },
    },
  },
  plugins: [],
}
