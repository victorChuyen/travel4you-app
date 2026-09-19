/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          navy: '#07111e',
          navyLight: '#11223f',
          gold: '#c9a54e',
          goldLight: '#dfba63',
          goldDark: '#997d34',
          coral: '#ff7043',
          coralHover: '#f4511e',
          charcoal: '#1e293b',
          muted: '#64748b',
          lightBg: '#f8fafc',
          border: '#e2e8f0',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
