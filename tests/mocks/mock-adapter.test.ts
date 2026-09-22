import { MOCK_ADMIN, MOCK_PRODUCTS } from "@tests/mocks";
import { describe, expect, it } from "vitest";
import { API_ENDPOINTS } from "@/constants";
import type { ProductDto } from "@/features/products";
import { PRODUCTS_ENDPOINTS } from "@/features/products";
import { mockAdapter } from "@/mocks/mock-adapter";
import { apiClient, axiosInstance } from "@/services/api";
import type { LoginResponse, PaginatedResult } from "@/types";

/**
 * Drives the real axios instance with the mock adapter installed, so this
 * covers what the app actually does at runtime: client -> interceptors ->
 * adapter -> envelope unwrapping.
 */
const withMockTransport = async <T>(run: () => Promise<T>): Promise<T> => {
  const original = axiosInstance.defaults.adapter;
  axiosInstance.defaults.adapter = mockAdapter;
  try {
    return await run();
  } finally {
    axiosInstance.defaults.adapter = original;
  }
};

describe("mock transport through the shared client", () => {
  it("unwraps the backend envelope so callers get the payload", async () => {
    const page = await withMockTransport(() =>
      apiClient.get<PaginatedResult<ProductDto>>(PRODUCTS_ENDPOINTS.LIST, {
        params: { page: 1, pageSize: 5 },
      }),
    );

    // Not an ApiResponse wrapper: the client already stripped `Result`.
    expect(page.items).toHaveLength(5);
    expect(page.total).toBe(MOCK_PRODUCTS.length);
  });

  it("signs in through the real client and returns tokens", async () => {
    const response = await withMockTransport(() =>
      apiClient.post<LoginResponse, { email: string; password: string }>(
        API_ENDPOINTS.AUTH.LOGIN,
        { email: MOCK_ADMIN.email, password: "anything" },
        { isPublic: true },
      ),
    );

    expect(response.user.email).toBe(MOCK_ADMIN.email);
    expect(response.accessToken).toBeTruthy();
  });

  it("surfaces an unmocked endpoint as a normalized error, not empty data", async () => {
    await expect(withMockTransport(() => apiClient.get("/api/not-mocked/"))).rejects.toThrow();
  });
});
