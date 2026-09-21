import { ApiError, type ApiErrorKind } from "@/services/api";
import type { PaginatedResult } from "@/types";

/**
 * Wraps rows in the pagination envelope the backend returns, so a test asserts
 * against the same shape a page receives instead of a bare array.
 */
export const makePaginatedResult = <T>(
  items: T[],
  overrides: Partial<Omit<PaginatedResult<T>, "items">> = {},
): PaginatedResult<T> => ({
  total: items.length,
  page: 1,
  pageSize: items.length,
  ...overrides,
  items,
});

/** An empty page, for asserting the empty state a list renders. */
export const makeEmptyResult = <T>(): PaginatedResult<T> => makePaginatedResult<T>([]);

const STATUS_BY_KIND: Record<ApiErrorKind, number> = {
  network: 0,
  timeout: 0,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  validation: 400,
  conflict: 409,
  server: 500,
  unknown: 520,
};

/**
 * The normalized error features actually handle. Tests construct this rather
 * than an AxiosError, because everything above the client only ever sees it.
 */
export const makeApiError = (
  kind: ApiErrorKind = "server",
  overrides: { message?: string; status?: number; fieldErrors?: Record<string, string[]> } = {},
): ApiError =>
  new ApiError({
    message: overrides.message ?? `mock ${kind} error`,
    kind,
    status: overrides.status ?? STATUS_BY_KIND[kind],
    fieldErrors: overrides.fieldErrors,
  });
