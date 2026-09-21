import { Button, Result } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/constants";

export const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:px-6">
      <Result
        status="success"
        title="Order placed"
        subTitle={`Order #${orderId} has been received. We'll email you when it ships.`}
        extra={
          <Button type="primary" onClick={() => navigate(ROUTES.SHOP)}>
            Continue shopping
          </Button>
        }
      />
    </div>
  );
};
