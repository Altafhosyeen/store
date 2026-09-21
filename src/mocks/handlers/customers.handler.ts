import type { CustomerDto } from "@/features/customers";
import { CUSTOMERS_ENDPOINTS } from "@/features/customers";
import type { PaginatedResult } from "@/types";
import { makePaginatedResult } from "../data";
import { defineHandlers } from "../mock-router";

const customers: CustomerDto[] = Array.from({ length: 14 }, (_, index) => ({
  id: `cust-${index + 1}`,
  name: `Customer ${index + 1}`,
  email: `customer${index + 1}@example.com`,
  orderCount: (index % 5) + 1,
  totalSpent: 20 + index * 7.5,
  createdAt: new Date().toISOString(),
}));

export const customersHandlers = defineHandlers([
  {
    method: "GET",
    path: CUSTOMERS_ENDPOINTS.LIST,
    resolve: (): PaginatedResult<CustomerDto> => makePaginatedResult(customers),
  },
]);
