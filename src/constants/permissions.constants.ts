export const PERMISSIONS = {
  PRODUCTS_VIEW: "products.view",
  PRODUCTS_CREATE: "products.create",
  PRODUCTS_UPDATE: "products.update",
  PRODUCTS_DELETE: "products.delete",

  CATEGORIES_VIEW: "categories.view",
  CATEGORIES_MANAGE: "categories.manage",

  ORDERS_VIEW: "orders.view",
  ORDERS_MANAGE: "orders.manage",

  CUSTOMERS_VIEW: "customers.view",
  CUSTOMERS_MANAGE: "customers.manage",

  DASHBOARD_VIEW: "dashboard.view",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
