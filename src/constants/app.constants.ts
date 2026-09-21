export const APP_NAME = "Royal Nuts";

// Mirrors theme/colors.ts primary and tailwind.config.js — change all three
// together.
export const THEME_PRIMARY = "#B45309";

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48],
} as const;

export const DATE_FORMAT = "DD MMM YYYY";

export const DEBOUNCE = {
  SEARCH_MS: 350,
} as const;

export const CURRENCY = {
  CODE: "USD",
  SYMBOL: "$",
} as const;
