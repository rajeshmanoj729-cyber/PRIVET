module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        gaashaan: {
          blue: "#0969ff",
          glow: "#26a8ff",
          ink: "#071a46",
          muted: "#60718e",
          soft: "#f8fafc",
          mist: "#edf6ff"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      borderRadius: {
        gaashaan: "8px"
      },
      boxShadow: {
        gaashaan: "0 24px 70px rgba(9, 105, 255, 0.14)"
      }
    }
  },
  plugins: []
};
