import { apiClient } from "@/services/api";
import { DASHBOARD_ENDPOINTS } from "../constants/dashboard.constants";
import type { DashboardSummaryDto } from "../types/dashboard-api.types";

export const dashboardService = {
  getSummary: () => apiClient.get<DashboardSummaryDto>(DASHBOARD_ENDPOINTS.SUMMARY),
};
