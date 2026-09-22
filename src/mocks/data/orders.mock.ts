import type { OrderDto, OrderLineDto } from "@/features/orders";
import { ORDER_STATUS, PAYMENT_STATUS } from "@/features/orders";
import { MOCK_CUSTOMER } from "./auth.mock";
import { MOCK_CUSTOMERS } from "./customers.mock";
import { MOCK_PRODUCTS } from "./products.mock";

export const makeOrder = (overrides: Partial<OrderDto> = {}): OrderDto => ({
  id: "order-1",
  customerId: MOCK_CUSTOMER.id,
  customerName: MOCK_CUSTOMER.name,
  status: ORDER_STATUS.PENDING,
  paymentStatus: PAYMENT_STATUS.UNPAID,
  lines: [
    {
      productId: "prod-1",
      name: "Roasted Cashews",
      variantLabel: "250g",
      quantity: 2,
      unitPrice: 6.99,
    },
  ],
  total: 13.98,
  shippingAddress: {
    fullName: MOCK_CUSTOMER.name,
    phone: "+1 555 0100",
    line1: "123 Market St",
    city: "Springfield",
    postalCode: "12345",
  },
  createdAt: new Date().toISOString(),
  ...overrides,
});

const CITIES = [
  { city: "Springfield", postalCode: "12345" },
  { city: "Riverside", postalCode: "94501" },
  { city: "Lakeview", postalCode: "60602" },
  { city: "Fairview", postalCode: "30301" },
  { city: "Brookhaven", postalCode: "77002" },
  { city: "Maplewood", postalCode: "08701" },
];

const STATUS_SEQUENCE = Object.values(ORDER_STATUS);

/** Builds 1-3 order lines from real products, so admin order details show believable items. */
const linesFor = (seed: number): OrderLineDto[] => {
  const lineCount = (seed % 3) + 1;
  return Array.from({ length: lineCount }, (_, i) => {
    const product = MOCK_PRODUCTS[(seed + i * 7) % MOCK_PRODUCTS.length];
    const variant = product.variants[i % product.variants.length];
    const quantity = ((seed + i) % 3) + 1;
    return {
      productId: product.id,
      name: product.name,
      variantLabel: variant.label,
      quantity,
      unitPrice: variant.price,
    };
  });
};

/**
 * Every 4th order belongs to the signed-in mock customer (auth.mock's
 * MOCK_CUSTOMER, "Cara") rather than one of MOCK_CUSTOMERS, so /account/orders
 * has something to show in mock mode without every order looking like hers.
 */
export const makeOrderList = (count: number): OrderDto[] =>
  Array.from({ length: count }, (_, index) => {
    const customer =
      index % 4 === 0 ? MOCK_CUSTOMER : MOCK_CUSTOMERS[index % MOCK_CUSTOMERS.length];
    const lines = linesFor(index + 1);
    const total =
      Math.round(
        (lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0) + Number.EPSILON) *
          100,
      ) / 100;
    const status = STATUS_SEQUENCE[index % STATUS_SEQUENCE.length];
    const location = CITIES[index % CITIES.length];
    const createdAt = new Date(Date.now() - (count - index) * 43_200_000).toISOString();

    return makeOrder({
      id: `order-${index + 1}`,
      customerId: customer.id,
      customerName: customer.name,
      status,
      paymentStatus:
        status === ORDER_STATUS.CANCELLED
          ? PAYMENT_STATUS.REFUNDED
          : status === ORDER_STATUS.PENDING
            ? PAYMENT_STATUS.UNPAID
            : PAYMENT_STATUS.PAID,
      lines,
      total,
      shippingAddress: {
        fullName: customer.name,
        phone: `+1 555 01${String(index).padStart(2, "0")}`,
        line1: `${100 + index} Market St`,
        city: location.city,
        postalCode: location.postalCode,
      },
      createdAt,
    });
  });

export const MOCK_ORDERS: OrderDto[] = makeOrderList(18);

export const MOCK_ORDER_PENDING = MOCK_ORDERS[0];
