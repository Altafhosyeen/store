import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, QUERY_KEYS, STALE_TIME } from "@/constants";
import { apiClient } from "@/services/api";
import type { LookupBrand } from "@/store";

export const getBrands = () => apiClient.get<LookupBrand[]>(API_ENDPOINTS.LOOKUPS.BRANDS);

/** Tier 1. Call the cache hook instead of this one for display purposes. */
export const useBrands = ({ enabled }: { enabled: boolean }) =>
  useQuery({
    queryKey: [...QUERY_KEYS.LOOKUPS, "brands"],
    queryFn: getBrands,
    enabled,
    staleTime: STALE_TIME.LOOKUP,
  });
