import type { ProductDto, ProductListParams, ProductPayload } from "@/features/products";
import {
  getDisplayPrice,
  getPopularityScore,
  matchesSearch,
  PRODUCTS_ENDPOINTS,
} from "@/features/products";
import type { PaginatedResult } from "@/types";
import { MOCK_CATEGORIES, MOCK_PRODUCTS, makePaginatedResult } from "../data";
import { badRequest, defineHandlers, notFound } from "../mock-router";

let products: ProductDto[] = [...MOCK_PRODUCTS];

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

      if (params.search?.trim()) {
        const search = params.search;
        filtered = filtered.filter((p) => matchesSearch(p, search));
      }
      if (params.categoryId) {
        filtered = filtered.filter((p) => p.categoryId === params.categoryId);
      }
      if (params.status) {
        filtered = filtered.filter((p) => p.status === params.status);
      }
      const minPrice = params.minPrice !== undefined ? Number(params.minPrice) : undefined;
      const maxPrice = params.maxPrice !== undefined ? Number(params.maxPrice) : undefined;
      if (minPrice !== undefined || maxPrice !== undefined) {
        filtered = filtered.filter((p) =>
          p.variants.some(
            (v) =>
              (minPrice === undefined || v.price >= minPrice) &&
              (maxPrice === undefined || v.price <= maxPrice),
          ),
        );
      }
      if (params.weight) {
        filtered = filtered.filter((p) => p.variants.some((v) => v.label === params.weight));
      }
      const displayMin = params.displayPriceMin !== undefined ? Number(params.displayPriceMin) : 0;
      const displayMax =
        params.displayPriceMax !== undefined
          ? Number(params.displayPriceMax)
          : Number.POSITIVE_INFINITY;
      if (params.displayPriceMin !== undefined || params.displayPriceMax !== undefined) {
        filtered = filtered.filter((p) => {
          const price = getDisplayPrice(p);
          return price >= displayMin && price <= displayMax;
        });
      }
      if (String(params.bestSeller) === "true") {
        filtered = filtered.filter((p) => p.isBestSeller);
      }
      if (String(params.royal) === "true") {
        filtered = filtered.filter((p) => p.isRoyal);
      }
      if (params.minRating !== undefined) {
        const minRating = Number(params.minRating);
        filtered = filtered.filter((p) => (p.rating ?? 0) >= minRating);
      }

      const sorted = [...filtered];
      const newest = (a: ProductDto, b: ProductDto) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      switch (params.sort) {
        case "price-asc":
          sorted.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b));
          break;
        case "price-desc":
          sorted.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a));
          break;
        case "new":
          sorted.sort(
            (a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false) || newest(a, b),
          );
          break;
        case "rating":
          sorted.sort(
            (a, b) =>
              (b.rating ?? 0) - (a.rating ?? 0) || (b.reviewCount ?? 0) - (a.reviewCount ?? 0),
          );
          break;
        case "bestselling":
          sorted.sort(
            (a, b) =>
              Number(b.isBestSeller ?? false) - Number(a.isBestSeller ?? false) ||
              (b.reviewCount ?? 0) - (a.reviewCount ?? 0),
          );
          break;
        case "popular":
          sorted.sort((a, b) => getPopularityScore(b) - getPopularityScore(a));
          break;
        default:
          break;
      }

      const page = Number(params.page) || 1;
      const pageSize = Number(params.pageSize) || 12;
      const start = (page - 1) * pageSize;
      const pageItems = sorted.slice(start, start + pageSize);

      return makePaginatedResult(pageItems, { total: sorted.length, page, pageSize });
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
