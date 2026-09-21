import type { PlaceOrderPayload, PlaceOrderResultDto } from "@/features/checkout";
import { CHECKOUT_ENDPOINTS } from "@/features/checkout";
import { defineHandlers } from "../mock-router";

let orderCounter = 100;

export const checkoutHandlers = defineHandlers([
  {
    method: "POST",
    path: CHECKOUT_ENDPOINTS.PLACE_ORDER,
    resolve: ({ body }): PlaceOrderResultDto => {
      const payload = body as PlaceOrderPayload;
      const total = payload.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
      orderCounter += 1;
      return { orderId: `order-${orderCounter}`, total };
    },
  },
]);
