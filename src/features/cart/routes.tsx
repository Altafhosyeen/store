import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const CartPage = lazy(() => import("./pages/CartPage").then((m) => ({ default: m.CartPage })));

/** Mounted under the public StorefrontLayout. */
export const cartRoutes: RouteObject[] = [{ index: true, element: <CartPage /> }];
