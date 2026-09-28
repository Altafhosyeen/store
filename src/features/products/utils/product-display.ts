import type { ProductDto, ProductVariantDto } from "../types/products-api.types";

/** The pack a storefront card shows first: 250g when the product has it, otherwise its first pack. */
export const getDefaultVariant = (product: ProductDto): ProductVariantDto | undefined =>
  product.variants.find((variant) => variant.label === "250g") ?? product.variants[0];

/** Price of the default pack — what the storefront's price filter and price sorts compare. */
export const getDisplayPrice = (product: ProductDto): number =>
  getDefaultVariant(product)?.price ?? 0;

/** The reference storefront's "Popular" ranking: review volume weighted by rating. */
export const getPopularityScore = (product: ProductDto): number =>
  (product.reviewCount ?? 0) * (product.rating ?? 0);

/**
 * Storefront search: every whitespace-separated term must appear somewhere in
 * the product's name, Urdu name, subtitle, keywords or category.
 */
export const matchesSearch = (product: ProductDto, query: string): boolean => {
  const haystack = [
    product.name,
    product.urduName,
    product.subtitle,
    product.keywords,
    product.categoryName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .every((term) => haystack.includes(term));
};
