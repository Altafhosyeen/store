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
  CODE: "PKR",
  SYMBOL: "Rs. ",
} as const;

/** Anchor ids for the storefront home page's sections — used by both the home page and the nav's in-page links. */
export const HOME_SECTION_IDS = {
  bestSellers: "best-sellers",
  giftBoxes: "gift-boxes",
  buildYourBox: "build-your-box",
  about: "about",
  contact: "contact",
} as const;
