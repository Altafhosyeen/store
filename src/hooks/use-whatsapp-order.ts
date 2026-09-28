import { buildWhatsAppUrl } from "@/constants";
import { buildCartWhatsAppMessage } from "@/lib/cart-totals";
import { useCartStore, useUiStore } from "@/store";

/** Opens WhatsApp with the current cart as a pre-filled order enquiry. */
export const useWhatsAppOrder = () => {
  const lines = useCartStore((state) => state.lines);
  const showToast = useUiStore((state) => state.showToast);

  return () => {
    if (lines.length === 0) {
      showToast("Your cart is empty — add products before ordering on WhatsApp.", "circle-info");
      return;
    }
    window.open(buildWhatsAppUrl(buildCartWhatsAppMessage(lines)), "_blank", "noopener");
  };
};
