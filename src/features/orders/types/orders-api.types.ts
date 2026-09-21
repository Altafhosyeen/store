import type { PaginationParams } from "@/types";
import type { ORDER_STATUS, PAYMENT_STATUS } from "../constants/orders.constants";

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export interface OrderLineDto {
  productId: string;
  name: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderDto {
  id: string;
  customerId: string;
  customerName: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  lines: OrderLineDto[];
  total: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    postalCode: string;
  };
  createdAt: string;
}

export interface OrderListParams extends PaginationParams {
  status?: OrderStatus;
}
