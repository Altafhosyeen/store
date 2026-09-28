import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SectionHeading } from "@/components";
import { HOME_SECTION_IDS } from "@/constants";
import { useCategories, useDebouncedValue } from "@/hooks";
import { PRODUCT_STATUS } from "../../constants/products.constants";
import { useGetProducts } from "../../hooks/use-products";
import type { ProductSort } from "../../types/products-api.types";
import { SHOP_QUERY_PARAMS } from "../../utils/shop-link";
import { ProductCard } from "../ProductCard";
import { INITIAL_SHOP_FILTERS, type ShopFilterState, ShopFilters } from "./ShopFilters";

/** Large enough to list the whole catalogue in one grid, as the reference storefront does. */
const SHOP_PAGE_SIZE = 200;

const SORT_OPTIONS: Array<{ value: ProductSort; label: string }> = [
  { value: "popular", label: "Sort: Popular" },
  { value: "bestselling", label: "Best Selling" },
  { value: "price-asc", label: "Price Low → High" },
  { value: "price-desc", label: "Price High → Low" },
  { value: "new", label: "New Arrivals" },
  { value: "rating", label: "Highest Rated" },
];

/** "The Full Pantry": search, sort and filter the whole catalogue. */
export const ShopSection = () => {
  const [searchParams] = useSearchParams();
  const { data: categories = [] } = useCategories({ enabled: true });
  const [filters, setFilters] = useState<ShopFilterState>(INITIAL_SHOP_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const search = useDebouncedValue(filters.search);

  // Links such as `/?q=badam#shop` or `/?cat=nuts#shop` land here pre-filtered.
  const querySearch = searchParams.get(SHOP_QUERY_PARAMS.search);
  const queryCategory = searchParams.get(SHOP_QUERY_PARAMS.category);
  useEffect(() => {
    if (querySearch === null && queryCategory === null) return;
    const categoryId = categories.find((c) => c.slug === queryCategory)?.id ?? null;
    setFilters({ ...INITIAL_SHOP_FILTERS, search: querySearch ?? "", categoryId });
  }, [querySearch, queryCategory, categories]);

  const [priceMin, priceMax] =
    filters.priceBand === "all" ? [undefined, undefined] : filters.priceBand.split("-").map(Number);
  const { data } = useGetProducts({
    page: 1,
    pageSize: SHOP_PAGE_SIZE,
    status: PRODUCT_STATUS.PUBLISHED,
    search: search.trim() || undefined,
    categoryId: filters.categoryId ?? undefined,
    weight: filters.weight ?? undefined,
    minRating: filters.minRating || undefined,
    displayPriceMin: priceMin,
    displayPriceMax: priceMax,
    sort: filters.sort as ProductSort,
  });
  const products = data?.items ?? [];
  const total = data?.total ?? 0;

  const update = (patch: Partial<ShopFilterState>) => setFilters((f) => ({ ...f, ...patch }));
  const reset = () => setFilters(INITIAL_SHOP_FILTERS);

  return (
    <section id={HOME_SECTION_IDS.shop} className="paper-texture py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal mb-10 text-center">
          <SectionHeading kicker="The Full Pantry" title="Shop All Dry Fruits" />
          <p className="mt-4 text-[13px] text-cocoa/80">
            All prices are sample Royal Nuts retail-style prices in PKR and vary by grade, variety
            and pack size.
          </p>
        </div>

        <div className="mb-5 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-sm text-cocoa/60" />
            <input
              type="search"
              value={filters.search}
              onChange={(event) => update({ search: event.target.value })}
              placeholder="Search almonds, badam, kaju, pista, khajoor, anjeer, chilgoza…"
              className="w-full rounded-full border border-sand bg-white/80 py-3 pl-11 pr-4 text-[15px] transition-shadow placeholder:text-cocoa/45"
              aria-label="Search products"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filters.sort}
              onChange={(event) => update({ sort: event.target.value })}
              className="flex-1 cursor-pointer rounded-full border border-sand bg-white/80 px-4 py-3 text-[14px] text-walnut md:flex-none"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              className="btn-press rounded-full bg-walnutdk px-5 py-3 text-[14px] font-medium text-ivory md:hidden"
              aria-label="Toggle filters"
              aria-expanded={filtersOpen}
            >
              <i className="fa-solid fa-sliders mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row lg:gap-8">
          <aside
            className={`${filtersOpen ? "block" : "hidden"} shrink-0 md:block md:w-60 lg:w-64`}
          >
            <ShopFilters
              filters={filters}
              categories={categories}
              onChange={update}
              onReset={reset}
            />
          </aside>

          <div className="flex-1">
            <p className="mb-4 text-[13px] text-cocoa/80">
              {total} product{total !== 1 ? "s" : ""} found
            </p>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-3">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : data ? (
              <div className="py-20 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sand/60 text-2xl text-cocoa">
                  <i className="fa-solid fa-magnifying-glass-minus" />
                </div>
                <p className="mt-5 font-display text-2xl font-bold text-walnutdk">
                  No products found
                </p>
                <p className="mt-2 font-light text-cocoa">
                  Try a different search term or clear the filters.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="btn-gold btn-press mt-5 rounded-full px-6 py-2.5 font-semibold text-white"
                >
                  Clear Filters
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
