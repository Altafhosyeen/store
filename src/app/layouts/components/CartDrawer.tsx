import { useNavigate } from "react-router-dom";
import { SideDrawer } from "@/components";
import { ROUTES } from "@/constants";
import { useWhatsAppOrder } from "@/hooks";
import { getCartTotals } from "@/lib/cart-totals";
import { formatCurrency } from "@/lib/currency";
import { useCartStore, useUiStore } from "@/store";

const QTY_BUTTON = "h-6 w-6 rounded-full text-[12px] text-walnut hover:bg-sand btn-press";

/**
 * Slide-in cart. Totals here are a display estimate — the checkout page
 * re-prices against the backend before any order is placed.
 */
export const CartDrawer = () => {
  const open = useUiStore((state) => state.overlay === "cart");
  const close = useUiStore((state) => state.closeOverlay);
  const lines = useCartStore((state) => state.lines);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeLine = useCartStore((state) => state.removeLine);
  const orderOnWhatsApp = useWhatsAppOrder();
  const navigate = useNavigate();
  const totals = getCartTotals(lines);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <SideDrawer
      open={open}
      onClose={close}
      side="right"
      label="Shopping cart"
      widthClassName="w-[400px] max-w-[94vw]"
    >
      <div className="flex items-center justify-between border-b border-sand bg-white/60 px-5 py-4">
        <p className="font-display text-xl font-bold text-walnutdk">
          <i className="fa-solid fa-bag-shopping mr-2 text-golddk" />
          Your Cart{" "}
          {itemCount > 0 ? (
            <span className="font-body text-sm font-medium text-cocoa/70">({itemCount} items)</span>
          ) : null}
        </p>
        <button
          type="button"
          onClick={close}
          className="h-9 w-9 rounded-full text-walnut hover:bg-sand/60"
          aria-label="Close cart"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {lines.length === 0 ? (
          <div className="py-16 text-center">
            <i className="fa-solid fa-bag-shopping text-4xl text-sand" />
            <p className="mt-4 font-display text-xl font-bold text-walnutdk">Your cart is empty</p>
            <p className="mt-1.5 text-sm font-light text-cocoa/70">
              Add some royal treats to get started.
            </p>
            <button
              type="button"
              onClick={close}
              className="btn-gold btn-press mt-5 rounded-full px-6 py-2.5 text-sm font-semibold text-white"
            >
              Browse Products
            </button>
          </div>
        ) : (
          lines.map((line) => (
            <div
              key={`${line.productId}|${line.variantLabel ?? ""}`}
              className="flex gap-3 rounded-xl border border-sand bg-white p-3 shadow-card"
            >
              <img
                src={line.imageUrl}
                alt={line.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold leading-snug text-walnutdk">{line.name}</p>
                <p className="mt-0.5 text-[12px] text-cocoa/70">
                  {line.variantLabel} · {formatCurrency(line.unitPrice)} each
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 rounded-full border border-sand bg-cream px-2 py-1">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(line.productId, line.quantity - 1, line.variantLabel)
                      }
                      className={QTY_BUTTON}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-[13px] font-semibold">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(line.productId, line.quantity + 1, line.variantLabel)
                      }
                      className={QTY_BUTTON}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-[14.5px] font-bold text-walnutdk">
                      {formatCurrency(line.unitPrice * line.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLine(line.productId, line.variantLabel)}
                      className="text-cocoa/50 transition-colors hover:text-red-600"
                      aria-label={`Remove ${line.name} from cart`}
                    >
                      <i className="fa-regular fa-trash-can text-[13px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-sand bg-white/70 p-5">
        <div className="space-y-1.5 text-[14px] text-walnut">
          <div className="flex justify-between">
            <span className="text-cocoa/80">Subtotal</span>
            <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cocoa/80">Discount</span>
            <span className="font-medium text-leaf">— Rs. 0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cocoa/80">Delivery</span>
            <span className="font-medium">
              {lines.length > 0 && totals.delivery === 0 ? "FREE" : formatCurrency(totals.delivery)}
            </span>
          </div>
          {lines.length > 0 ? (
            <div className="text-[12px] text-golddk">
              {totals.remainingForFreeDelivery > 0 ? (
                <>
                  <i className="fa-solid fa-truck-fast mr-1" />
                  Add {formatCurrency(totals.remainingForFreeDelivery)} more for FREE delivery
                </>
              ) : (
                <>
                  <i className="fa-solid fa-circle-check mr-1" />
                  You&apos;ve unlocked FREE delivery!
                </>
              )}
            </div>
          ) : null}
          <div className="mt-2 flex justify-between border-t border-sand pt-2 text-lg font-bold text-walnutdk">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            close();
            navigate(ROUTES.CHECKOUT);
          }}
          disabled={lines.length === 0}
          className="btn-gold btn-press mt-4 w-full rounded-xl py-3.5 text-[15px] font-semibold text-white disabled:opacity-60"
        >
          Proceed to Checkout <i className="fa-solid fa-arrow-right ml-2 text-[13px]" />
        </button>
        <button
          type="button"
          onClick={orderOnWhatsApp}
          className="btn-press mt-2.5 w-full rounded-xl bg-whatsapp py-3 text-[14px] font-semibold text-white transition-all hover:brightness-110"
        >
          <i className="fa-brands fa-whatsapp mr-2" />
          Order via WhatsApp
        </button>
      </div>
    </SideDrawer>
  );
};
