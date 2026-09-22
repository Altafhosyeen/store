import { ShoppingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ProductImage, ProductPrice } from "@/components";
import { buildRoute, ROUTES } from "@/constants";
import { brandColors, brandFontFamily } from "@/theme";
import type { ProductDto } from "../types/products-api.types";

interface ProductCardProps {
  product: ProductDto;
  onAddToCart?: () => void;
}

/** Storefront grid card matching the brand's warm p-card style: image, category label, name, price, add-to-cart. */
export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const cheapest = product.variants.reduce(
    (min, variant) => (variant.price < min.price ? variant : min),
    product.variants[0],
  );
  const outOfStock = !cheapest || cheapest.stockQuantity === 0;
  const detailHref = buildRoute(ROUTES.PRODUCT_DETAIL, { productId: product.id });

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-transform duration-300 hover:-translate-y-1.5"
      style={{ borderColor: brandColors.sand, boxShadow: "0 6px 24px -8px rgba(51,34,15,.15)" }}
    >
      <Link to={detailHref} className="block aspect-square overflow-hidden">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p
          className="text-[11px] font-semibold uppercase tracking-[.14em]"
          style={{ color: brandColors.goldDark }}
        >
          {product.categoryName}
        </p>
        <Link to={detailHref}>
          <h3
            className="mt-1 text-[15.5px] font-bold leading-snug transition-colors hover:opacity-80 sm:text-[17px]"
            style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
          >
            {product.name}
          </h3>
        </Link>

        {cheapest ? (
          <div className="mt-2.5">
            <ProductPrice price={cheapest.price} compareAtPrice={cheapest.compareAtPrice} />
          </div>
        ) : null}

        <button
          type="button"
          onClick={onAddToCart}
          disabled={outOfStock}
          className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13.5px] font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          style={{ background: brandColors.walnutDark, color: brandColors.ivory }}
        >
          <ShoppingOutlined />
          {outOfStock ? "Out of stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
};
