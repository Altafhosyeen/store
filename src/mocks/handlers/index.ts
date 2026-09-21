import type { MockHandler } from "../mock-router";
import { accountHandlers } from "./account.handler";
import { authHandlers } from "./auth.handler";
import { categoriesHandlers } from "./categories.handler";
import { checkoutHandlers } from "./checkout.handler";
import { customersHandlers } from "./customers.handler";
import { dashboardHandlers } from "./dashboard.handler";
import { lookupsHandlers } from "./lookups.handler";
import { ordersHandlers } from "./orders.handler";
import { productsHandlers } from "./products.handler";

export const handlers: MockHandler[] = [
  ...authHandlers,
  ...lookupsHandlers,
  ...productsHandlers,
  ...categoriesHandlers,
  ...ordersHandlers,
  ...checkoutHandlers,
  ...dashboardHandlers,
  ...customersHandlers,
  ...accountHandlers,
];
