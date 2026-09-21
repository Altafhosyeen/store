import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { PermissionRoute } from "@/app/router/PermissionRoute";
import { PERMISSIONS, SEGMENTS } from "@/constants";

const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: SEGMENTS.DASHBOARD,
    element: <PermissionRoute permissions={[PERMISSIONS.DASHBOARD_VIEW]} />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
];
