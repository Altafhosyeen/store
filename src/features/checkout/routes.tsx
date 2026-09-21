import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { param, SEGMENTS } from "@/constants";

const CheckoutPage = lazy(() =>
  import("./pages/CheckoutPage").then((m) => ({ default: m.CheckoutPage })),
);
const OrderConfirmationPage = lazy(() =>
  import("./pages/OrderConfirmationPage").then((m) => ({ default: m.OrderConfirmationPage })),
);

/** Mounted under the public StorefrontLayout. */
export const checkoutRoutes: RouteObject[] = [
  { index: true, element: <CheckoutPage /> },
  {
    path: `${SEGMENTS.ORDER_CONFIRMATION}/${param(SEGMENTS.ORDER_ID)}`,
    element: <OrderConfirmationPage />,
  },
];
