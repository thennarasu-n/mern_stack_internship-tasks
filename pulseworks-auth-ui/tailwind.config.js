/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effaf6",
          100: "#d8f3e8",
          200: "#b5e8d4",
          300: "#83d5b9",
          400: "#4cba96",
          500: "#299d79",
          600: "#1d8063",
          700: "#1a6652",
          800: "#185244",
          900: "#164438",
        },
        ink: "#132e2b",
      },
      fontFamily: {
        sans: ["DM Sans", "Inter", "ui-sans-serif", "system-ui"],
        display: ["Manrope", "DM Sans", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 18px 55px -28px rgba(20, 54, 46, 0.22)",
        soft: "0 8px 30px -18px rgba(20, 54, 46, 0.2)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse at 74% 32%, rgba(116, 213, 176, 0.19), transparent 38%), radial-gradient(ellipse at 5% 80%, rgba(221, 240, 230, 0.55), transparent 34%)",
      },
    },
  },
  plugins: [],
};
