import { useEffect } from "react";
import type { LookupBrand } from "@/store";
import { useLookupStore } from "@/store";
import { useBrands } from "../lookups/use-brands";

/** Tier 2 cache for brands — same pattern as useCategoryCache. */
export const useBrandCache = (): LookupBrand[] => {
  const brands = useLookupStore((state) => state.brands);
  const setBrands = useLookupStore((state) => state.setBrands);

  const { data, isSuccess, isFetching } = useBrands({ enabled: brands.length === 0 });

  useEffect(() => {
    if (brands.length === 0 && isSuccess && !isFetching && data) {
      setBrands([...data].sort((a, b) => a.name.localeCompare(b.name)));
    }
  }, [brands.length, data, isFetching, isSuccess, setBrands]);

  return brands;
};
