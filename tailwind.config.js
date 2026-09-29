/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green:  "#86EFAC",
          dark:   "#020B14",
          card:   "#0A1929",
          border: "#1E293B",
        },
        cta: {
          from: "#D97706",
          to:   "#EA580C",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["'Courier New'", "monospace"],
      },
      animation: {
        "float-y":  "floatY 3.5s ease-in-out infinite",
        "float-y2": "floatY 4s ease-in-out infinite 0.9s",
        "bounce-arrow": "bounceArrow 1.7s ease-in-out infinite",
        blink:      "blink 1.2s step-end infinite",
        "fade-up":  "fadeUp 0.9s ease both",
      },
      keyframes: {
        floatY:      { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        bounceArrow: { "0%,100%": { transform: "rotate(45deg) translateY(0)" }, "50%": { transform: "rotate(45deg) translateY(7px)" } },
        blink:       { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.1" } },
        fadeUp:      { from: { opacity: "0", transform: "translateY(28px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
