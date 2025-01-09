/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "whatsapp-green": "#25D366",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
