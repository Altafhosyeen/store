import type { ProductDto, ProductListParams, ProductPayload } from "@/features/products";
import { PRODUCTS_ENDPOINTS } from "@/features/products";
import type { PaginatedResult } from "@/types";
import { MOCK_CATEGORIES, makePaginatedResult, makeProductList } from "../data";
import { badRequest, defineHandlers, notFound } from "../mock-router";

let products: ProductDto[] = makeProductList(37);

const toDto = (id: string, payload: ProductPayload): ProductDto => {
  const category = MOCK_CATEGORIES.find((c) => c.id === payload.categoryId);
  const now = new Date().toISOString();
  return {
    id,
    name: payload.name,
    slug: payload.name.toLowerCase().replace(/\s+/g, "-"),
    description: payload.description,
    categoryId: payload.categoryId,
    categoryName: category?.name ?? "Uncategorized",
    brandId: payload.brandId,
    status: "draft",
    images: payload.images,
    variants: payload.variants.map((variant, index) => ({ id: `var-${id}-${index}`, ...variant })),
    tags: payload.tags ?? [],
    createdAt: now,
    updatedAt: now,
  };
};

export const productsHandlers = defineHandlers([
  {
    method: "GET",
    path: PRODUCTS_ENDPOINTS.LIST,
    resolve: ({ query }): PaginatedResult<ProductDto> => {
      const params = query as ProductListParams & Record<string, string>;
      let filtered = products;

      if (params.search) {
        const term = params.search.toLowerCase();
        filtered = filtered.filter((p) => p.name.toLowerCase().includes(term));
      }
      if (params.categoryId) {
        filtered = filtered.filter((p) => p.categoryId === params.categoryId);
      }
      if (params.status) {
        filtered = filtered.filter((p) => p.status === params.status);
      }

      const page = Number(params.page) || 1;
      const pageSize = Number(params.pageSize) || 12;
      const start = (page - 1) * pageSize;
      const pageItems = filtered.slice(start, start + pageSize);

      return makePaginatedResult(pageItems, { total: filtered.length, page, pageSize });
    },
  },
  {
    method: "GET",
    path: PRODUCTS_ENDPOINTS.DETAIL,
    resolve: ({ params }): ProductDto => {
      const product = products.find((p) => p.id === params.productId);
      return product ?? notFound("Product not found");
    },
  },
  {
    method: "POST",
    path: PRODUCTS_ENDPOINTS.CREATE,
    resolve: ({ body }): ProductDto => {
      const payload = body as ProductPayload | undefined;
      if (!payload?.name) return badRequest("name is required");
      const created = toDto(`prod-${products.length + 1}`, payload);
      products = [created, ...products];
      return created;
    },
  },
  {
    method: "PUT",
    path: PRODUCTS_ENDPOINTS.UPDATE,
    resolve: ({ params, body }): ProductDto => {
      const existing = products.find((p) => p.id === params.productId);
      if (!existing) return notFound("Product not found");
      const updated = { ...toDto(existing.id, body as ProductPayload), status: existing.status };
      products = products.map((p) => (p.id === existing.id ? updated : p));
      return updated;
    },
  },
  {
    method: "DELETE",
    path: PRODUCTS_ENDPOINTS.DELETE,
    resolve: ({ params }) => {
      products = products.filter((p) => p.id !== params.productId);
      return undefined;
    },
  },
  {
    method: "POST",
    path: PRODUCTS_ENDPOINTS.PUBLISH,
    resolve: ({ params }) => {
      products = products.map((p) =>
        p.id === params.productId ? { ...p, status: "published" } : p,
      );
      return undefined;
    },
  },
  {
    method: "POST",
    path: PRODUCTS_ENDPOINTS.ARCHIVE,
    resolve: ({ params }) => {
      products = products.map((p) =>
        p.id === params.productId ? { ...p, status: "archived" } : p,
      );
      return undefined;
    },
  },
]);
