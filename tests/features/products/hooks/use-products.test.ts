import { renderHookWithProviders, waitFor } from "@tests/support";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useGetProducts } from "@/features/products";
import { mockAdapter } from "@/mocks/mock-adapter";
import { axiosInstance } from "@/services/api";

/**
 * Exercises the hook against the mock transport, the same way the app talks
 * to the backend in mock mode: hook -> service -> apiClient -> adapter.
 */
describe("useGetProducts", () => {
  let originalAdapter: typeof axiosInstance.defaults.adapter;

  beforeEach(() => {
    originalAdapter = axiosInstance.defaults.adapter;
    axiosInstance.defaults.adapter = mockAdapter;
  });

  afterEach(() => {
    axiosInstance.defaults.adapter = originalAdapter;
  });

  it("resolves a page of products from the mock transport", async () => {
    const { result } = renderHookWithProviders(() => useGetProducts({ page: 1, pageSize: 5 }));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.items).toHaveLength(5);
    expect(result.current.data?.total).toBe(37);
  });

  it("filters by status", async () => {
    const { result } = renderHookWithProviders(() =>
      useGetProducts({ page: 1, pageSize: 50, status: "draft" }),
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.items.length).toBeGreaterThan(0);
    expect(result.current.data?.items.every((product) => product.status === "draft")).toBe(true);
  });
});
