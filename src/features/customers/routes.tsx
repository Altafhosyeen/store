import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { PermissionRoute } from "@/app/router/PermissionRoute";
import { PERMISSIONS } from "@/constants";

const CustomersListPage = lazy(() =>
  import("./pages/CustomersListPage").then((m) => ({ default: m.CustomersListPage })),
);

export const customersRoutes: RouteObject[] = [
  {
    path: "customers",
    element: <PermissionRoute permissions={[PERMISSIONS.CUSTOMERS_VIEW]} />,
    children: [{ index: true, element: <CustomersListPage /> }],
  },
];
