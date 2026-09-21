import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { checkoutService } from "../services/checkout.service";
import type { PlaceOrderPayload } from "../types/checkout-api.types";

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PlaceOrderPayload) => checkoutService.placeOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
    },
  });
};
