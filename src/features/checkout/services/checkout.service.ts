import { apiClient } from "@/services/api";
import { CHECKOUT_ENDPOINTS } from "../constants/checkout.constants";
import type { PlaceOrderPayload, PlaceOrderResultDto } from "../types/checkout-api.types";

export const checkoutService = {
  placeOrder: (payload: PlaceOrderPayload) =>
    apiClient.post<PlaceOrderResultDto, PlaceOrderPayload>(CHECKOUT_ENDPOINTS.PLACE_ORDER, payload),
};
