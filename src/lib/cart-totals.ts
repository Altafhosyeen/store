import { DELIVERY } from "@/constants";
import { formatCurrency } from "@/lib/currency";
import type { CartLine } from "@/store";

export interface CartTotals {
  subtotal: number;
  delivery: number;
  total: number;
  /** How much more unlocks free delivery; 0 once it's unlocked. */
  remainingForFreeDelivery: number;
}

/**
 * Display-only estimate for the cart drawer and WhatsApp enquiry. Checkout
 * re-prices against the backend before an order is placed (CLAUDE.md rule 7).
 */
export const getCartTotals = (lines: CartLine[]): CartTotals => {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const qualifies = subtotal >= DELIVERY.FREE_THRESHOLD;
  const delivery = lines.length === 0 || qualifies ? 0 : DELIVERY.FLAT_FEE;
  return {
    subtotal,
    delivery,
    total: subtotal + delivery,
    remainingForFreeDelivery: qualifies ? 0 : DELIVERY.FREE_THRESHOLD - subtotal,
  };
};

const DIVIDER = "━━━━━━━━━━━━━━━━━━";

/** The pre-checkout "order via WhatsApp" enquiry, formatted like the store owner expects. */
export const buildCartWhatsAppMessage = (lines: CartLine[]): string => {
  const totals = getCartTotals(lines);
  const items = lines
    .map((line, index) => {
      const lineTotal = line.unitPrice * line.quantity;
      const each = line.quantity > 1 ? `   Price: ${formatCurrency(line.unitPrice)} each\n` : "";
      return `${index + 1}. ${line.name}\n   Weight: ${line.variantLabel ?? "—"}\n   Qty: ${line.quantity}\n${each}   Subtotal: ${formatCurrency(lineTotal)}\n`;
    })
    .join("\n");

  return [
    "👑 *ROYAL NUTS — NEW ORDER*\n",
    `${DIVIDER}\n🛒 ORDER ITEMS\n${DIVIDER}\n`,
    items,
    `${DIVIDER}\n💰 ORDER SUMMARY\n${DIVIDER}\n`,
    `Subtotal: ${formatCurrency(totals.subtotal)}`,
    "Discount: Rs. 0",
    `Delivery: ${totals.delivery === 0 ? "Free" : formatCurrency(totals.delivery)}`,
    `*TOTAL: ${formatCurrency(totals.total)}*\n`,
    "Please confirm availability and delivery time.\n",
    "Thank you for choosing\nROYAL NUTS 👑\n\nNature's Finest. Pakistan's Favorite.",
  ].join("\n");
};
