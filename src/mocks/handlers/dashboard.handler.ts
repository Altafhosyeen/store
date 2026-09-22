import type { DashboardSummaryDto } from "@/features/dashboard";
import { DASHBOARD_ENDPOINTS } from "@/features/dashboard";
import { ORDER_STATUS } from "@/features/orders";
import { PRODUCT_STATUS } from "@/features/products";
import { MOCK_CUSTOMERS, MOCK_ORDERS, MOCK_PRODUCTS } from "../data";
import { defineHandlers } from "../mock-router";

export const dashboardHandlers = defineHandlers([
  {
    method: "GET",
    path: DASHBOARD_ENDPOINTS.SUMMARY,
    resolve: (): DashboardSummaryDto => ({
      totalRevenue:
        Math.round(MOCK_ORDERS.reduce((sum, order) => sum + order.total, 0) * 100) / 100,
      totalOrders: MOCK_ORDERS.length,
      totalProducts: MOCK_PRODUCTS.filter((p) => p.status === PRODUCT_STATUS.PUBLISHED).length,
      totalCustomers: MOCK_CUSTOMERS.length,
      pendingOrders: MOCK_ORDERS.filter((o) => o.status === ORDER_STATUS.PENDING).length,
    }),
  },
]);
