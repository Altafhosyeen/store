import type { LookupCategory } from "@/store";

export interface ShopFilterState {
  search: string;
  categoryId: string | null;
  priceBand: string;
  weight: string | null;
  minRating: number;
  sort: string;
}

export const INITIAL_SHOP_FILTERS: ShopFilterState = {
  search: "",
  categoryId: null,
  priceBand: "all",
  weight: null,
  minRating: 0,
  sort: "popular",
};

/** Price bands are applied to each product's displayed (default) pack price. */
export const PRICE_BANDS = [
  { value: "all", label: "All Prices" },
  { value: "0-1000", label: "Under Rs. 1,000" },
  { value: "1000-2500", label: "Rs. 1,000 – 2,500" },
  { value: "2500-5000", label: "Rs. 2,500 – 5,000" },
  { value: "5000-999999", label: "Above Rs. 5,000" },
];

const WEIGHTS = ["100g", "250g", "500g", "1kg"];

const RATINGS = [
  { value: 0, label: "All Ratings", stars: "" },
  { value: 4, label: "4+ stars", stars: "★★★★" },
  { value: 4.5, label: "4.5+ stars", stars: "★★★★★" },
];

const CHIP =
  "filter-chip btn-press rounded-full border border-sand px-3 py-1.5 text-[12.5px] text-cocoa transition-colors";
const GROUP_LABEL = "mb-2.5 text-[11px] font-semibold uppercase tracking-[.2em] text-cocoa/70";
const RADIO_ROW = "flex cursor-pointer items-center gap-2.5 hover:text-golddk";

interface ShopFiltersProps {
  filters: ShopFilterState;
  categories: LookupCategory[];
  onChange: (patch: Partial<ShopFilterState>) => void;
  onReset: () => void;
}

/** The Shop section's sticky filter card: category, price band, pack size, rating. */
export const ShopFilters = ({ filters, categories, onChange, onReset }: ShopFiltersProps) => (
  <div className="space-y-6 rounded-2xl border border-sand bg-white/70 p-5 shadow-card md:sticky md:top-28">
    <div className="flex items-center justify-between">
      <h3 className="font-display text-lg font-bold text-walnutdk">Filters</h3>
      <button
        type="button"
        onClick={onReset}
        className="text-[12px] font-semibold text-golddk hover:underline"
      >
        Reset All
      </button>
    </div>

    <div>
      <p className={GROUP_LABEL}>Category</p>
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => onChange({ categoryId: null })}
          className={`${CHIP} ${filters.categoryId === null ? "active" : ""}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange({ categoryId: category.id })}
            className={`${CHIP} ${filters.categoryId === category.id ? "active" : ""}`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>

    <fieldset className="m-0 border-0 p-0">
      <legend className={GROUP_LABEL}>Price (selected weight)</legend>
      <div className="space-y-1.5 text-[13.5px] text-walnut">
        {PRICE_BANDS.map((band) => (
          <label key={band.value} className={RADIO_ROW}>
            <input
              type="radio"
              name="shop-price"
              value={band.value}
              checked={filters.priceBand === band.value}
              onChange={() => onChange({ priceBand: band.value })}
              className="accent-golddk"
            />
            {band.label}
          </label>
        ))}
      </div>
    </fieldset>

    <div>
      <p className={GROUP_LABEL}>Weight Available</p>
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => onChange({ weight: null })}
          className={`${CHIP} ${filters.weight === null ? "active" : ""}`}
        >
          Any
        </button>
        {WEIGHTS.map((weight) => (
          <button
            key={weight}
            type="button"
            onClick={() => onChange({ weight })}
            className={`${CHIP} ${filters.weight === weight ? "active" : ""}`}
          >
            {weight}
          </button>
        ))}
      </div>
    </div>

    <fieldset className="m-0 border-0 p-0">
      <legend className={GROUP_LABEL}>Rating</legend>
      <div className="space-y-1.5 text-[13.5px] text-walnut">
        {RATINGS.map((rating) => (
          <label key={rating.value} className={RADIO_ROW}>
            <input
              type="radio"
              name="shop-rating"
              value={rating.value}
              checked={filters.minRating === rating.value}
              onChange={() => onChange({ minRating: rating.value })}
              className="accent-golddk"
            />
            {rating.stars ? (
              <>
                <span className="star-g">{rating.stars}</span>&nbsp;
              </>
            ) : null}
            {rating.label}
          </label>
        ))}
      </div>
    </fieldset>
  </div>
);
