export interface TypeStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
}

/** Weights restricted to what's actually loaded via @fontsource/inter. */
export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const typography: Record<string, TypeStyle> = {
  display: { fontSize: 40, lineHeight: 1.2, fontWeight: fontWeights.bold },
  h1: { fontSize: 32, lineHeight: 1.25, fontWeight: fontWeights.bold },
  h2: { fontSize: 26, lineHeight: 1.3, fontWeight: fontWeights.semibold },
  h3: { fontSize: 22, lineHeight: 1.35, fontWeight: fontWeights.semibold },
  h4: { fontSize: 18, lineHeight: 1.4, fontWeight: fontWeights.semibold },
  h5: { fontSize: 16, lineHeight: 1.4, fontWeight: fontWeights.medium },
  bodyLarge: { fontSize: 16, lineHeight: 1.6, fontWeight: fontWeights.regular },
  body: { fontSize: 14, lineHeight: 1.6, fontWeight: fontWeights.regular },
  bodySmall: { fontSize: 13, lineHeight: 1.5, fontWeight: fontWeights.regular },
  caption: { fontSize: 12, lineHeight: 1.5, fontWeight: fontWeights.regular },
  label: { fontSize: 13, lineHeight: 1.4, fontWeight: fontWeights.medium },
};

export const fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
