import { HOME_SECTION_IDS, ROUTES } from "@/constants";

/** Query-string keys the home page's Shop section reads its initial filters from. */
export const SHOP_QUERY_PARAMS = {
  search: "q",
  category: "cat",
} as const;

/** A link into the home page's Shop section, optionally pre-filtered — e.g. `/?q=badam#shop`. */
export const buildShopLink = (filters: { search?: string; category?: string } = {}): string => {
  const params = new URLSearchParams();
  if (filters.search) params.set(SHOP_QUERY_PARAMS.search, filters.search);
  if (filters.category) params.set(SHOP_QUERY_PARAMS.category, filters.category);
  const query = params.toString();
  return `${ROUTES.HOME}${query ? `?${query}` : ""}#${HOME_SECTION_IDS.shop}`;
};
