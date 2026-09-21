export const CHECKOUT_ENDPOINTS = {
  PLACE_ORDER: "/api/checkout/orders/",
} as const;

/**
 * Payment is intentionally stubbed for this boilerplate: the checkout flow
 * ends by creating an order with paymentStatus "unpaid". Wire a real gateway
 * (Stripe, SSLCommerz, bKash, ...) by replacing placeOrder's call and adding
 * a redirect/confirmation step once a provider is chosen.
 */
export const PAYMENT_METHOD = {
  CASH_ON_DELIVERY: "cod",
} as const;
