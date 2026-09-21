import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";
import { getLandingRoute } from "@/permissions";
import { useAuthStore } from "@/store";

/** Shown when a guard rejects a route the user reached by URL. */
export const UnauthorizedRoute = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <Result
      status="403"
      title="403"
      subTitle="You do not have permission to view this page."
      extra={
        <Button
          type="primary"
          onClick={() => navigate(user ? getLandingRoute(user) : ROUTES.LOGIN)}
        >
          Go back
        </Button>
      }
    />
  );
};
