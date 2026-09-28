import { STORE_IMAGES } from "@/assets/images";
import type { ProductDto, ProductVariantDto } from "@/features/products";
import { PRODUCT_STATUS } from "@/features/products";
import { MOCK_CATEGORIES } from "./categories.mock";
import { CATALOG, type CatalogEntry } from "./products-catalog.mock";

const makeVariant = (overrides: Partial<ProductVariantDto> = {}): ProductVariantDto => ({
  id: "var-1",
  label: "250g",
  size: 250,
  unit: "g",
  price: 1050,
  stockQuantity: 40,
  ...overrides,
});

export const makeProduct = (overrides: Partial<ProductDto> = {}): ProductDto => {
  const category = MOCK_CATEGORIES[0];
  const now = new Date().toISOString();
  return {
    id: "prod-1",
    name: "Premium American Almonds",
    slug: "premium-american-almonds",
    description:
      "Large, uniform California almonds with a clean crunch and naturally sweet finish.",
    categoryId: category.id,
    categoryName: category.name,
    status: PRODUCT_STATUS.PUBLISHED,
    images: [STORE_IMAGES.almonds],
    variants: [
      makeVariant({ id: "var-1", label: "250g", size: 250, price: 1050, stockQuantity: 40 }),
      makeVariant({
        id: "var-2",
        label: "500g",
        size: 500,
        price: 2010,
        compareAtPrice: 2230,
        stockQuantity: 25,
      }),
    ],
    tags: ["almonds"],
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

/** The reference storefront rounds every price to the nearest Rs. 10. */
const roundToTen = (value: number): number => Math.round(value / 10) * 10;

/** "250g" → { size: 250, unit: "g" }; "1kg" → { size: 1, unit: "kg" }; "Standard" → a 1-piece box. */
const parsePack = (label: string): { size: number; unit: string } => {
  const match = /^(\d+)(g|kg)$/.exec(label);
  return match ? { size: Number(match[1]), unit: match[2] } : { size: 1, unit: "box" };
};

const toVariants = (id: string, entry: CatalogEntry): ProductVariantDto[] =>
  Object.entries(entry.prices).map(([label, price]) => ({
    id: `${id}-${label.toLowerCase()}`,
    label,
    ...parsePack(label),
    price,
    compareAtPrice: entry.salePercent
      ? roundToTen(price / (1 - entry.salePercent / 100))
      : undefined,
    stockQuantity: entry.inStock === false ? 0 : 40,
  }));

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const MOCK_PRODUCTS: ProductDto[] = CATALOG.map((entry, index) => {
  const category = findCategory(entry.categorySlug);
  const id = `prod-${index + 1}`;
  const createdAt = new Date(Date.now() - (CATALOG.length - index) * 86_400_000).toISOString();

  return makeProduct({
    id,
    name: entry.name,
    slug: slugify(entry.name),
    description: entry.description,
    categoryId: category.id,
    categoryName: category.name,
    status: PRODUCT_STATUS.PUBLISHED,
    images: [STORE_IMAGES[entry.image]],
    variants: toVariants(id, entry),
    tags: entry.keywords.split(" ").filter(Boolean),
    createdAt,
    updatedAt: createdAt,
    rating: entry.rating,
    reviewCount: entry.reviewCount,
    isBestSeller: entry.isBestSeller ?? false,
    isFeatured: entry.isFeatured ?? false,
    isNew: entry.isNew ?? false,
    isRoyal: entry.isRoyal ?? false,
    urduName: entry.urduName,
    subtitle: entry.subtitle,
    badge: entry.badge,
    salePercent: entry.salePercent,
    origin: entry.origin,
    texture: entry.texture,
    taste: entry.taste,
    bestFor: entry.bestFor,
    keywords: entry.keywords,
  });
});

/**
 * Admin-console-only records: the reference catalogue is all published, but
 * the console needs drafts and an archived product to exercise its workflows.
 * The storefront only ever lists published products, so these never show there.
 */
const ADMIN_ONLY_PRODUCTS: ProductDto[] = [
  makeProduct({
    id: `prod-${CATALOG.length + 1}`,
    name: "Unroasted Pistachios",
    slug: "unroasted-pistachios",
    description: "Raw in-shell pistachios awaiting the next roasting batch.",
    categoryId: findCategory("nuts").id,
    categoryName: findCategory("nuts").name,
    status: PRODUCT_STATUS.DRAFT,
    images: [STORE_IMAGES.pistachios],
  }),
  makeProduct({
    id: `prod-${CATALOG.length + 2}`,
    name: "Honey Glazed Walnuts",
    slug: "honey-glazed-walnuts",
    description: "Walnut halves in a thin honey glaze — recipe still being finalised.",
    categoryId: findCategory("snacks").id,
    categoryName: findCategory("snacks").name,
    status: PRODUCT_STATUS.DRAFT,
    images: [STORE_IMAGES.walnuts],
  }),
  makeProduct({
    id: `prod-${CATALOG.length + 3}`,
    name: "Summer Fruit Hamper",
    slug: "summer-fruit-hamper",
    description: "Last season's limited-edition hamper, no longer sold.",
    categoryId: findCategory("gift-boxes").id,
    categoryName: findCategory("gift-boxes").name,
    status: PRODUCT_STATUS.ARCHIVED,
    images: [STORE_IMAGES.giftbox],
  }),
];

MOCK_PRODUCTS.push(...ADMIN_ONLY_PRODUCTS);

/** Backwards-compatible generator, now backed by the real named catalog above. */
export const makeProductList = (count: number): ProductDto[] =>
  Array.from({ length: count }, (_, index) => MOCK_PRODUCTS[index % MOCK_PRODUCTS.length]).map(
    (product, index) => ({ ...product, id: `prod-${index + 1}` }),
  );

export const MOCK_PRODUCT_PUBLISHED = MOCK_PRODUCTS[0];
export const MOCK_PRODUCT_DRAFT =
  MOCK_PRODUCTS.find((p) => p.status === PRODUCT_STATUS.DRAFT) ??
  makeProduct({ id: "prod-draft", name: "Unroasted Pistachios", status: PRODUCT_STATUS.DRAFT });
