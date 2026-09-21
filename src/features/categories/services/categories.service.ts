import { buildRoute } from "@/constants";
import { apiClient } from "@/services/api";
import type { PaginatedResult } from "@/types";
import { CATEGORIES_ENDPOINTS } from "../constants/categories.constants";
import type {
  CategoryDto,
  CategoryListParams,
  CategoryPayload,
} from "../types/categories-api.types";

export const categoriesService = {
  getCategories: (params: CategoryListParams) =>
    apiClient.get<PaginatedResult<CategoryDto>>(CATEGORIES_ENDPOINTS.LIST, { params }),

  getCategory: (categoryId: string) =>
    apiClient.get<CategoryDto>(buildRoute(CATEGORIES_ENDPOINTS.DETAIL, { categoryId })),

  createCategory: (payload: CategoryPayload) =>
    apiClient.post<CategoryDto, CategoryPayload>(CATEGORIES_ENDPOINTS.CREATE, payload),

  updateCategory: (categoryId: string, payload: CategoryPayload) =>
    apiClient.put<CategoryDto, CategoryPayload>(
      buildRoute(CATEGORIES_ENDPOINTS.UPDATE, { categoryId }),
      payload,
    ),

  deleteCategory: (categoryId: string) =>
    apiClient.delete<void>(buildRoute(CATEGORIES_ENDPOINTS.DELETE, { categoryId })),
};
