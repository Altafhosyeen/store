import type { CartLine } from "@/store";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
}

export interface PlaceOrderPayload {
  address: ShippingAddress;
  paymentMethod: string;
  lines: Array<Pick<CartLine, "productId" | "variantLabel" | "quantity" | "unitPrice">>;
}

export interface PlaceOrderResultDto {
  orderId: string;
  total: number;
}
