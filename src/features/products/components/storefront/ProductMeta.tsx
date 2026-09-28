import { formatCurrency } from "@/lib/currency";
import type { ProductDto, ProductVariantDto } from "../../types/products-api.types";

const BADGE = "rounded-full px-2.5 py-1 text-[10.5px] font-semibold";

/** Up to two corner badges, in the reference's priority order: sale, best seller, badge, new. */
export const ProductBadges = ({ product }: { product: ProductDto }) => {
  const badges: JSX.Element[] = [];
  if (product.salePercent) {
    badges.push(
      <span key="sale" className={`${BADGE} bg-red-700/90 text-white`}>
        -{product.salePercent}%
      </span>,
    );
  }
  if (product.isBestSeller) {
    badges.push(
      <span key="best" className={`${BADGE} bg-walnutdk/90 text-gold`}>
        <i className="fa-solid fa-fire mr-1" />
        Best Seller
      </span>,
    );
  }
  if (product.badge && product.badge !== "Best Seller") {
    const icon =
      product.badge === "Royal Pick" ? "crown" : product.badge === "Fresh Batch" ? "leaf" : null;
    badges.push(
      <span key="badge" className={`${BADGE} bg-gold/95 text-charcoal`}>
        {icon ? <i className={`fa-solid fa-${icon} mr-1`} /> : null}
        {product.badge}
      </span>,
    );
  }
  if (product.isNew) {
    badges.push(
      <span key="new" className={`${BADGE} bg-leaf/95 text-white`}>
        New
      </span>,
    );
  }
  return <>{badges.slice(0, 2)}</>;
};

interface WeightPillsProps {
  variants: ProductVariantDto[];
  selected?: ProductVariantDto;
  onSelect: (variant: ProductVariantDto) => void;
}

/** Pack-size selector — the active pill is filled walnut. */
export const WeightPills = ({ variants, selected, onSelect }: WeightPillsProps) => (
  <div className="flex flex-wrap gap-1.5">
    {variants.map((variant) => (
      <button
        key={variant.id}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onSelect(variant);
        }}
        className={`weight-pill btn-press rounded-full border border-sand px-2.5 py-1 text-[11.5px] text-cocoa transition-colors ${variant.id === selected?.id ? "active" : ""}`}
        aria-pressed={variant.id === selected?.id}
      >
        {variant.label}
      </button>
    ))}
  </div>
);

interface PriceLineProps {
  variant?: ProductVariantDto;
  large?: boolean;
}

/** "Rs. 1,050 / 250g" plus the struck-through compare-at price when the pack is on sale. */
export const PriceLine = ({ variant, large = false }: PriceLineProps) => {
  if (!variant) return null;
  return (
    <>
      <span
        className={`font-display font-bold text-walnutdk ${large ? "text-2xl" : "text-[17px]"}`}
      >
        {formatCurrency(variant.price)}
      </span>{" "}
      <span className="text-[12px] text-cocoa/70">/ {variant.label}</span>
      {variant.compareAtPrice ? (
        <>
          {" "}
          <span className="ml-1 text-[12.5px] text-cocoa/50 line-through">
            {formatCurrency(variant.compareAtPrice)}
          </span>
        </>
      ) : null}
    </>
  );
};
