import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { PermissionRoute } from "@/app/router/PermissionRoute";
import { PERMISSIONS, param, SEGMENTS } from "@/constants";

const ProductsListPage = lazy(() =>
  import("./pages/ProductsListPage").then((module) => ({ default: module.ProductsListPage })),
);
const ProductFormPage = lazy(() =>
  import("./pages/ProductFormPage").then((module) => ({ default: module.ProductFormPage })),
);
const ProductDetailPage = lazy(() =>
  import("./pages/ProductDetailPage").then((module) => ({ default: module.ProductDetailPage })),
);
const ShopPage = lazy(() =>
  import("./pages/ShopPage").then((module) => ({ default: module.ShopPage })),
);
const StorefrontProductDetailPage = lazy(() =>
  import("./pages/StorefrontProductDetailPage").then((module) => ({
    default: module.StorefrontProductDetailPage,
  })),
);

/** Mounted under /app by the root router; paths here are relative. */
export const productsRoutes: RouteObject[] = [
  {
    path: "products",
    element: <PermissionRoute permissions={[PERMISSIONS.PRODUCTS_VIEW]} />,
    children: [
      { index: true, element: <ProductsListPage /> },
      {
        path: SEGMENTS.NEW,
        element: <PermissionRoute permissions={[PERMISSIONS.PRODUCTS_CREATE]} />,
        children: [{ index: true, element: <ProductFormPage /> }],
      },
      { path: param(SEGMENTS.PRODUCT_ID), element: <ProductDetailPage /> },
    ],
  },
];

/** Mounted under the public StorefrontLayout by the root router. */
export const shopRoutes: RouteObject[] = [
  { index: true, element: <ShopPage /> },
  { path: param(SEGMENTS.PRODUCT_ID), element: <StorefrontProductDetailPage /> },
];
