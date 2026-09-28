import { useState } from "react";
import { StarRating } from "@/components";
import { useUiStore, useWishlistStore } from "@/store";
import { useProductActions } from "../hooks/use-product-actions";
import type { ProductDto } from "../types/products-api.types";
import { getDefaultVariant } from "../utils/product-display";
import { PriceLine, ProductBadges, WeightPills } from "./storefront/ProductMeta";

interface ProductCardProps {
  product: ProductDto;
  /** Grid position — staggers the scroll-reveal across each row of three. */
  index?: number;
}

const REVEAL_DELAYS = ["", "reveal-d1", "reveal-d2"];

/** The storefront product tile: photo with badges + wishlist heart + quick view, pack pills, add to cart. */
export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [variant, setVariant] = useState(() => getDefaultVariant(product));
  const inWishlist = useWishlistStore((state) => state.has(product.id));
  const openQuickView = useUiStore((state) => state.openQuickView);
  const { addToCart, toggleWish } = useProductActions();
  const quickView = () => openQuickView(product.id);

  return (
    <article
      className={`p-card reveal group flex flex-col overflow-hidden rounded-2xl border border-sand bg-white shadow-card ${REVEAL_DELAYS[index % 3]}`}
    >
      <div className="p-img relative aspect-square cursor-pointer overflow-hidden">
        <button
          type="button"
          onClick={quickView}
          className="block h-full w-full"
          aria-label={`Quick view ${product.name}`}
        >
          <img
            src={product.images[0]}
            alt={`${product.name}${product.urduName ? ` — ${product.urduName}` : ""} premium Pakistani dry fruit`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </button>
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
          <ProductBadges product={product} />
        </div>
        <button
          type="button"
          onClick={() => toggleWish(product, variant)}
          className={`glass btn-press absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full shadow-card transition-colors ${inWishlist ? "text-red-600" : "text-walnut hover:text-red-600"}`}
          aria-label={`Add ${product.name} to wishlist`}
          aria-pressed={inWishlist}
        >
          <i className={`${inWishlist ? "fa-solid" : "fa-regular"} fa-heart`} />
        </button>
        <div className="p-actions absolute inset-x-2.5 bottom-2.5">
          <button
            type="button"
            onClick={quickView}
            className="glass btn-press w-full rounded-full py-2 text-[13px] font-semibold text-walnutdk shadow-card transition-colors hover:bg-cream"
          >
            <i className="fa-regular fa-eye mr-1.5" />
            Quick View
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {product.subtitle ? (
          <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-golddk">
            {product.subtitle}
          </p>
        ) : null}
        <h3 className="mt-1 text-[15.5px] font-bold leading-snug text-walnutdk sm:text-[17px]">
          <button
            type="button"
            onClick={quickView}
            className="block text-left font-display transition-colors hover:text-golddk"
          >
            {product.name}
          </button>
        </h3>
        {product.urduName ? (
          <p className="mt-0.5 text-[12.5px] text-cocoa/70">{product.urduName}</p>
        ) : null}
        {product.rating ? (
          <div className="mt-1.5 flex items-center gap-1.5 text-[11.5px]">
            <StarRating rating={product.rating} />
            <span className="font-medium text-cocoa/80">{product.rating}</span>
            <span className="text-cocoa/50">({product.reviewCount})</span>
          </div>
        ) : null}
        <div className="mt-2.5">
          <PriceLine variant={variant} />
        </div>
        <div className="mt-2.5">
          <WeightPills variants={product.variants} selected={variant} onSelect={setVariant} />
        </div>
        <button
          type="button"
          onClick={() => addToCart(product, variant)}
          disabled={!variant || variant.stockQuantity === 0}
          className="btn-dark btn-press mt-3.5 w-full rounded-xl bg-walnutdk py-2.5 text-[13.5px] font-semibold text-ivory disabled:opacity-60"
        >
          <i className="fa-solid fa-bag-shopping mr-1.5" />
          {variant && variant.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
};
