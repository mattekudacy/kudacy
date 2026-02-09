/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4ade80",
        "background-light": "#f4f4f5",
        "background-dark": "#0a0a0a",
      },
      fontFamily: {
        display: ["JetBrains Mono", "monospace"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0px",
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
