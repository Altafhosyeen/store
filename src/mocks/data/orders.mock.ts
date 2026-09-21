import type { OrderDto } from "@/features/orders";
import { ORDER_STATUS, PAYMENT_STATUS } from "@/features/orders";
import { MOCK_CUSTOMER } from "./auth.mock";

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

export const makeOrderList = (count: number): OrderDto[] =>
  Array.from({ length: count }, (_, index) =>
    makeOrder({
      id: `order-${index + 1}`,
      total: 10 + index * 5,
      status: Object.values(ORDER_STATUS)[index % Object.values(ORDER_STATUS).length],
    }),
  );

export const MOCK_ORDER_PENDING = makeOrder();
