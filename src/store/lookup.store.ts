import { create } from "zustand";

export interface LookupCategory {
  id: string;
  name: string;
  slug: string;
}

export interface LookupBrand {
  id: string;
  name: string;
}

interface LookupState {
  categories: LookupCategory[];
  brands: LookupBrand[];
  setCategories: (categories: LookupCategory[]) => void;
  setBrands: (brands: LookupBrand[]) => void;
  resetLookups: () => void;
}

/**
 * Tier-2 cache for stable reference data, seeded once per session by a
 * caching hook (see src/hooks/caching). Reset on sign-out so the next user
 * does not inherit stale reference data.
 */
export const useLookupStore = create<LookupState>((set) => ({
  categories: [],
  brands: [],
  setCategories: (categories) => set({ categories }),
  setBrands: (brands) => set({ brands }),
  resetLookups: () => set({ categories: [], brands: [] }),
}));
