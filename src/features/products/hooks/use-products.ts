import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { productsService } from "../services/products.service";
import type { ProductListParams, ProductPayload } from "../types/products-api.types";

export const PRODUCTS_QUERY_KEY = QUERY_KEYS.PRODUCTS;

export const productKeys = {
  all: PRODUCTS_QUERY_KEY,
  list: (params: ProductListParams) => [...PRODUCTS_QUERY_KEY, "list", params] as const,
  detail: (productId: string) => [...PRODUCTS_QUERY_KEY, "detail", productId] as const,
};

export const useGetProducts = (params: ProductListParams) =>
  useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productsService.getProducts(params),
    // Keeps the previous page visible while the next one loads, so paging does
    // not blank the grid/table on every click.
    placeholderData: (previous) => previous,
  });

export const useGetProduct = (productId: string | undefined) =>
  useQuery({
    queryKey: productKeys.detail(productId ?? ""),
    queryFn: () => productsService.getProduct(productId as string),
    enabled: Boolean(productId),
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductPayload) => productsService.createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, payload }: { productId: string; payload: ProductPayload }) =>
      productsService.updateProduct(productId, payload),
    onSuccess: (_result, { productId }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productsService.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};

export const usePublishProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productsService.publishProduct(productId),
    onSuccess: (_result, productId) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};

export const useArchiveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productsService.archiveProduct(productId),
    onSuccess: (_result, productId) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};
