import { PERMISSIONS, type Permission, USER_ROLES, type UserRoleId } from "@/constants";

/**
 * Client-side default permission set per role, used before the login
 * response's real permission list arrives. The backend independently
 * enforces the actual authorization.
 */
export const ROLE_PERMISSIONS: Record<UserRoleId, Permission[]> = {
  [USER_ROLES.ADMIN]: Object.values(PERMISSIONS),
  [USER_ROLES.STAFF]: [
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.PRODUCTS_CREATE,
    PERMISSIONS.PRODUCTS_UPDATE,
    PERMISSIONS.CATEGORIES_VIEW,
    PERMISSIONS.CATEGORIES_MANAGE,
    PERMISSIONS.ORDERS_VIEW,
    PERMISSIONS.ORDERS_MANAGE,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.DASHBOARD_VIEW,
  ],
  [USER_ROLES.CUSTOMER]: [],
};

export const getDefaultPermissions = (roleId: UserRoleId): Permission[] =>
  ROLE_PERMISSIONS[roleId] ?? [];
