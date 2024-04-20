/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all files ending with .js, .jsx, .ts, or .tsx in the src directory and its subdirectories.
    "./public/index.html", // Scan the public/index.html file.
  ],
  theme: {
    extend: {
      fontFamily: {
        "crimson-pro": ["Crimson Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
};
