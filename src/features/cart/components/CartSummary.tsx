import { useNavigate } from "react-router-dom";
import { CURRENCY, ROUTES } from "@/constants";
import { brandColors, brandFontFamily } from "@/theme";

interface CartSummaryProps {
  subtotal: number;
}

export const CartSummary = ({ subtotal }: CartSummaryProps) => {
  const navigate = useNavigate();
  const freeDeliveryThreshold = 3000;
  const qualifiesForFreeDelivery = subtotal >= freeDeliveryThreshold;

  return (
    <div
      className="h-fit rounded-2xl border p-6"
      style={{
        background: "white",
        borderColor: brandColors.sand,
        boxShadow: "0 6px 24px -8px rgba(51,34,15,.15)",
      }}
    >
      <h2
        className="text-lg font-bold"
        style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
      >
        Order Summary
      </h2>

      <div className="mt-4 flex justify-between text-[14.5px]" style={{ color: brandColors.cocoa }}>
        <span>Subtotal</span>
        <span className="font-semibold" style={{ color: brandColors.walnutDark }}>
          {CURRENCY.SYMBOL}
          {subtotal.toFixed(2)}
        </span>
      </div>

      {!qualifiesForFreeDelivery && subtotal > 0 ? (
        <p className="mt-2 text-[12px]" style={{ color: brandColors.goldDark }}>
          Add {CURRENCY.SYMBOL}
          {(freeDeliveryThreshold - subtotal).toFixed(2)} more for free delivery
        </p>
      ) : null}

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

      <button
        type="button"
        disabled={subtotal === 0}
        onClick={() => navigate(ROUTES.CHECKOUT)}
        className="mt-5 w-full rounded-full py-3 text-[15px] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        style={{ background: brandColors.walnutDark }}
      >
        Checkout
      </button>
    </div>
  );
};
