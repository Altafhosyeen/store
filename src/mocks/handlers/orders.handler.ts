import type { OrderDto, OrderStatus } from "@/features/orders";
import { ORDERS_ENDPOINTS } from "@/features/orders";
import type { PaginatedResult } from "@/types";
import { makeOrderList, makePaginatedResult } from "../data";
import { defineHandlers, notFound } from "../mock-router";

let orders: OrderDto[] = makeOrderList(18);

export const ordersHandlers = defineHandlers([
  {
    method: "GET",
    path: ORDERS_ENDPOINTS.LIST,
    resolve: ({ query }): PaginatedResult<OrderDto> => {
      const status = query.status as OrderStatus | undefined;
      const filtered = status ? orders.filter((o) => o.status === status) : orders;
      return makePaginatedResult(filtered);
    },
  },
  {
    method: "GET",
    path: ORDERS_ENDPOINTS.DETAIL,
    resolve: ({ params }): OrderDto =>
      orders.find((o) => o.id === params.orderId) ?? notFound("Order not found"),
  },
  {
    method: "PATCH",
    path: ORDERS_ENDPOINTS.UPDATE_STATUS,
    resolve: ({ params, body }): OrderDto => {
      const existing = orders.find((o) => o.id === params.orderId);
      if (!existing) return notFound("Order not found");
      const { status } = body as { status: OrderStatus };
      const updated = { ...existing, status };
      orders = orders.map((o) => (o.id === existing.id ? updated : o));
      return updated;
    },
  },
]);
