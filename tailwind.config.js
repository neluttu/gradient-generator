/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./template/*.{html,js}','template/js/*.js','template/css/styles.css','template/components/*.html','includes/FrontPage.php','components/*.html','index.html'],
  theme: {
    extend: {
        fontFamily: {
            'nunito': ['Nunito', 'sans-serif'],
            'rubik': ['Rubik', 'sans-serif'],
            'releway': ['Releway', 'sans-serif'],
            'poppins': ['Poppins', 'sans-serif'],
            'merriweather': ['Merriweather', 'sans-serif'],
            'roboto': ['Roboto', 'sans-serif'],
            'oswald': ['Oswald', 'sans-serif'],
            'mulish': ['Mulish', 'sans-serif'],
            'barlow': ['Open Sans', 'sans-serif']
        },
    },
  },
  plugins: [],
}