/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/WeatherForecast.html"],
  theme: {
    extend: {
      backgroundImage: {
        url: 'url("https://img.freepik.com/premium-photo/vast-green-meadow-with-fluffy-white-clouds-bright-blue-sky_38013-57515.jpg?w=1060")',

        url2: 'url("/Images/freepik__upload__43013.jpeg")',
      },
      colors: {
        custom_blue: "#1F9CBB",
      },
      fontSize: {
        custom: "17px", // Custom size
      },
    },
  },
  plugins: [],
};
