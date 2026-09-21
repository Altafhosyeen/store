import { apiClient } from "@/services/api";
import type { PaginatedResult } from "@/types";
import { CUSTOMERS_ENDPOINTS } from "../constants/customers.constants";
import type { CustomerDto, CustomerListParams } from "../types/customers-api.types";

export const customersService = {
  getCustomers: (params: CustomerListParams) =>
    apiClient.get<PaginatedResult<CustomerDto>>(CUSTOMERS_ENDPOINTS.LIST, { params }),
};
