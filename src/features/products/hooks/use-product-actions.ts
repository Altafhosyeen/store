import { useCartStore, useUiStore, useWishlistStore } from "@/store";
import type { ProductDto, ProductVariantDto } from "../types/products-api.types";

interface AddOptions {
  quantity?: number;
  /** Skip the toast + cart drawer, e.g. "Buy Now" goes straight to checkout. */
  silent?: boolean;
}

/** Storefront card/quick-view actions: add a chosen pack to the cart, toggle the wishlist heart. */
export const useProductActions = () => {
  const addLine = useCartStore((state) => state.addLine);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const showToast = useUiStore((state) => state.showToast);
  const openOverlay = useUiStore((state) => state.openOverlay);

  const addToCart = (
    product: ProductDto,
    variant: ProductVariantDto | undefined,
    { quantity = 1, silent = false }: AddOptions = {},
  ) => {
    if (!variant) return;
    addLine({
      productId: product.id,
      name: product.name,
      imageUrl: product.images[0],
      unitPrice: variant.price,
      quantity,
      variantLabel: variant.label,
    });
    if (silent) return;
    showToast(`${product.name} (${variant.label}) added to cart`);
    openOverlay("cart");
  };

  const toggleWish = (product: ProductDto, variant: ProductVariantDto | undefined) => {
    const saved = toggleWishlist({
      productId: product.id,
      name: product.name,
      imageUrl: product.images[0],
      subtitle: product.subtitle,
      price: variant?.price ?? 0,
      variantLabel: variant?.label,
    });
    if (saved) showToast("Added to wishlist ❤");
    else showToast("Removed from wishlist", "heart-crack");
  };

  return { addToCart, toggleWish };
};
