/** @type {import('tailwindcss').Config} */

/*
 * Tailwind is a LAYOUT utility layer only. Colours, type sizes, radii and
 * shadows come from Ant Design tokens in src/theme — do not add them here.
 *
 * The one exception is `hairline`, because antd's Layout exposes no token for
 * the header's bottom border. It mirrors `colors.borderLight` in src/theme, and
 * cannot import it: this file is loaded by PostCSS, outside the app build.
 */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Ant Design ships its own reset; Tailwind's preflight fights it (button
  // backgrounds, heading margins) so it stays off. Section 6: antd owns layout.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        hairline: {
          DEFAULT: "#CBD5E1",
          light: "#E2E8F0",
        },
      },
    },
  },
  plugins: [],
};
