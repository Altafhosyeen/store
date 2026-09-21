import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { PermissionRoute } from "@/app/router/PermissionRoute";
import { PERMISSIONS, param, SEGMENTS } from "@/constants";

const OrdersListPage = lazy(() =>
  import("./pages/OrdersListPage").then((m) => ({ default: m.OrdersListPage })),
);
const OrderDetailPage = lazy(() =>
  import("./pages/OrderDetailPage").then((m) => ({ default: m.OrderDetailPage })),
);

export const ordersRoutes: RouteObject[] = [
  {
    path: SEGMENTS.ORDERS,
    element: <PermissionRoute permissions={[PERMISSIONS.ORDERS_VIEW]} />,
    children: [
      { index: true, element: <OrdersListPage /> },
      { path: param(SEGMENTS.ORDER_ID), element: <OrderDetailPage /> },
    ],
  },
];
