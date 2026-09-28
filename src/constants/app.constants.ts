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
  home: "home",
  categories: "categories",
  bestSellers: "bestsellers",
  deals: "deals",
  shop: "shop",
  royal: "royal",
  buildYourBox: "buildbox",
  giftBoxes: "gifts",
  health: "health",
  nutrition: "nutrition",
  reviews: "reviews",
  about: "about",
  delivery: "delivery",
  faq: "faq",
  contact: "contact",
} as const;

/** Storefront delivery pricing — display copy only; checkout always re-prices on the server. */
export const DELIVERY = {
  FREE_THRESHOLD: 3000,
  FLAT_FEE: 250,
} as const;

/** Public business contact details shown on the storefront. */
export const STORE_CONTACT = {
  WHATSAPP_NUMBER: "923475615272",
  WHATSAPP_DISPLAY: "+923475615272",
  EMAIL: "hello@royalnuts.pk",
  FACEBOOK_URL: "https://facebook.com/",
  INSTAGRAM_URL: "https://instagram.com/",
  TIKTOK_URL: "https://tiktok.com/",
} as const;

/** Builds a wa.me deep link, optionally pre-filled with a message. */
export const buildWhatsAppUrl = (message?: string): string =>
  `https://wa.me/${STORE_CONTACT.WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
