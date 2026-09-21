import type { CategoryDto, CategoryPayload } from "@/features/categories";
import { CATEGORIES_ENDPOINTS } from "@/features/categories";
import type { PaginatedResult } from "@/types";
import { MOCK_CATEGORIES, makePaginatedResult } from "../data";
import { badRequest, defineHandlers, notFound } from "../mock-router";

let categories: CategoryDto[] = [...MOCK_CATEGORIES];

export const categoriesHandlers = defineHandlers([
  {
    method: "GET",
    path: CATEGORIES_ENDPOINTS.LIST,
    resolve: (): PaginatedResult<CategoryDto> => makePaginatedResult(categories),
  },
  {
    method: "GET",
    path: CATEGORIES_ENDPOINTS.DETAIL,
    resolve: ({ params }): CategoryDto =>
      categories.find((c) => c.id === params.categoryId) ?? notFound("Category not found"),
  },
  {
    method: "POST",
    path: CATEGORIES_ENDPOINTS.CREATE,
    resolve: ({ body }): CategoryDto => {
      const payload = body as CategoryPayload | undefined;
      if (!payload?.name) return badRequest("name is required");
      const created: CategoryDto = {
        id: `cat-${categories.length + 1}`,
        name: payload.name,
        slug: payload.name.toLowerCase().replace(/\s+/g, "-"),
        description: payload.description,
        imageUrl: payload.imageUrl,
        productCount: 0,
      };
      categories = [created, ...categories];
      return created;
    },
  },
  {
    method: "PUT",
    path: CATEGORIES_ENDPOINTS.UPDATE,
    resolve: ({ params, body }): CategoryDto => {
      const existing = categories.find((c) => c.id === params.categoryId);
      if (!existing) return notFound("Category not found");
      const payload = body as CategoryPayload;
      const updated = { ...existing, ...payload };
      categories = categories.map((c) => (c.id === existing.id ? updated : c));
      return updated;
    },
  },
  {
    method: "DELETE",
    path: CATEGORIES_ENDPOINTS.DELETE,
    resolve: ({ params }) => {
      categories = categories.filter((c) => c.id !== params.categoryId);
      return undefined;
    },
  },
]);
