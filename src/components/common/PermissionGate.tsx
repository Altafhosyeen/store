import type { ReactNode } from "react";
import type { Permission } from "@/constants";
import { usePermissions } from "@/hooks/use-permissions";

interface PermissionGateProps {
  permissions: Permission[];
  requireAll?: boolean;
  /** Rendered instead of nothing when the check fails. */
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Hides actions the user cannot perform. This is UX only — the backend still
 * authorizes the request independently.
 */
export const PermissionGate = ({
  permissions,
  requireAll = false,
  fallback = null,
  children,
}: PermissionGateProps) => {
  const { canAny, canAll } = usePermissions();
  const allowed = requireAll ? canAll(permissions) : canAny(permissions);

  return <>{allowed ? children : fallback}</>;
};
