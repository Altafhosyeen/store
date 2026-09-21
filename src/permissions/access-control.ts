import { CONSOLE_ROLES, type Permission, ROUTES, USER_ROLES, type UserRoleId } from "@/constants";
import type { SessionUser } from "@/types";

/**
 * Pure predicates, no React. They decide what the UI shows; the backend
 * independently decides what the API allows. Never treat these as a security
 * boundary.
 */
export const hasPermission = (user: SessionUser | null, permission: Permission): boolean =>
  Boolean(user?.permissions.includes(permission));

export const hasAnyPermission = (user: SessionUser | null, permissions: Permission[]): boolean =>
  permissions.some((permission) => hasPermission(user, permission));

export const hasAllPermissions = (user: SessionUser | null, permissions: Permission[]): boolean =>
  permissions.every((permission) => hasPermission(user, permission));

export const hasRole = (user: SessionUser | null, roles: UserRoleId[]): boolean =>
  Boolean(user && roles.includes(user.roleId));

export const isAdmin = (user: SessionUser | null): boolean => user?.roleId === USER_ROLES.ADMIN;

export const isCustomer = (user: SessionUser | null): boolean =>
  user?.roleId === USER_ROLES.CUSTOMER;

export const canAccessConsole = (user: SessionUser | null): boolean => hasRole(user, CONSOLE_ROLES);

/** Where to send the user right after sign-in, based on their role. */
export const getLandingRoute = (user: SessionUser | null): string =>
  canAccessConsole(user) ? ROUTES.ADMIN_DASHBOARD : ROUTES.SHOP;
