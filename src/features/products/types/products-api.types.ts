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
}

export type ProductSort =
  | "popular"
  | "bestselling"
  | "price-asc"
  | "price-desc"
  | "new"
  | "rating";

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
