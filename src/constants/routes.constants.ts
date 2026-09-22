/**
 * SEGMENTS are relative path pieces used inside a feature's routes.tsx.
 * ROUTES are absolute URLs built from those same segments, so renaming a
 * segment here updates every route and link that references ROUTES.
 */
export const SEGMENTS = {
  // Auth
  LOGIN: "login",
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot-password",

  // Storefront
  SHOP: "shop",
  PRODUCT_ID: "productId",
  CATEGORIES: "categories",
  CATEGORY_SLUG: "categorySlug",
  CART: "cart",
  CHECKOUT: "checkout",
  ORDER_CONFIRMATION: "confirmation",

  // Account
  ACCOUNT: "account",
  ORDERS: "orders",
  ORDER_ID: "orderId",
  ADDRESSES: "addresses",
  PROFILE: "profile",

  // Admin console
  APP: "app",
  DASHBOARD: "dashboard",
  NEW: "new",
} as const;

/** Wraps a segment as a route param, e.g. param(SEGMENTS.PRODUCT_ID) -> ":productId". */
export const param = (segment: string): string => `:${segment}`;

const join = (...parts: string[]): string => `/${parts.filter(Boolean).join("/")}`;

const app = (...parts: string[]): string => join(SEGMENTS.APP, ...parts);
const shop = (...parts: string[]): string => join(SEGMENTS.SHOP, ...parts);
const account = (...parts: string[]): string => join(SEGMENTS.ACCOUNT, ...parts);

export const ROUTES = {
  ROOT: "/",
  UNAUTHORIZED: "/unauthorized",

  LOGIN: join(SEGMENTS.LOGIN),
  REGISTER: join(SEGMENTS.REGISTER),
  FORGOT_PASSWORD: join(SEGMENTS.FORGOT_PASSWORD),

  HOME: "/",
  SHOP: shop(),
  PRODUCT_DETAIL: shop(param(SEGMENTS.PRODUCT_ID)),
  CATEGORIES: shop(SEGMENTS.CATEGORIES),
  CATEGORY_DETAIL: shop(SEGMENTS.CATEGORIES, param(SEGMENTS.CATEGORY_SLUG)),

  CART: join(SEGMENTS.CART),
  CHECKOUT: join(SEGMENTS.CHECKOUT),
  ORDER_CONFIRMATION: join(
    SEGMENTS.CHECKOUT,
    SEGMENTS.ORDER_CONFIRMATION,
    param(SEGMENTS.ORDER_ID),
  ),

  ACCOUNT: account(),
  ACCOUNT_ORDERS: account(SEGMENTS.ORDERS),
  ACCOUNT_ORDER_DETAIL: account(SEGMENTS.ORDERS, param(SEGMENTS.ORDER_ID)),
  ACCOUNT_ADDRESSES: account(SEGMENTS.ADDRESSES),
  ACCOUNT_PROFILE: account(SEGMENTS.PROFILE),

  ADMIN_DASHBOARD: app(SEGMENTS.DASHBOARD),
  ADMIN_PRODUCTS: app("products"),
  ADMIN_PRODUCT_NEW: app("products", SEGMENTS.NEW),
  ADMIN_PRODUCT_DETAIL: app("products", param(SEGMENTS.PRODUCT_ID)),
  ADMIN_CATEGORIES: app(SEGMENTS.CATEGORIES),
  ADMIN_ORDERS: app(SEGMENTS.ORDERS),
  ADMIN_ORDER_DETAIL: app(SEGMENTS.ORDERS, param(SEGMENTS.ORDER_ID)),
  ADMIN_CUSTOMERS: app("customers"),
} as const;

/** Fills :param placeholders in a route template, e.g. ROUTES.PRODUCT_DETAIL. */
export const buildRoute = (template: string, params: Record<string, string | number>): string =>
  Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, String(value)),
    template,
  );
