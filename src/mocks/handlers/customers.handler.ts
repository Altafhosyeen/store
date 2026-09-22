import type { CustomerDto } from "@/features/customers";
import { CUSTOMERS_ENDPOINTS } from "@/features/customers";
import type { PaginatedResult } from "@/types";
import { MOCK_CUSTOMERS, makePaginatedResult } from "../data";
import { defineHandlers } from "../mock-router";

export const customersHandlers = defineHandlers([
  {
    method: "GET",
    path: CUSTOMERS_ENDPOINTS.LIST,
    resolve: (): PaginatedResult<CustomerDto> => makePaginatedResult(MOCK_CUSTOMERS),
  },
]);
