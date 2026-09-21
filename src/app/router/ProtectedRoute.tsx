import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants";
import { hasSession } from "@/services/api";
import { useAuthStore } from "@/store";

/** Authentication only. Capability checks belong to PermissionRoute. */
export const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user || !hasSession()) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};
