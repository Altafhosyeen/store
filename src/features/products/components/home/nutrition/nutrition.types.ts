export interface Nutrient {
  name: string;
  /** Font Awesome icon name without the `fa-` prefix. */
  icon: string;
  value: string;
}

export interface NutritionProfile {
  label: string;
  urduName: string;
  tagline: string;
  why: string;
  /** Exactly four — the section lays them out around the product photo. */
  nutrients: Nutrient[];
  basis: string;
  serving: { size: string; calories: string; note: string };
  didYouKnow: string;
  tip: string;
  bestFor: Array<{ emoji: string; label: string }>;
}
