/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "bg-base": "var(--color-bg-base)",
        "bg-surface": "var(--color-bg-surface)",
        "bg-subtle": "var(--color-bg-subtle)",
        "bg-muted": "var(--color-bg-muted)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",
        accent: "var(--color-accent)",
        "accent-subtle": "var(--color-accent-subtle)",
        calm: "var(--color-calm)",
        "gentle-green": "var(--color-gentle-green)",
        "soft-amber": "var(--color-soft-amber)",
        "crisis-bg": "var(--color-crisis-bg)",
        "crisis-text": "var(--color-crisis-text)"
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
