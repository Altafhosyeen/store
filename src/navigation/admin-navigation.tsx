import {
  AppstoreOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { PERMISSIONS, ROUTES } from "@/constants";
import type { NavigationItem } from "./navigation.types";

/** Admin console menu. Visibility is permission-driven, not role-driven. */
export const ADMIN_NAVIGATION: NavigationItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: ROUTES.ADMIN_DASHBOARD,
    icon: <DashboardOutlined />,
    permissions: [PERMISSIONS.DASHBOARD_VIEW],
  },
  {
    key: "catalog",
    label: "Catalog",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "products",
        label: "Products",
        path: ROUTES.ADMIN_PRODUCTS,
        icon: <ShoppingOutlined />,
        permissions: [PERMISSIONS.PRODUCTS_VIEW],
      },
      {
        key: "categories",
        label: "Categories",
        path: ROUTES.ADMIN_CATEGORIES,
        permissions: [PERMISSIONS.CATEGORIES_VIEW],
      },
    ],
  },
  {
    key: "orders",
    label: "Orders",
    path: ROUTES.ADMIN_ORDERS,
    icon: <UnorderedListOutlined />,
    permissions: [PERMISSIONS.ORDERS_VIEW],
  },
  {
    key: "customers",
    label: "Customers",
    path: ROUTES.ADMIN_CUSTOMERS,
    icon: <TeamOutlined />,
    permissions: [PERMISSIONS.CUSTOMERS_VIEW],
  },
];
