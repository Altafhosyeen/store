import { DeleteOutlined } from "@ant-design/icons";
import { ProductImage } from "@/components";
import { formatCurrency } from "@/lib/currency";
import type { CartLine } from "@/store";
import { brandColors, brandFontFamily } from "@/theme";

interface CartLineItemProps {
  line: CartLine;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const CartLineItem = ({ line, onQuantityChange, onRemove }: CartLineItemProps) => (
  <div className="flex items-center gap-4 border-b py-4" style={{ borderColor: brandColors.sand }}>
    <ProductImage src={line.imageUrl} alt={line.name} className="h-16 w-16 shrink-0 rounded-xl" />
    <div className="min-w-0 flex-1">
      <p
        className="truncate font-semibold"
        style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
      >
        {line.name}
      </p>
      {line.variantLabel ? (
        <p className="text-sm" style={{ color: brandColors.cocoa }}>
          {line.variantLabel}
        </p>
      ) : null}
    </div>

    <div
      className="flex items-center rounded-full border"
      style={{ borderColor: brandColors.sand }}
    >
      <button
        type="button"
        onClick={() => onQuantityChange(Math.max(1, line.quantity - 1))}
        className="px-3 py-1.5 text-base"
        style={{ color: brandColors.walnut }}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        className="min-w-[2ch] text-center text-sm font-medium"
        style={{ color: brandColors.walnutDark }}
      >
        {line.quantity}
      </span>
      <button
        type="button"
        onClick={() => onQuantityChange(line.quantity + 1)}
        className="px-3 py-1.5 text-base"
        style={{ color: brandColors.walnut }}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>

    <span
      className="w-20 shrink-0 text-right font-semibold"
      style={{ color: brandColors.walnutDark }}
    >
      {formatCurrency(line.unitPrice * line.quantity)}
    </span>

    <button
      type="button"
      onClick={onRemove}
      aria-label="Remove item"
      className="shrink-0 rounded-full p-2 transition-colors hover:bg-red-50"
      style={{ color: "#B91C1C" }}
    >
      <DeleteOutlined />
    </button>
  </div>
);
