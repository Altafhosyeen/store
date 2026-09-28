import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CenteredModal, StarRating } from "@/components";
import { ROUTES } from "@/constants";
import { useUiStore, useWishlistStore } from "@/store";
import { useProductActions } from "../../hooks/use-product-actions";
import { useGetProduct } from "../../hooks/use-products";
import type { ProductDto } from "../../types/products-api.types";
import { getDefaultVariant } from "../../utils/product-display";
import { PriceLine, ProductBadges, WeightPills } from "./ProductMeta";
import { QuickViewNutrition } from "./QuickViewNutrition";

const MAX_QUANTITY = 20;

const Detail = ({
  term,
  value,
  wide = false,
}: {
  term: string;
  value?: string;
  wide?: boolean;
}) => (
  <div className={wide ? "col-span-2" : ""}>
    <dt className="text-[10.5px] font-semibold uppercase tracking-wider text-cocoa/60">{term}</dt>
    <dd className="m-0 font-medium text-walnut">{value}</dd>
  </div>
);

const QuickViewBody = ({ product, onClose }: { product: ProductDto; onClose: () => void }) => {
  const [variant, setVariant] = useState(() => getDefaultVariant(product));
  const [quantity, setQuantity] = useState(1);
  const inWishlist = useWishlistStore((state) => state.has(product.id));
  const { addToCart, toggleWish } = useProductActions();
  const navigate = useNavigate();
  const inStock = product.variants.some((v) => v.stockQuantity > 0);

  return (
    <div className="grid md:grid-cols-2">
      <div className="relative aspect-square md:aspect-auto md:min-h-[520px]">
        <img
          src={product.images[0]}
          alt={`${product.name}${product.urduName ? ` — ${product.urduName}` : ""}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4 flex flex-col items-start gap-1.5">
          <ProductBadges product={product} />
        </div>
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-golddk">
          {product.subtitle}
        </p>
        <h3 className="mt-1.5 font-display text-2xl font-bold text-walnutdk sm:text-3xl">
          {product.name}
        </h3>
        {product.urduName ? <p className="mt-1 text-cocoa/70">{product.urduName}</p> : null}
        <div className="mt-2.5 flex items-center gap-2 text-[13px]">
          <StarRating rating={product.rating ?? 0} />
          <span className="font-semibold text-walnut">{product.rating}</span>
          <span className="text-cocoa/60">({product.reviewCount} reviews)</span>
          <span
            className={`ml-2 text-[11.5px] font-semibold ${inStock ? "text-leaf" : "text-red-600"}`}
          >
            {inStock ? "● In Stock" : "● Out of Stock"}
          </span>
        </div>
        <p className="mt-4 text-[14.5px] font-light leading-relaxed text-cocoa">
          {product.description}
        </p>

        <div className="mt-4 rounded-xl border border-sand bg-ivory p-4">
          <p className="mb-2.5 font-display text-[15px] font-bold text-walnutdk">
            <i className="fa-solid fa-box-open mr-1.5 text-golddk" />
            What&apos;s Inside?
          </p>
          <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
            <Detail term="Origin" value={product.origin} />
            <Detail term="Texture" value={product.texture} />
            <Detail term="Taste" value={product.taste} />
            <Detail term="Best For" value={product.bestFor} />
            <Detail term="Storage" value="Store in a cool, dry place away from sunlight." wide />
          </dl>
        </div>

        <div className="mt-4">
          <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-wider text-cocoa/70">
            Choose Weight
          </p>
          <WeightPills variants={product.variants} selected={variant} onSelect={setVariant} />
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <PriceLine variant={variant} large />
          </div>
          <div className="flex items-center gap-2.5 rounded-full border border-sand bg-white px-2 py-1.5">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="btn-press h-7 w-7 rounded-full text-walnut hover:bg-sand"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-6 text-center font-semibold">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
              className="btn-press h-7 w-7 rounded-full text-walnut hover:bg-sand"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        <p className="mt-1.5 text-[11.5px] text-cocoa/60">
          Royal Nuts Price — sample retail-style pricing.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              addToCart(product, variant, { quantity });
            }}
            className="btn-dark btn-press rounded-xl bg-walnutdk py-3 text-[14px] font-semibold text-ivory"
          >
            <i className="fa-solid fa-bag-shopping mr-1.5" />
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => {
              addToCart(product, variant, { quantity, silent: true });
              onClose();
              navigate(ROUTES.CHECKOUT);
            }}
            className="btn-gold btn-press rounded-xl py-3 text-[14px] font-semibold text-white"
          >
            <i className="fa-solid fa-bolt mr-1.5" />
            Buy Now
          </button>
        </div>
        <button
          type="button"
          onClick={() => toggleWish(product, variant)}
          className={`btn-press mt-2.5 w-full rounded-xl border py-2.5 text-[13.5px] font-semibold transition-colors ${inWishlist ? "border-red-300 bg-red-50 text-red-700" : "border-sand text-walnut hover:border-gold"}`}
        >
          <i className={`${inWishlist ? "fa-solid" : "fa-regular"} fa-heart mr-1.5`} />
          {inWishlist ? "In Your Wishlist — Remove" : "Add to Wishlist"}
        </button>
      </div>
      <QuickViewNutrition product={product} />
    </div>
  );
};

/** The storefront's product quick view, opened from any card, search result or wishlist row. */
export const QuickViewModal = () => {
  const open = useUiStore((state) => state.overlay === "quickView");
  const productId = useUiStore((state) => state.quickViewProductId);
  const close = useUiStore((state) => state.closeOverlay);
  const { data: product } = useGetProduct(productId ?? "");

  return (
    <CenteredModal
      open={open}
      onClose={close}
      label={product ? `Quick view: ${product.name}` : "Quick view"}
      frameClassName="my-[4vh] max-w-4xl"
    >
      <div className="relative overflow-hidden rounded-3xl bg-cream shadow-lift">
        <button
          type="button"
          onClick={close}
          className="glass absolute right-4 top-4 z-10 h-10 w-10 rounded-full text-walnut transition-colors hover:bg-sand"
          aria-label="Close quick view"
        >
          <i className="fa-solid fa-xmark" />
        </button>
        {product ? (
          // Keyed on open state so pack and quantity reset each time it opens, as in the reference.
          <QuickViewBody key={`${product.id}-${open}`} product={product} onClose={close} />
        ) : (
          <div className="min-h-[520px]" />
        )}
      </div>
    </CenteredModal>
  );
};
