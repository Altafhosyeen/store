/** @type {import('tailwindcss').Config} */
import { brandColors, brandShadows } from "./src/theme/brand.ts";
import { brandFontFamily } from "./src/theme/brand-typography.ts";

/*
 * Tailwind is a utility layer. Colours, fonts and shadows are never typed
 * here: the storefront palette is imported from src/theme/brand*.ts (Tailwind
 * loads this file through jiti, so the TS import resolves), which keeps the
 * theme the single source of truth and lets storefront markup use
 * `text-golddk`, `bg-walnutdk`, `shadow-card` and friends.
 *
 * The one exception is `hairline`, because antd's Layout exposes no token for
 * the header's bottom border. It mirrors `colors.borderLight` in src/theme.
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
        cream: brandColors.cream,
        ivory: brandColors.ivory,
        sand: brandColors.sand,
        walnut: brandColors.walnut,
        walnutdk: brandColors.walnutDark,
        charcoal: brandColors.charcoal,
        cocoa: brandColors.cocoa,
        gold: brandColors.gold,
        golddk: brandColors.goldDark,
        leaf: brandColors.leaf,
        whatsapp: brandColors.whatsapp,
      },
      fontFamily: {
        display: [brandFontFamily.display],
        body: [brandFontFamily.body],
      },
      boxShadow: {
        soft: brandShadows.soft,
        card: brandShadows.card,
        lift: brandShadows.lift,
      },
    },
  },
  plugins: [],
};
