import type { PaginationParams } from "@/types";

export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  productCount: number;
}

export interface CategoryListParams extends PaginationParams {}

export interface CategoryPayload {
  name: string;
  description?: string;
  imageUrl?: string;
}
