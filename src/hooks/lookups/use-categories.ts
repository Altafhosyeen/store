import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, QUERY_KEYS, STALE_TIME } from "@/constants";
import { apiClient } from "@/services/api";
import type { LookupCategory } from "@/store";

export const getCategories = () =>
  apiClient.get<LookupCategory[]>(API_ENDPOINTS.LOOKUPS.CATEGORIES);

/** Tier 1. Call the cache hook instead of this one for display purposes. */
export const useCategories = ({ enabled }: { enabled: boolean }) =>
  useQuery({
    queryKey: QUERY_KEYS.LOOKUPS,
    queryFn: getCategories,
    enabled,
    staleTime: STALE_TIME.LOOKUP,
  });
