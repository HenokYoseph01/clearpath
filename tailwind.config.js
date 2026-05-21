/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "bg-base": "hsl(204, 44%, 97%)",
        "bg-surface": "hsl(204, 38%, 93%)",
        "bg-subtle": "hsl(203, 34%, 88%)",
        "bg-muted": "hsl(202, 28%, 83%)",
        "text-primary": "hsl(214, 20%, 22%)",
        "text-secondary": "hsl(213, 14%, 42%)",
        "text-tertiary": "hsl(212, 10%, 60%)",
        accent: "hsl(202, 48%, 55%)",
        "accent-subtle": "hsl(202, 48%, 88%)",
        calm: "hsl(196, 42%, 78%)",
        "gentle-green": "hsl(152, 18%, 68%)",
        "soft-amber": "hsl(38, 22%, 72%)",
        "crisis-bg": "hsl(5, 35%, 93%)",
        "crisis-text": "hsl(5, 40%, 35%)"
      },
      fontFamily: {
        display: ["DMSerifDisplay_400Regular"],
        body: ["Lato_300Light"],
        bodyMed: ["Lato_400Regular"],
        mono: ["CourierPrime_400Regular"]
      },
      borderRadius: {
        calm: "16px"
      }
    }
  },
  plugins: []
};
