import type { ProductDto } from "../../../types/products-api.types";
import type { NutritionProfile } from "./nutrition.types";
import { NUTRITION_PROFILES_1 } from "./nutrition-profiles-1.data";
import { NUTRITION_PROFILES_2 } from "./nutrition-profiles-2.data";
import { NUTRITION_PROFILES_3 } from "./nutrition-profiles-3.data";

export const NUTRITION_PROFILES: Record<string, NutritionProfile> = {
  ...NUTRITION_PROFILES_1,
  ...NUTRITION_PROFILES_2,
  ...NUTRITION_PROFILES_3,
};

/** Keyword → profile key. Order matters: the first needle found in the product wins. */
const PROFILE_RULES: Array<[needle: string, profileKey: string]> = [
  ["almond", "almond"],
  ["badam", "almond"],
  ["cashew", "cashew"],
  ["kaju", "cashew"],
  ["pistachio", "pistachio"],
  ["pista", "pistachio"],
  ["walnut", "walnut"],
  ["akhrot", "walnut"],
  ["chilgoza", "pinenut"],
  ["pine nut", "pinenut"],
  ["peanut", "peanut"],
  ["moongphali", "peanut"],
  ["hazelnut", "hazelnut"],
  ["macadamia", "macadamia"],
  ["brazil", "brazil"],
  ["chuhara", "drydates"],
  ["dry dates", "drydates"],
  ["date", "dates"],
  ["khajoor", "dates"],
  ["anjeer", "fig"],
  ["fig", "fig"],
  ["apricot", "apricot"],
  ["khubani", "apricot"],
  ["raisin", "raisin"],
  ["kishmish", "raisin"],
  ["munakka", "raisin"],
  ["prune", "prune"],
  ["aloo bukhara", "prune"],
  ["coconut", "coconut"],
  ["banana", "banana"],
  ["mango", "driedfruit"],
  ["cranberr", "driedfruit"],
  ["berr", "driedfruit"],
  ["pumpkin", "pumpkinseed"],
  ["chia", "chia"],
  ["flax", "flax"],
  ["alsi", "flax"],
  ["sunflower", "sunflower"],
  ["magaz", "melonseed"],
  ["melon", "melonseed"],
  ["watermelon", "melonseed"],
  ["chana", "chana"],
  ["makhana", "makhana"],
  ["fox nut", "makhana"],
  ["mix", "mix"],
  ["trail", "mix"],
];

const GIFT_CATEGORY_NAME = "Gift Boxes";

/** The nutrition story that fits a product, matched on its name, keywords and subtitle. */
export const getNutritionProfile = (product: ProductDto): NutritionProfile => {
  if (product.categoryName === GIFT_CATEGORY_NAME) return NUTRITION_PROFILES.gift;
  const haystack = [product.name, product.keywords, product.subtitle]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const match = PROFILE_RULES.find(([needle]) => haystack.includes(needle));
  return NUTRITION_PROFILES[match?.[1] ?? "mix"];
};

/** The products offered as chips in the "Why This Product?" section, in display order. */
export const NUTRITION_CHIP_PRODUCTS = [
  "premium american almonds",
  "premium cashews",
  "premium iranian pistachios",
  "walnut kernels",
  "pakistani chilgoza (in-shell)",
  "ajwa dates",
  "premium anjeer",
  "golden raisins",
  "dried apricots",
  "pumpkin seeds",
  "chia seeds",
  "makhana",
  "royal mixed",
];
