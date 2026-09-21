/** Feature-owned endpoints and option labels; these are not globally reused. */
export const PRODUCTS_ENDPOINTS = {
  LIST: "/api/products/",
  CREATE: "/api/products/",
  DETAIL: "/api/products/:productId/",
  UPDATE: "/api/products/:productId/",
  DELETE: "/api/products/:productId/",
  PUBLISH: "/api/products/:productId/publish/",
  ARCHIVE: "/api/products/:productId/archive/",
} as const;

export const PRODUCT_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export const PRODUCT_STATUS_LABELS: Record<string, string> = {
  [PRODUCT_STATUS.DRAFT]: "Draft",
  [PRODUCT_STATUS.PUBLISHED]: "Published",
  [PRODUCT_STATUS.ARCHIVED]: "Archived",
};

export const STOCK_STATUS = {
  IN_STOCK: "inStock",
  LOW_STOCK: "lowStock",
  OUT_OF_STOCK: "outOfStock",
} as const;

/** Below this quantity a published product shows as "Low stock". */
export const LOW_STOCK_THRESHOLD = 10;

export const UNIT_OPTIONS = [
  { value: "g", label: "grams (g)" },
  { value: "kg", label: "kilograms (kg)" },
  { value: "pcs", label: "pieces" },
];
