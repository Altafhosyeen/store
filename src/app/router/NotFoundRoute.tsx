import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";
import { getLandingRoute } from "@/permissions";
import { useAuthStore } from "@/store";

export const NotFoundRoute = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <Result
      status="404"
      title="404"
      subTitle="This page does not exist."
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
