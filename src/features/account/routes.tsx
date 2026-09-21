import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { param, SEGMENTS } from "@/constants";

const AccountOverviewPage = lazy(() =>
  import("./pages/AccountOverviewPage").then((m) => ({ default: m.AccountOverviewPage })),
);
const MyOrdersPage = lazy(() =>
  import("./pages/MyOrdersPage").then((m) => ({ default: m.MyOrdersPage })),
);
const AddressesPage = lazy(() =>
  import("./pages/AddressesPage").then((m) => ({ default: m.AddressesPage })),
);
const ProfilePage = lazy(() =>
  import("./pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);

/** Mounted under the public StorefrontLayout, behind ProtectedRoute. */
export const accountRoutes: RouteObject[] = [
  {
    element: <AccountOverviewPage />,
    children: [
      { index: true, element: <MyOrdersPage /> },
      { path: SEGMENTS.ORDERS, element: <MyOrdersPage /> },
      { path: `${SEGMENTS.ORDERS}/${param(SEGMENTS.ORDER_ID)}`, element: <MyOrdersPage /> },
      { path: SEGMENTS.ADDRESSES, element: <AddressesPage /> },
      { path: SEGMENTS.PROFILE, element: <ProfilePage /> },
    ],
  },
];
