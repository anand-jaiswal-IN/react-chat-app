/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend : {
      colors : {
        "black" : "#222831",
        "light-black" : "#31363F",
        "white" : "#EEEEEE"
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    }
    
  },
  plugins: [],
}

