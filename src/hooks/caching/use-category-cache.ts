import { useEffect } from "react";
import type { LookupCategory } from "@/store";
import { useLookupStore } from "@/store";
import { useCategories } from "../lookups/use-categories";

/**
 * Tier 2. The query runs only while the store is empty, so the first screen
 * that needs categories triggers the single fetch for the whole session and
 * every later caller reads the store with no loading state.
 */
export const useCategoryCache = (): LookupCategory[] => {
  const categories = useLookupStore((state) => state.categories);
  const setCategories = useLookupStore((state) => state.setCategories);

  const { data, isSuccess, isFetching } = useCategories({ enabled: categories.length === 0 });

  useEffect(() => {
    if (categories.length === 0 && isSuccess && !isFetching && data) {
      setCategories([...data].sort((a, b) => a.name.localeCompare(b.name)));
    }
  }, [categories.length, data, isFetching, isSuccess, setCategories]);

  return categories;
};
