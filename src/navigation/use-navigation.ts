import { useMemo } from "react";
import { USER_ROLES } from "@/constants";
import { usePermissions } from "@/hooks/use-permissions";
import { useAuthStore } from "@/store";
import { ADMIN_NAVIGATION } from "./admin-navigation";
import type { NavigationItem } from "./navigation.types";
import { filterNavigation } from "./navigation.utils";

const NAVIGATION_BY_ROLE: Record<number, NavigationItem[]> = {
  [USER_ROLES.ADMIN]: ADMIN_NAVIGATION,
};

/** Role picks the menu; permissions decide which of its items survive. */
export const useNavigation = (): NavigationItem[] => {
  const user = useAuthStore((state) => state.user);
  const { can } = usePermissions();

  return useMemo(() => {
    const items = user ? (NAVIGATION_BY_ROLE[user.roleId] ?? []) : [];
    return filterNavigation(items, can);
  }, [can, user]);
};
