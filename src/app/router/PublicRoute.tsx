import { Navigate, Outlet } from "react-router-dom";
import { getLandingRoute } from "@/permissions";
import { useAuthStore } from "@/store";

/** Auth screens. A signed-in user is sent to their own landing page instead. */
export const PublicRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to={getLandingRoute(user)} replace />;
  }

  return <Outlet />;
};
