import type { StoreImageKey } from "@/assets/images";

/** One reference-catalogue product, before it's expanded into a ProductDto. */
export interface CatalogEntry {
  name: string;
  urduName: string;
  categorySlug: string;
  /** Small caps label above the name, e.g. "Almonds • Badam". */
  subtitle: string;
  image: StoreImageKey;
  description: string;
  /** Pack label → sale price in PKR, in display order (e.g. 100g, 250g, 500g, 1kg). */
  prices: Record<string, number>;
  /** When set, each pack's compare-at price is back-computed from this discount. */
  salePercent?: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isRoyal?: boolean;
  isNew?: boolean;
  inStock?: boolean;
  origin: string;
  texture: string;
  taste: string;
  bestFor: string;
  keywords: string;
}
