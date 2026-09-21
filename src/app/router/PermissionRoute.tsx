import { Navigate, Outlet } from "react-router-dom";
import type { Permission } from "@/constants";
import { ROUTES } from "@/constants";
import { usePermissions } from "@/hooks/use-permissions";

interface PermissionRouteProps {
  /** The user needs at least one of these. */
  permissions: Permission[];
  /** Require all of them instead. */
  requireAll?: boolean;
}

/** Capability authorization for a route subtree. */
export const PermissionRoute = ({ permissions, requireAll = false }: PermissionRouteProps) => {
  const { canAny, canAll } = usePermissions();

  const allowed = requireAll ? canAll(permissions) : canAny(permissions);

  return allowed ? <Outlet /> : <Navigate to={ROUTES.UNAUTHORIZED} replace />;
};
