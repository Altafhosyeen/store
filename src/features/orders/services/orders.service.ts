import { buildRoute } from "@/constants";
import { apiClient } from "@/services/api";
import type { PaginatedResult } from "@/types";
import { ORDERS_ENDPOINTS } from "../constants/orders.constants";
import type { OrderDto, OrderListParams, OrderStatus } from "../types/orders-api.types";

export const ordersService = {
  getOrders: (params: OrderListParams) =>
    apiClient.get<PaginatedResult<OrderDto>>(ORDERS_ENDPOINTS.LIST, { params }),

  getOrder: (orderId: string) =>
    apiClient.get<OrderDto>(buildRoute(ORDERS_ENDPOINTS.DETAIL, { orderId })),

  updateOrderStatus: (orderId: string, status: OrderStatus) =>
    apiClient.patch<OrderDto, { status: OrderStatus }>(
      buildRoute(ORDERS_ENDPOINTS.UPDATE_STATUS, { orderId }),
      { status },
    ),
};
