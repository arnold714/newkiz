/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard']
      },
    },
  },
  plugins: [],
}

export default config
