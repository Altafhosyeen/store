import { ShopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SectionHeading } from "@/components";
import { ROUTES } from "@/constants";
import { useCartStore } from "@/store";
import { brandColors } from "@/theme";
import { CartLineItem } from "../components/CartLineItem";
import { CartSummary } from "../components/CartSummary";

export const CartPage = () => {
  const navigate = useNavigate();
  const lines = useCartStore((state) => state.lines);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeLine = useCartStore((state) => state.removeLine);

  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

  return (
    <div className="py-12 sm:py-16" style={{ background: brandColors.cream }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading kicker="Review" title="Your Cart" align="left" />

        {lines.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4 py-10 text-center">
            <ShopOutlined style={{ fontSize: 40, color: brandColors.goldDark }} />
            <p className="text-lg font-semibold" style={{ color: brandColors.walnutDark }}>
              Your cart is empty
            </p>
            <p style={{ color: brandColors.cocoa }}>
              Browse the shop to add some premium dry fruits.
            </p>
            <button
              type="button"
              onClick={() => navigate(ROUTES.SHOP)}
              className="mt-2 rounded-full px-8 py-3 font-semibold text-white"
              style={{ background: brandColors.walnutDark }}
            >
              Browse the Shop
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
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
    </div>
  );
};
