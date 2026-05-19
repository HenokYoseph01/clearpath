/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "bg-base": "hsl(210, 18%, 97%)",
        "bg-surface": "hsl(208, 16%, 93%)",
        "bg-subtle": "hsl(207, 14%, 89%)",
        "bg-muted": "hsl(206, 12%, 85%)",
        "text-primary": "hsl(214, 20%, 22%)",
        "text-secondary": "hsl(213, 14%, 42%)",
        "text-tertiary": "hsl(212, 10%, 60%)",
        accent: "hsl(207, 30%, 58%)",
        "accent-subtle": "hsl(207, 22%, 88%)",
        calm: "hsl(190, 20%, 70%)",
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
