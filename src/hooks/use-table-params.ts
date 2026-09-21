import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PAGINATION } from "@/constants";
import type { PaginationParams } from "@/types";

/** Arbitrary feature filters ride alongside the standard pagination keys. */
export type TableParams = PaginationParams & Record<string, unknown>;

/**
 * Table state lives in the URL so a filtered view survives refresh, back/forward
 * and can be shared as a link.
 */
export const useTableParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo<TableParams>(
    () => ({
      page: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || PAGINATION.DEFAULT_PAGE_SIZE,
      search: searchParams.get("search") ?? undefined,
    }),
    [searchParams],
  );

  const setParams = useCallback(
    (next: TableParams) => {
      setSearchParams(
        (current) => {
          const updated = new URLSearchParams(current);
          for (const [key, value] of Object.entries(next)) {
            if (value === undefined || value === "" || value === null) {
              updated.delete(key);
            } else {
              updated.set(key, String(value));
            }
          }
          // Any filter change invalidates the current page offset.
          if (!("page" in next)) {
            updated.delete("page");
          }
          return updated;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return { params, setParams };
};
