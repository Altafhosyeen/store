import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { categoriesService } from "../services/categories.service";
import type { CategoryListParams, CategoryPayload } from "../types/categories-api.types";

export const CATEGORIES_QUERY_KEY = QUERY_KEYS.CATEGORIES;

export const categoryKeys = {
  all: CATEGORIES_QUERY_KEY,
  list: (params: CategoryListParams) => [...CATEGORIES_QUERY_KEY, "list", params] as const,
  detail: (categoryId: string) => [...CATEGORIES_QUERY_KEY, "detail", categoryId] as const,
};

/** Admin CRUD list — distinct from the Tier-2 lookup cache used for filters. */
export const useGetCategoriesAdmin = (params: CategoryListParams) =>
  useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: () => categoriesService.getCategories(params),
    placeholderData: (previous) => previous,
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CategoryPayload) => categoriesService.createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOOKUPS });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId, payload }: { categoryId: string; payload: CategoryPayload }) =>
      categoriesService.updateCategory(categoryId, payload),
    onSuccess: (_result, { categoryId }) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(categoryId) });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOOKUPS });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId: string) => categoriesService.deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOOKUPS });
    },
  });
};
