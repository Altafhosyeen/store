import type { ProductDto, ProductVariantDto } from "@/features/products";
import { PRODUCT_STATUS } from "@/features/products";
import { MOCK_CATEGORIES } from "./categories.mock";

const makeVariant = (overrides: Partial<ProductVariantDto> = {}): ProductVariantDto => ({
  id: "var-1",
  label: "250g",
  size: 250,
  unit: "g",
  price: 6.99,
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
    images: ["https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?w=600"],
    variants: [
      makeVariant({ id: "var-1", label: "250g", size: 250, price: 6.99, stockQuantity: 40 }),
      makeVariant({
        id: "var-2",
        label: "500g",
        size: 500,
        price: 12.49,
        compareAtPrice: 14.99,
        stockQuantity: 25,
      }),
    ],
    tags: ["roasted", "salted"],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
};

export const makeProductList = (count: number): ProductDto[] =>
  Array.from({ length: count }, (_, index) => {
    const category = MOCK_CATEGORIES[index % MOCK_CATEGORIES.length];
    return makeProduct({
      id: `prod-${index + 1}`,
      name: `${category.name.slice(0, -1)} Snack Pack ${index + 1}`,
      slug: `product-${index + 1}`,
      categoryId: category.id,
      categoryName: category.name,
      status: index % 5 === 0 ? PRODUCT_STATUS.DRAFT : PRODUCT_STATUS.PUBLISHED,
    });
  });

export const MOCK_PRODUCT_PUBLISHED = makeProduct();
export const MOCK_PRODUCT_DRAFT = makeProduct({
  id: "prod-draft",
  name: "Unroasted Pistachios",
  status: PRODUCT_STATUS.DRAFT,
});
