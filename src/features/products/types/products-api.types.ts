import type { PaginationParams } from "@/types";
import type { PRODUCT_STATUS } from "../constants/products.constants";

export type ProductStatus = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];

export interface ProductVariantDto {
  id: string;
  label: string;
  /** e.g. 500 for "500g" — paired with a unit from UNIT_OPTIONS. */
  size: number;
  unit: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
}

/** Shape returned by the backend; the UI model may differ and is kept separate. */
export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  categoryName: string;
  brandId?: string;
  brandName?: string;
  status: ProductStatus;
  images: string[];
  variants: ProductVariantDto[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  /**
   * Storefront merchandising signals. No backend review system exists yet, so
   * these are optional and only mock mode populates them today — the UI must
   * degrade gracefully (no stars, no badge) when they're undefined.
   */
  rating?: number;
  reviewCount?: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  /** Reserved-for-the-finest line shown in the Royal Collection section. */
  isRoyal?: boolean;
  /** Urdu product name shown under the English one. */
  urduName?: string;
  /** Small caps label above the name, e.g. "Almonds • Badam". */
  subtitle?: string;
  /** Merchandising badge such as "Royal Pick" or "Fresh Batch". */
  badge?: string;
  /** Whole-number sale discount; compare-at prices on the variants carry the old price. */
  salePercent?: number;
  origin?: string;
  texture?: string;
  taste?: string;
  bestFor?: string;
  /** Extra search terms (Urdu transliterations, grades) matched by storefront search. */
  keywords?: string;
}

export type ProductSort = "popular" | "bestselling" | "price-asc" | "price-desc" | "new" | "rating";

export interface ProductListParams extends PaginationParams {
  categoryId?: string;
  brandId?: string;
  status?: ProductStatus;
  minPrice?: number;
  maxPrice?: number;
  /** Matches against any variant's `label` (e.g. "250g") — a product qualifies if it has that pack size. */
  weight?: string;
  minRating?: number;
  sort?: ProductSort;
  /** Only best sellers / only the Royal Collection — storefront showcase rows. */
  bestSeller?: boolean;
  royal?: boolean;
  /** Price band applied to the default (250g, else smallest) pack, as the storefront displays it. */
  displayPriceMin?: number;
  displayPriceMax?: number;
}

export interface ProductVariantPayload {
  label: string;
  size: number;
  unit: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
}

export interface ProductPayload {
  name: string;
  description: string;
  categoryId: string;
  brandId?: string;
  images: string[];
  variants: ProductVariantPayload[];
  tags?: string[];
}
