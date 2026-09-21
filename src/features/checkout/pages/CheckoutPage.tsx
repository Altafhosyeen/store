import { App, Button, Card, Form, Input, Radio, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components";
import { buildRoute, CURRENCY, ROUTES } from "@/constants";
import { useCartStore } from "@/store";
import { PAYMENT_METHOD } from "../constants/checkout.constants";
import { usePlaceOrder } from "../hooks/use-checkout";
import { type AddressFormValues, addressSchema } from "../schemas/address.schema";

const { Text, Title } = Typography;

/**
 * Address + review + place order. Payment is stubbed to cash-on-delivery
 * (see checkout.constants.ts) — swap placeOrder's call for a real gateway
 * once one is chosen.
 */
export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm<AddressFormValues>();

  const lines = useCartStore((state) => state.lines);
  const clearCart = useCartStore((state) => state.clear);
  const placeOrder = usePlaceOrder();

  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

  const handleFinish = (values: AddressFormValues) => {
    const parsed = addressSchema.safeParse(values);
    if (!parsed.success) {
      message.error(parsed.error.issues[0]?.message ?? "Please correct the highlighted fields");
      return;
    }

    placeOrder.mutate(
      {
        address: parsed.data,
        paymentMethod: PAYMENT_METHOD.CASH_ON_DELIVERY,
        lines: lines.map((line) => ({
          productId: line.productId,
          variantLabel: line.variantLabel,
          quantity: line.quantity,
          unitPrice: line.unitPrice,
        })),
      },
      {
        onSuccess: (result) => {
          clearCart();
          navigate(buildRoute(ROUTES.ORDER_CONFIRMATION, { orderId: result.orderId }));
        },
        onError: (error) => message.error(error.message),
      },
    );
  };

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
        <PageHeader title="Checkout" description="Your cart is empty." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
      <PageHeader title="Checkout" />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <Title level={5}>Shipping address</Title>
          <Form<AddressFormValues> form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item name="fullName" label="Full name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="line1" label="Address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="line2" label="Apartment, suite, etc.">
              <Input />
            </Form.Item>
            <div className="grid gap-x-4 md:grid-cols-2">
              <Form.Item name="city" label="City" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="postalCode" label="Postal code" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </div>

            <Title level={5}>Payment</Title>
            <Radio.Group value={PAYMENT_METHOD.CASH_ON_DELIVERY} className="mb-4">
              <Radio value={PAYMENT_METHOD.CASH_ON_DELIVERY}>Cash on delivery</Radio>
            </Radio.Group>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={placeOrder.isPending}
            >
              Place order
            </Button>
          </Form>
        </Card>

        <Card>
          <Title level={5}>Order summary</Title>
          {lines.map((line) => (
            <div
              key={`${line.productId}-${line.variantLabel ?? ""}`}
              className="mb-2 flex justify-between"
            >
              <Text type="secondary">
                {line.name} × {line.quantity}
              </Text>
              <Text>
                {CURRENCY.SYMBOL}
                {(line.unitPrice * line.quantity).toFixed(2)}
              </Text>
            </div>
          ))}
          <div className="mt-4 flex justify-between border-hairline-light border-t pt-4">
            <Text strong>Total</Text>
            <Text strong>
              {CURRENCY.SYMBOL}
              {subtotal.toFixed(2)}
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};
