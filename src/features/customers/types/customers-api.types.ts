import type { PaginationParams } from "@/types";

export interface CustomerDto {
  id: string;
  name: string;
  email: string;
  orderCount: number;
  totalSpent: number;
  createdAt: string;
}

export interface CustomerListParams extends PaginationParams {}
