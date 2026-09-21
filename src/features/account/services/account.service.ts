import type { OrderDto } from "@/features/orders";
import { apiClient } from "@/services/api";
import type { PaginatedResult, SessionUser } from "@/types";
import { ACCOUNT_ENDPOINTS } from "../constants/account.constants";

/** The customer's own orders — same DTO the admin console uses, scoped by the backend to the caller. */
export const accountService = {
  getMyOrders: () => apiClient.get<PaginatedResult<OrderDto>>(ACCOUNT_ENDPOINTS.MY_ORDERS),

  updateProfile: (payload: { name: string }) =>
    apiClient.patch<SessionUser, { name: string }>(ACCOUNT_ENDPOINTS.UPDATE_PROFILE, payload),
};
