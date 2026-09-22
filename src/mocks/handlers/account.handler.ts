import { USER_ROLES } from "@/constants";
import { ACCOUNT_ENDPOINTS } from "@/features/account/constants/account.constants";
import type { OrderDto } from "@/features/orders";
import type { PaginatedResult, SessionUser } from "@/types";
import { MOCK_CUSTOMER, MOCK_ORDERS, makePaginatedResult } from "../data";
import { defineHandlers } from "../mock-router";
import { setMockUser } from "./auth.handler";

/** The signed-in mock customer's own past orders, pulled from the shared order list. */
const myOrders: OrderDto[] = MOCK_ORDERS.filter((order) => order.customerId === MOCK_CUSTOMER.id);

export const accountHandlers = defineHandlers([
  {
    method: "GET",
    path: ACCOUNT_ENDPOINTS.MY_ORDERS,
    resolve: (): PaginatedResult<OrderDto> => makePaginatedResult(myOrders),
  },
  {
    method: "PATCH",
    path: ACCOUNT_ENDPOINTS.UPDATE_PROFILE,
    resolve: ({ body }): SessionUser => {
      const { name } = body as { name: string };
      const updated: SessionUser = {
        id: "u-customer",
        name,
        email: "cara@example.com",
        roleId: USER_ROLES.CUSTOMER,
        permissions: [],
      };
      setMockUser(updated);
      return updated;
    },
  },
]);
