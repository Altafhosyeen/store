import { Navigate, Outlet } from "react-router-dom";
import type { UserRoleId } from "@/constants";
import { ROUTES } from "@/constants";
import { usePermissions } from "@/hooks/use-permissions";

interface RoleRouteProps {
  allowedRoles: UserRoleId[];
}

/**
 * Reserved for whole-experience splits, not ordinary feature access — e.g.
 * keeping the Admin console and the customer storefront on separate shells.
 */
export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { hasRole } = usePermissions();

  return hasRole(allowedRoles) ? <Outlet /> : <Navigate to={ROUTES.UNAUTHORIZED} replace />;
};
