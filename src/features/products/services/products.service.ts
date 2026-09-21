import { buildRoute } from "@/constants";
import { apiClient } from "@/services/api";
import type { PaginatedResult } from "@/types";
import { PRODUCTS_ENDPOINTS } from "../constants/products.constants";
import type { ProductDto, ProductListParams, ProductPayload } from "../types/products-api.types";

/**
 * The only layer in this feature that talks to the backend:
 * components -> hooks -> service -> apiClient.
 */
export const productsService = {
  getProducts: (params: ProductListParams) =>
    apiClient.get<PaginatedResult<ProductDto>>(PRODUCTS_ENDPOINTS.LIST, { params }),

  getProduct: (productId: string) =>
    apiClient.get<ProductDto>(buildRoute(PRODUCTS_ENDPOINTS.DETAIL, { productId })),

  createProduct: (payload: ProductPayload) =>
    apiClient.post<ProductDto, ProductPayload>(PRODUCTS_ENDPOINTS.CREATE, payload),

  updateProduct: (productId: string, payload: ProductPayload) =>
    apiClient.put<ProductDto, ProductPayload>(
      buildRoute(PRODUCTS_ENDPOINTS.UPDATE, { productId }),
      payload,
    ),

  deleteProduct: (productId: string) =>
    apiClient.delete<void>(buildRoute(PRODUCTS_ENDPOINTS.DELETE, { productId })),

  publishProduct: (productId: string) =>
    apiClient.post<void>(buildRoute(PRODUCTS_ENDPOINTS.PUBLISH, { productId })),

  archiveProduct: (productId: string) =>
    apiClient.post<void>(buildRoute(PRODUCTS_ENDPOINTS.ARCHIVE, { productId })),
};
