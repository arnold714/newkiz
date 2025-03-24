/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom-box': '1.95px 1.95px 2.6px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        pretendard: ['Pretendard']
      }
    },
  },
  plugins: [],
}

export default config
