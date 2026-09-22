/**
 * Storefront-only type system: Playfair Display for headings/prices, Jost for
 * body/UI text. Self-hosted via @fontsource, imported in globals.css the same
 * way Inter is for the console. Admin keeps the Inter-only stack in
 * typography.ts.
 */
export const brandFontFamily = {
  display: "'Playfair Display', Georgia, 'Times New Roman', serif",
  body: "'Jost', -apple-system, BlinkMacSystemFont, sans-serif",
} as const;

export const brandFontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;
