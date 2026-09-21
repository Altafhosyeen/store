import type { DashboardSummaryDto } from "@/features/dashboard";
import { DASHBOARD_ENDPOINTS } from "@/features/dashboard";
import { defineHandlers } from "../mock-router";

export const dashboardHandlers = defineHandlers([
  {
    method: "GET",
    path: DASHBOARD_ENDPOINTS.SUMMARY,
    resolve: (): DashboardSummaryDto => ({
      totalRevenue: 18420.5,
      totalOrders: 312,
      totalProducts: 48,
      totalCustomers: 214,
      pendingOrders: 9,
    }),
  },
]);
