import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { ordersService } from "../services/orders.service";
import type { OrderListParams, OrderStatus } from "../types/orders-api.types";

export const ORDERS_QUERY_KEY = QUERY_KEYS.ORDERS;

export const orderKeys = {
  all: ORDERS_QUERY_KEY,
  list: (params: OrderListParams) => [...ORDERS_QUERY_KEY, "list", params] as const,
  detail: (orderId: string) => [...ORDERS_QUERY_KEY, "detail", orderId] as const,
};

export const useGetOrders = (params: OrderListParams) =>
  useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => ordersService.getOrders(params),
    placeholderData: (previous) => previous,
  });

export const useGetOrder = (orderId: string | undefined) =>
  useQuery({
    queryKey: orderKeys.detail(orderId ?? ""),
    queryFn: () => ordersService.getOrder(orderId as string),
    enabled: Boolean(orderId),
  });

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      ordersService.updateOrderStatus(orderId, status),
    onSuccess: (_result, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
    },
  });
};
