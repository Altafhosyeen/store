import type { CategoryDto } from "@/features/categories";

export const makeCategory = (overrides: Partial<CategoryDto> = {}): CategoryDto => ({
  id: "cat-1",
  name: "Cashews",
  slug: "cashews",
  description: "Creamy, buttery cashews.",
  productCount: 4,
  ...overrides,
});

export const MOCK_CATEGORIES: CategoryDto[] = [
  makeCategory({
    id: "cat-1",
    name: "Cashews",
    slug: "cashews",
    description: "Creamy, buttery cashews — roasted, raw or spiced.",
    imageUrl: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?w=600",
    productCount: 8,
  }),
  makeCategory({
    id: "cat-2",
    name: "Almonds",
    slug: "almonds",
    description: "Crunchy whole almonds, sliced or flavoured.",
    imageUrl: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600",
    productCount: 7,
  }),
  makeCategory({
    id: "cat-3",
    name: "Walnuts",
    slug: "walnuts",
    description: "Fresh-cracked walnut halves and pieces.",
    imageUrl: "https://images.unsplash.com/photo-1573851552153-816785fecf4a?w=600",
    productCount: 5,
  }),
  makeCategory({
    id: "cat-4",
    name: "Pistachios",
    slug: "pistachios",
    description: "In-shell and shelled pistachios, roasted and salted.",
    imageUrl: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600",
    productCount: 6,
  }),
  makeCategory({
    id: "cat-5",
    name: "Dried Fruit",
    slug: "dried-fruit",
    description: "Naturally sun-dried fruit, no added sugar.",
    imageUrl: "https://images.unsplash.com/photo-1596591868231-05e808fd126f?w=600",
    productCount: 8,
  }),
  makeCategory({
    id: "cat-6",
    name: "Trail Mixes",
    slug: "trail-mixes",
    description: "Blended nuts, seeds and dried fruit snack packs.",
    imageUrl: "https://images.unsplash.com/photo-1594054621968-0dab77f8b3f7?w=600",
    productCount: 6,
  }),
  makeCategory({
    id: "cat-7",
    name: "Seeds",
    slug: "seeds",
    description: "Pumpkin, sunflower and chia seeds.",
    imageUrl: "https://images.unsplash.com/photo-1508061235736-cdfa2f4c9ce0?w=600",
    productCount: 5,
  }),
  makeCategory({
    id: "cat-8",
    name: "Gift Boxes",
    slug: "gift-boxes",
    description: "Curated assortments in gift-ready packaging.",
    imageUrl: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=600",
    productCount: 4,
  }),
];
