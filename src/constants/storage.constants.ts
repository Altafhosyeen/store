export const STORAGE_KEYS = {
  AUTH_SESSION: "rn.auth.session",
  UI_SIDEBAR_COLLAPSED: "rn.ui.sidebar-collapsed",
  CART: "rn.cart",
  LOOKUP_CACHE: "rn.lookup.cache",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
