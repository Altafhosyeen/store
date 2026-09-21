import { Navigate, type RouteObject } from "react-router-dom";
import { AdminLayout } from "@/app/layouts/AdminLayout";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { StorefrontLayout } from "@/app/layouts/StorefrontLayout";
import { ROUTES, SEGMENTS } from "@/constants";
import { accountRoutes } from "@/features/account";
import { authRoutes } from "@/features/auth";
import { cartRoutes } from "@/features/cart";
import { categoriesRoutes, storefrontCategoriesRoutes } from "@/features/categories";
import { checkoutRoutes } from "@/features/checkout";
import { customersRoutes } from "@/features/customers";
import { dashboardRoutes } from "@/features/dashboard";
import { ordersRoutes } from "@/features/orders";
import { productsRoutes, shopRoutes } from "@/features/products";
import { NotFoundRoute } from "./NotFoundRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { UnauthorizedRoute } from "./UnauthorizedRoute";

// Each feature owns its own route objects, lazy-loading and permission
// guards. This file only decides which shell and which access boundary they
// mount under.
export const routes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [{ element: <AuthLayout />, children: authRoutes }],
  },

  // Admin + Staff console.
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: SEGMENTS.APP,
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to={ROUTES.ADMIN_DASHBOARD} replace /> },
          ...dashboardRoutes,
          ...productsRoutes,
          ...categoriesRoutes,
          ...ordersRoutes,
          ...customersRoutes,
        ],
      },
    ],
  },

  // Public storefront: browsing and cart are open to guests; account is not.
  {
    element: <StorefrontLayout />,
    children: [
      { path: ROUTES.SHOP, children: shopRoutes },
      { path: ROUTES.CATEGORIES, children: storefrontCategoriesRoutes },
      { path: ROUTES.CART, children: cartRoutes },
      { path: ROUTES.CHECKOUT, children: checkoutRoutes },
      {
        path: ROUTES.ACCOUNT,
        element: <ProtectedRoute />,
        children: accountRoutes,
      },
    ],
  },

  { path: ROUTES.UNAUTHORIZED, element: <UnauthorizedRoute /> },
  { path: ROUTES.ROOT, element: <Navigate to={ROUTES.SHOP} replace /> },
  { path: "*", element: <NotFoundRoute /> },
];
