/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/WeatherForecast.html"],
  theme: {
    extend: {
      backgroundImage: {
        url: 'url("https://img.freepik.com/premium-photo/vast-green-meadow-with-fluffy-white-clouds-bright-blue-sky_38013-57515.jpg?w=1060")',
      },
      gridTemplateRows: {
        // Simple 16 row grid
        10: "repeat(16,1fr)",
      },
      gridTemplateColumns: {
        // Simple 16 row grid
        1: "100vw",
      },
    },
  },
  plugins: [],
};
