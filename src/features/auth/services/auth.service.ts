import { API_ENDPOINTS } from "@/constants";
import { apiClient } from "@/services/api";
import type { LoginPayload, LoginResponse, RegisterPayload } from "@/types";

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<LoginResponse, LoginPayload>(API_ENDPOINTS.AUTH.LOGIN, payload, {
      isPublic: true,
    }),

  register: (payload: RegisterPayload) =>
    apiClient.post<LoginResponse, RegisterPayload>(API_ENDPOINTS.AUTH.REGISTER, payload, {
      isPublic: true,
    }),

  forgotPassword: (email: string) =>
    apiClient.post<void, { email: string }>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email },
      { isPublic: true },
    ),
};
