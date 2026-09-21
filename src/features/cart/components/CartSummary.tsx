import { Button, Card, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { CURRENCY, ROUTES } from "@/constants";

const { Text, Title } = Typography;

interface CartSummaryProps {
  subtotal: number;
}

export const CartSummary = ({ subtotal }: CartSummaryProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <Title level={5}>Order summary</Title>
      <Flex justify="space-between" className="mb-4">
        <Text type="secondary">Subtotal</Text>
        <Text strong>
          {CURRENCY.SYMBOL}
          {subtotal.toFixed(2)}
        </Text>
      </Flex>
      <Button
        type="primary"
        block
        size="large"
        disabled={subtotal === 0}
        onClick={() => navigate(ROUTES.CHECKOUT)}
      >
        Checkout
      </Button>
    </Card>
  );
};
