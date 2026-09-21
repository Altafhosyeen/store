import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { PermissionRoute } from "@/app/router/PermissionRoute";
import { PERMISSIONS, param, SEGMENTS } from "@/constants";

const CategoriesAdminPage = lazy(() =>
  import("./pages/CategoriesAdminPage").then((m) => ({ default: m.CategoriesAdminPage })),
);
const CategoriesPage = lazy(() =>
  import("./pages/CategoriesPage").then((m) => ({ default: m.CategoriesPage })),
);

export const categoriesRoutes: RouteObject[] = [
  {
    path: SEGMENTS.CATEGORIES,
    element: <PermissionRoute permissions={[PERMISSIONS.CATEGORIES_VIEW]} />,
    children: [{ index: true, element: <CategoriesAdminPage /> }],
  },
];

/** Mounted under the public StorefrontLayout. */
export const storefrontCategoriesRoutes: RouteObject[] = [
  { index: true, element: <CategoriesPage /> },
  { path: param(SEGMENTS.CATEGORY_SLUG), element: <CategoriesPage /> },
];
