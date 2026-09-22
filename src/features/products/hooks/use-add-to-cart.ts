import { useCartStore } from "@/store";
import type { ProductDto } from "../types/products-api.types";

/** Adds a product's cheapest variant to the cart at quantity 1 — the grid/card add-to-cart action. */
export const useAddToCart = () => {
  const addLine = useCartStore((state) => state.addLine);

  return (product: ProductDto) => {
    const cheapest = product.variants.reduce(
      (min, variant) => (variant.price < min.price ? variant : min),
      product.variants[0],
    );
    if (!cheapest) return;

    addLine({
      productId: product.id,
      name: product.name,
      imageUrl: product.images[0],
      unitPrice: cheapest.price,
      quantity: 1,
      variantLabel: cheapest.label,
    });
  };
};
