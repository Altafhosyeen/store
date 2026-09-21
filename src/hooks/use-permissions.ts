import { useMemo } from "react";
import type { Permission, UserRoleId } from "@/constants";
import {
  canAccessConsole,
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
  hasRole,
  isAdmin,
  isCustomer,
} from "@/permissions";
import { useAuthStore } from "@/store";

/** Permission checks bound to the current user; the UI layer entry point. */
export const usePermissions = () => {
  const user = useAuthStore((state) => state.user);

  return useMemo(
    () => ({
      can: (permission: Permission) => hasPermission(user, permission),
      canAny: (permissions: Permission[]) => hasAnyPermission(user, permissions),
      canAll: (permissions: Permission[]) => hasAllPermissions(user, permissions),
      hasRole: (roles: UserRoleId[]) => hasRole(user, roles),
      isAdmin: isAdmin(user),
      isCustomer: isCustomer(user),
      canAccessConsole: canAccessConsole(user),
    }),
    [user],
  );
};
