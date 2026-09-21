import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { EmptyState, PageHeader } from "@/components";
import { ROUTES } from "@/constants";
import { useCartStore } from "@/store";
import { CartLineItem } from "../components/CartLineItem";
import { CartSummary } from "../components/CartSummary";

export const CartPage = () => {
  const navigate = useNavigate();
  const lines = useCartStore((state) => state.lines);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeLine = useCartStore((state) => state.removeLine);

  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
      <PageHeader title="Your cart" />

      {lines.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Browse the shop to add some freshly roasted nuts."
          action={
            <Button type="primary" onClick={() => navigate(ROUTES.SHOP)}>
              Browse the shop
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            {lines.map((line) => (
              <CartLineItem
                key={`${line.productId}-${line.variantLabel ?? ""}`}
                line={line}
                onQuantityChange={(quantity) =>
                  setQuantity(line.productId, quantity, line.variantLabel)
                }
                onRemove={() => removeLine(line.productId, line.variantLabel)}
              />
            ))}
          </div>
          <CartSummary subtotal={subtotal} />
        </div>
      )}
    </div>
  );
};
