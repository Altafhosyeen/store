import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import { BodyLarge, Caption } from "@/components/common/Text";
import { ProductPrice } from "@/components/storefront/ProductPrice";
import { buildRoute, ROUTES } from "@/constants";
import type { ProductDto } from "../types/products-api.types";

interface ProductCardProps {
  product: ProductDto;
  onAddToCart?: () => void;
}

/** Storefront grid card: image, name, category, price of the cheapest variant. */
export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const cheapest = product.variants.reduce(
    (min, variant) => (variant.price < min.price ? variant : min),
    product.variants[0],
  );

  return (
    <Card
      className="h-full"
      cover={
        product.images[0] ? (
          <Link to={buildRoute(ROUTES.PRODUCT_DETAIL, { productId: product.id })}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </Link>
        ) : undefined
      }
    >
      <Link to={buildRoute(ROUTES.PRODUCT_DETAIL, { productId: product.id })}>
        <BodyLarge block strong className="mb-1">
          {product.name}
        </BodyLarge>
      </Link>
      <Caption type="secondary" block className="mb-3">
        {product.categoryName}
      </Caption>

      {cheapest ? (
        <div className="mb-3">
          <ProductPrice price={cheapest.price} compareAtPrice={cheapest.compareAtPrice} />
        </div>
      ) : null}

      <Button
        type="primary"
        block
        onClick={onAddToCart}
        disabled={!cheapest || cheapest.stockQuantity === 0}
      >
        {cheapest && cheapest.stockQuantity === 0 ? "Out of stock" : "Add to cart"}
      </Button>
    </Card>
  );
};
