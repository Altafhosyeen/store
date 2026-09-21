export const ORDERS_ENDPOINTS = {
  LIST: "/api/orders/",
  DETAIL: "/api/orders/:orderId/",
  UPDATE_STATUS: "/api/orders/:orderId/status/",
} as const;

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

export const ORDER_STATUS_OPTIONS = Object.values(ORDER_STATUS).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export const PAYMENT_STATUS = {
  UNPAID: "unpaid",
  PAID: "paid",
  REFUNDED: "refunded",
} as const;
