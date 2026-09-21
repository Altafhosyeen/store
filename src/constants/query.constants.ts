export const QUERY_KEYS = {
  AUTH: ["auth"],
  PRODUCTS: ["products"],
  CATEGORIES: ["categories"],
  CART: ["cart"],
  ORDERS: ["orders"],
  CUSTOMERS: ["customers"],
  LOOKUPS: ["lookups"],
} as const;

export const STALE_TIME = {
  LOOKUP: 5 * 60 * 1000,
  DEFAULT: 60 * 1000,
  REALTIME: 0,
} as const;
