/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      gridTemplateColumns: {
        "auto-fill-200": "repeat(auto-fill, minmax(200px, 1fr))",
        "auto-fill-225": "repeat(auto-fill, minmax(225px, 1fr))",
        "auto-fill-250": "repeat(auto-fill, minmax(250px, 1fr))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        main_primary: "#2F4E6E",
        main_secondary: "#8BAFE3",
        main_tertiary: "#B4CAEB",
        main_extra: "#D5E2F5",
        main_white: "#FAFAFA",
        calendar_borders: "#c2cddf",
        calendar_bg: "#d5e2f5",
      },
      fontFamily: {
        poppins: "Poppins",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        "mobile-s": "320px",
        "mobile-m": "375px",
        "mobile-l": "425px",
        1220: "1220px",
        1800: "1800px",
        1500: "1500px",
        "4k": "2560px",
      },
      fontSize: {
        "2xs": "10px",
      },
      //   .text-xs {
      //     font-size: 0.75rem /* 12px */;
      //     line-height: 1rem /* 16px */;
      // }
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
  tailwindcss: {},
  autoprefixer: {},
};
