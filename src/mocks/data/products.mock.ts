import type { ProductDto, ProductVariantDto } from "@/features/products";
import { PRODUCT_STATUS } from "@/features/products";
import { MOCK_CATEGORIES } from "./categories.mock";
import { CATALOG } from "./products-catalog.mock";

const makeVariant = (overrides: Partial<ProductVariantDto> = {}): ProductVariantDto => ({
  id: "var-1",
  label: "250g",
  size: 250,
  unit: "g",
  price: 700,
  stockQuantity: 40,
  ...overrides,
});

export const makeProduct = (overrides: Partial<ProductDto> = {}): ProductDto => {
  const category = MOCK_CATEGORIES[0];
  const now = new Date().toISOString();
  return {
    id: "prod-1",
    name: "Roasted Cashews",
    slug: "roasted-cashews",
    description: "Premium roasted cashews, lightly salted.",
    categoryId: category.id,
    categoryName: category.name,
    status: PRODUCT_STATUS.PUBLISHED,
    images: ["https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600"],
    variants: [
      makeVariant({ id: "var-1", label: "250g", size: 250, price: 700, stockQuantity: 40 }),
      makeVariant({
        id: "var-2",
        label: "500g",
        size: 500,
        price: 1250,
        compareAtPrice: 1500,
        stockQuantity: 25,
      }),
    ],
    tags: ["roasted", "salted"],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
};

const findCategory = (slug: string) => {
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);
  if (!category) throw new Error(`Unknown mock category slug: ${slug}`);
  return category;
};

/** Builds the two-variant (250g/500g) price ladder most SKUs in this catalog use. */
const twoSizeVariants = (
  idPrefix: string,
  smallPrice: number,
  largePrice: number,
  options: { smallStock?: number; largeStock?: number; compareAtLarge?: number } = {},
): ProductVariantDto[] => [
  makeVariant({
    id: `${idPrefix}-250g`,
    label: "250g",
    size: 250,
    price: smallPrice,
    stockQuantity: options.smallStock ?? 40,
  }),
  makeVariant({
    id: `${idPrefix}-500g`,
    label: "500g",
    size: 500,
    price: largePrice,
    compareAtPrice: options.compareAtLarge,
    stockQuantity: options.largeStock ?? 25,
  }),
];

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Deterministic 0-99 seed from a product id, so merchandising signals below
 * (rating, review count, badges) are stable across renders and test runs
 * without hardcoding a value per catalog entry.
 */
const seedOf = (id: string): number => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return hash % 100;
};

export const MOCK_PRODUCTS: ProductDto[] = CATALOG.map((entry, index) => {
  const category = findCategory(entry.categorySlug);
  const id = `prod-${index + 1}`;
  const createdAt = new Date(Date.now() - (CATALOG.length - index) * 86_400_000).toISOString();
  const seed = seedOf(id);

  return makeProduct({
    id,
    name: entry.name,
    slug: slugify(entry.name),
    description: entry.description,
    categoryId: category.id,
    categoryName: category.name,
    status: entry.status ?? PRODUCT_STATUS.PUBLISHED,
    images: [entry.image],
    variants: twoSizeVariants(id, entry.smallPrice, entry.largePrice, {
      compareAtLarge: entry.compareAtLarge,
      smallStock: entry.stockOverride?.small,
      largeStock: entry.stockOverride?.large ?? (index % 11 === 0 ? 0 : undefined),
    }),
    tags: entry.tags,
    createdAt,
    updatedAt: createdAt,
    rating: Math.round((4.3 + (seed % 7) * 0.1) * 10) / 10,
    reviewCount: 20 + seed,
    isBestSeller: seed % 5 === 0,
    isFeatured: index < 8,
    isNew: seed % 9 === 0,
  });
});

/** Backwards-compatible generator, now backed by the real named catalog above. */
export const makeProductList = (count: number): ProductDto[] =>
  Array.from({ length: count }, (_, index) => MOCK_PRODUCTS[index % MOCK_PRODUCTS.length]).map(
    (product, index) => ({ ...product, id: `prod-${index + 1}` }),
  );

export const MOCK_PRODUCT_PUBLISHED = MOCK_PRODUCTS[0];
export const MOCK_PRODUCT_DRAFT =
  MOCK_PRODUCTS.find((p) => p.status === PRODUCT_STATUS.DRAFT) ??
  makeProduct({ id: "prod-draft", name: "Unroasted Pistachios", status: PRODUCT_STATUS.DRAFT });
