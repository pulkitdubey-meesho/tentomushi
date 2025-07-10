/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./node_modules/flowbite/**/*.js",


  ],
  theme: {
    extend: {
       colors:{
        'bgColor':'#0f0d0e',
        'bgLight':'#231F20',
        'mainColor':'#FCBA28',
        'textColor':'#F9F4DA',
        'lightText':'#C9C9C9'

      },
      
    },
    fontFamily: {
      bi_bold: ["bi_bold", "sans-serif"],
      mo:["mo","sans-serif"],
    },
    
  },
  plugins: [
    require('flowbite/plugin')
  ],
}