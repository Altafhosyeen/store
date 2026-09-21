import { API_ENDPOINTS } from "@/constants";
import type { LookupBrand, LookupCategory } from "@/store";
import { MOCK_CATEGORIES } from "../data";
import { defineHandlers } from "../mock-router";

const BRANDS: LookupBrand[] = [
  { id: "brand-1", name: "Royal Nuts Farms" },
  { id: "brand-2", name: "Golden Harvest" },
];

export const lookupsHandlers = defineHandlers([
  {
    method: "GET",
    path: API_ENDPOINTS.LOOKUPS.CATEGORIES,
    resolve: (): LookupCategory[] =>
      MOCK_CATEGORIES.map(({ id, name, slug }) => ({ id, name, slug })),
  },
  {
    method: "GET",
    path: API_ENDPOINTS.LOOKUPS.BRANDS,
    resolve: (): LookupBrand[] => BRANDS,
  },
]);
