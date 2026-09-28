/**
 * Storefront-only brand palette — the warm "boutique" identity for the public
 * shop and customer account pages. The Admin console keeps the neutral tokens
 * in colors.ts; these never apply there. Consumed by storefrontAntdTheme and,
 * for anything Ant Design tokens can't reach, directly by storefront
 * components (never raw hex in a component — see CLAUDE.md hard rule 6).
 */
export const brandColors = {
  cream: "#FAF6EE",
  ivory: "#F3ECDD",
  sand: "#E8DCC4",
  walnut: "#4A3222",
  walnutDark: "#33220F",
  charcoal: "#1E150D",
  cocoa: "#6B4A2F",
  gold: "#C9A24B",
  goldDark: "#A07F2E",
  leaf: "#6D7D4F",
  leafDark: "#4D5C36",
  leafLight: "#7A9B58",
  almondSkin: "#8A6A44",
  hazelnut: "#B98A4F",
  hazelnutDark: "#8A5F31",
  white: "#FFFFFF",
  /** WhatsApp's brand green, for the order-via-WhatsApp buttons. */
  whatsapp: "#25D366",
} as const;

export type BrandColorToken = keyof typeof brandColors;

/** Named gradients used for the storefront's gold CTAs. */
export const brandGradients = {
  gold: `linear-gradient(135deg, #D4AF5C, #B8903A)`,
} as const;

/** Warm-tinted shadows for the storefront's card/hover-lift treatment. */
export const brandShadows = {
  soft: "0 10px 40px -12px rgba(51, 34, 15, 0.18)",
  card: "0 6px 24px -8px rgba(51, 34, 15, 0.15)",
  lift: "0 24px 48px -16px rgba(51, 34, 15, 0.28)",
} as const;
