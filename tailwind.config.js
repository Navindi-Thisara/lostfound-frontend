/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this to your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',    // blue-600
        secondary: '#f43f5e',  // rose-500
        accent: '#10b981',     // emerald-500
        light: '#f9fafb',
      },
    },
  },
  plugins: [],
};
