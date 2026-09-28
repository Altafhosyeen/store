import { STORE_IMAGES } from "@/assets/images";

export type BoxSizeKey = "mini" | "classic" | "premium" | "royal";

export interface BoxSize {
  key: BoxSizeKey;
  label: string;
  icon: string;
  slots: number;
  portion: string;
  /** Wooden box, lining and ribbon. */
  basePrice: number;
  /** Share of the per-kg price one portion costs (reference pack-size economics). */
  portionFactor: number;
}

export const BOX_SIZES: BoxSize[] = [
  {
    key: "mini",
    label: "Mini Box",
    icon: "box",
    slots: 4,
    portion: "100g",
    basePrice: 450,
    portionFactor: 0.118,
  },
  {
    key: "classic",
    label: "Classic Box",
    icon: "box-open",
    slots: 6,
    portion: "150g",
    basePrice: 750,
    portionFactor: 0.172,
  },
  {
    key: "premium",
    label: "Premium Box",
    icon: "boxes-stacked",
    slots: 8,
    portion: "200g",
    basePrice: 1150,
    portionFactor: 0.225,
  },
  {
    key: "royal",
    label: "Royal Box",
    icon: "crown",
    slots: 10,
    portion: "250g",
    basePrice: 1650,
    portionFactor: 0.275,
  },
];

export interface BoxProduct {
  name: string;
  urduName: string;
  image: string;
  pricePerKg: number;
}

export const BOX_PRODUCTS: BoxProduct[] = [
  { name: "Almonds", urduName: "بادام", image: STORE_IMAGES.almonds, pricePerKg: 3800 },
  { name: "Cashews", urduName: "کاجو", image: STORE_IMAGES.cashews, pricePerKg: 6200 },
  { name: "Pistachios", urduName: "پستہ", image: STORE_IMAGES.pistachios, pricePerKg: 6800 },
  { name: "Walnut Giri", urduName: "اخروٹ گری", image: STORE_IMAGES.walnuts, pricePerKg: 5200 },
  { name: "Ajwa Dates", urduName: "عجوہ کھجور", image: STORE_IMAGES.dates, pricePerKg: 5500 },
  { name: "Medjool Dates", urduName: "مجہول کھجور", image: STORE_IMAGES.dates, pricePerKg: 4200 },
  { name: "Anjeer", urduName: "انجیر", image: STORE_IMAGES.figs, pricePerKg: 5200 },
  { name: "Golden Raisins", urduName: "کشمش", image: STORE_IMAGES.raisins, pricePerKg: 1900 },
  { name: "Dried Apricots", urduName: "خوبانی", image: STORE_IMAGES.apricots, pricePerKg: 2200 },
  { name: "Chilgoza", urduName: "چلغوزہ", image: STORE_IMAGES.chilgoza, pricePerKg: 17500 },
  { name: "Pumpkin Seeds", urduName: "کدو کے بیج", image: STORE_IMAGES.seeds, pricePerKg: 3400 },
  { name: "Makhana", urduName: "مکھانہ", image: STORE_IMAGES.makhana, pricePerKg: 6800 },
];

/** One portion's price in this box size, rounded to the nearest Rs. 10. */
export const portionPrice = (product: BoxProduct, size: BoxSize): number =>
  Math.round((product.pricePerKg * size.portionFactor) / 10) * 10;
