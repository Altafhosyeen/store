import { STORE_IMAGES } from "@/assets/images";
import type { CategoryDto } from "@/features/categories";

export const makeCategory = (overrides: Partial<CategoryDto> = {}): CategoryDto => ({
  id: "cat-1",
  name: "Nuts",
  slug: "nuts",
  description: "Badam • Kaju • Pista • Akhrot • Chilgoza • Hazelnuts",
  productCount: 20,
  ...overrides,
});

/** The reference storefront's seven shop categories, in filter-chip order. */
export const MOCK_CATEGORIES: CategoryDto[] = [
  makeCategory({
    id: "cat-1",
    name: "Nuts",
    slug: "nuts",
    description: "Badam • Kaju • Pista • Akhrot • Chilgoza • Hazelnuts",
    imageUrl: STORE_IMAGES.almonds,
    productCount: 20,
  }),
  makeCategory({
    id: "cat-2",
    name: "Dried Fruits",
    slug: "dried-fruits",
    description: "Anjeer • Kishmish • Khubani • Mango • Prunes",
    imageUrl: STORE_IMAGES.figs,
    productCount: 11,
  }),
  makeCategory({
    id: "cat-3",
    name: "Dates",
    slug: "dates",
    description: "Ajwa • Medjool • Mabroom • Aseel • Rabbi",
    imageUrl: STORE_IMAGES.dates,
    productCount: 10,
  }),
  makeCategory({
    id: "cat-4",
    name: "Seeds",
    slug: "seeds",
    description: "Pumpkin • Chia • Flax • Magaz • Sunflower",
    imageUrl: STORE_IMAGES.seeds,
    productCount: 6,
  }),
  makeCategory({
    id: "cat-5",
    name: "Snacks",
    slug: "snacks",
    description: "Roasted nuts • Makhana • Chana • Peanuts",
    imageUrl: STORE_IMAGES.makhana,
    productCount: 9,
  }),
  makeCategory({
    id: "cat-6",
    name: "Mixed",
    slug: "mixed",
    description: "Royal Mix • Trail Mix • Family Mix",
    imageUrl: STORE_IMAGES.mix,
    productCount: 5,
  }),
  makeCategory({
    id: "cat-7",
    name: "Gift Boxes",
    slug: "gift-boxes",
    description: "Wedding • Eid • Ramadan • Corporate • Family • Luxury",
    imageUrl: STORE_IMAGES.giftbox,
    productCount: 6,
  }),
];
