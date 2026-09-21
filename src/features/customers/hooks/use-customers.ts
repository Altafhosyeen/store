import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { customersService } from "../services/customers.service";
import type { CustomerListParams } from "../types/customers-api.types";

export const useGetCustomers = (params: CustomerListParams) =>
  useQuery({
    queryKey: [...QUERY_KEYS.CUSTOMERS, "list", params],
    queryFn: () => customersService.getCustomers(params),
    placeholderData: (previous) => previous,
  });
