import { ACCOUNT_ENDPOINTS } from "@/features/account/constants/account.constants";
import type { OrderDto } from "@/features/orders";
import type { PaginatedResult, SessionUser } from "@/types";
import { makeOrderList, makePaginatedResult } from "../data";
import { defineHandlers } from "../mock-router";
import { setMockUser } from "./auth.handler";

const myOrders: OrderDto[] = makeOrderList(3);

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
        roleId: 3,
        permissions: [],
      };
      setMockUser(updated);
      return updated;
    },
  },
]);
