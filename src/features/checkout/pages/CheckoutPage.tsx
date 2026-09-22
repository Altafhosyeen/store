import { App, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SectionHeading } from "@/components";
import { buildRoute, CURRENCY, ROUTES } from "@/constants";
import { useCartStore } from "@/store";
import { brandColors, brandFontFamily } from "@/theme";
import { PAYMENT_METHOD } from "../constants/checkout.constants";
import { usePlaceOrder } from "../hooks/use-checkout";
import { type AddressFormValues, addressSchema } from "../schemas/address.schema";

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
      <div className="py-16 text-center" style={{ background: brandColors.cream }}>
        <SectionHeading kicker="Checkout" title="Your cart is empty" />
        <button
          type="button"
          onClick={() => navigate(ROUTES.SHOP)}
          className="mt-8 rounded-full px-8 py-3 font-semibold text-white"
          style={{ background: brandColors.walnutDark }}
        >
          Browse the Shop
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16" style={{ background: brandColors.cream }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading kicker="Almost There" title="Checkout" align="left" />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div
            className="rounded-2xl border p-6 md:col-span-2"
            style={{
              background: "white",
              borderColor: brandColors.sand,
              boxShadow: "0 6px 24px -8px rgba(51,34,15,.15)",
            }}
          >
            <h2
              className="mb-4 text-lg font-bold"
              style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
            >
              Shipping Address
            </h2>
            <Form<AddressFormValues> form={form} layout="vertical" onFinish={handleFinish}>
              <Form.Item name="fullName" label="Full name" rules={[{ required: true }]}>
                <Input size="large" placeholder="e.g. Ahmed Raza" />
              </Form.Item>
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input size="large" placeholder="03XX-XXXXXXX" />
              </Form.Item>
              <Form.Item name="line1" label="Address" rules={[{ required: true }]}>
                <Input size="large" placeholder="House, street, area…" />
              </Form.Item>
              <Form.Item name="line2" label="Apartment, suite, etc.">
                <Input size="large" />
              </Form.Item>
              <div className="grid gap-x-4 md:grid-cols-2">
                <Form.Item name="city" label="City" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
                <Form.Item name="postalCode" label="Postal code" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </div>

              <h2
                className="mb-3 mt-2 text-lg font-bold"
                style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
              >
                Payment
              </h2>
              <div
                className="mb-6 flex items-center gap-3 rounded-xl border px-4 py-3"
                style={{ borderColor: brandColors.gold, background: "rgba(201,162,75,.08)" }}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: brandColors.gold }}
                  aria-hidden="true"
                />
                <span
                  className="text-[14.5px] font-medium"
                  style={{ color: brandColors.walnutDark }}
                >
                  Cash on Delivery
                </span>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={placeOrder.isPending}
              >
                Place Order
              </Button>
            </Form>
          </div>

          <div
            className="h-fit rounded-2xl border p-6"
            style={{
              background: "white",
              borderColor: brandColors.sand,
              boxShadow: "0 6px 24px -8px rgba(51,34,15,.15)",
            }}
          >
            <h2
              className="mb-4 text-lg font-bold"
              style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
            >
              Order Summary
            </h2>
            {lines.map((line) => (
              <div
                key={`${line.productId}-${line.variantLabel ?? ""}`}
                className="mb-2.5 flex justify-between text-[13.5px]"
              >
                <span style={{ color: brandColors.cocoa }}>
                  {line.name} × {line.quantity}
                </span>
                <span style={{ color: brandColors.walnutDark }}>
                  {CURRENCY.SYMBOL}
                  {(line.unitPrice * line.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div
              className="mt-4 flex justify-between border-t pt-4 text-lg font-bold"
              style={{ borderColor: brandColors.sand, color: brandColors.walnutDark }}
            >
              <span>Total</span>
              <span>
                {CURRENCY.SYMBOL}
                {subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
