/**
 * Every hex value in the app lives here. Components reference these tokens
 * (or the antd tokens derived from them in antd-theme.ts), never raw hex.
 */
export const colors = {
  // Brand — warm amber/roast, evoking roasted nuts and honey glaze.
  primary: "#B45309",
  primaryHover: "#92400E",
  primaryActive: "#78350F",
  primaryBg: "#FFFBEB",
  primaryBgHover: "#FEF3C7",
  primaryBorder: "#FDE68A",

  // Secondary — deep forest green, used for freshness/organic cues.
  secondary: "#166534",
  secondaryBg: "#F0FDF4",

  // Neutrals
  textPrimary: "#1C1917",
  textSecondary: "#57534E",
  textTertiary: "#A8A29E",
  textDisabled: "#D6D3D1",
  textOnPrimary: "#FFFFFF",

  white: "#FFFFFF",

  bgBase: "#FFFFFF",
  bgLayout: "#FAF9F7",
  bgElevated: "#FFFFFF",
  bgSpotlight: "#1C1917",

  border: "#E7E5E4",
  borderLight: "#F5F5F4",

  // Semantic
  success: "#16A34A",
  successText: "#15803D",
  successBg: "#F0FDF4",

  warning: "#D97706",
  warningText: "#B45309",
  warningBg: "#FFFBEB",

  error: "#DC2626",
  errorText: "#B91C1C",
  errorBg: "#FEF2F2",

  info: "#2563EB",
  infoText: "#1D4ED8",
  infoBg: "#EFF6FF",
} as const;

export type ColorToken = keyof typeof colors;
