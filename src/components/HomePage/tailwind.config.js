/** Merge this into your existing tailwind.config.js */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        novix: {
          ivory: "#F8F6F2",
          ivoryDeep: "#F2EEE6",
          ink: "#1E1C19",
          inkSoft: "#5B564C",
          inkFaint: "rgba(30,28,25,0.45)",
          line: "rgba(30,28,25,0.10)",
          skin: "#E8B48C",
          skinDeep: "#C4885A",
          skinLight: "#F6D9BC",
          glove: "#9FBAB5",
          gloveDeep: "#5F7E79",
          gloveLight: "#D6E4E0",
          bloom: "#FFFDF8",
          accent: "#7C6A54",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};