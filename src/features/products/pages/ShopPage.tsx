import { FilterOutlined, SearchOutlined, SlidersOutlined } from "@ant-design/icons";
import { Button, Drawer, Input, Radio, Select } from "antd";
import { useState } from "react";
import { EmptyState, QueryStateBoundary, SectionHeading } from "@/components";
import { useCategoryCache, useDebouncedValue, useTableParams } from "@/hooks";
import { brandColors } from "@/theme";
import { ProductCard } from "../components/ProductCard";
import { PRODUCT_STATUS } from "../constants/products.constants";
import { useAddToCart } from "../hooks/use-add-to-cart";
import { useGetProducts } from "../hooks/use-products";
import type { ProductSort } from "../types/products-api.types";

const SORT_OPTIONS: Array<{ value: ProductSort; label: string }> = [
  { value: "popular", label: "Sort: Popular" },
  { value: "bestselling", label: "Best Selling" },
  { value: "price-asc", label: "Price Low → High" },
  { value: "price-desc", label: "Price High → Low" },
  { value: "new", label: "New Arrivals" },
  { value: "rating", label: "Highest Rated" },
];

const PRICE_BANDS: Array<{ key: string; label: string; min?: number; max?: number }> = [
  { key: "all", label: "All Prices" },
  { key: "0-1000", label: "Under Rs. 1,000", min: undefined, max: 1000 },
  { key: "1000-2500", label: "Rs. 1,000 – 2,500", min: 1000, max: 2500 },
  { key: "2500-5000", label: "Rs. 2,500 – 5,000", min: 2500, max: 5000 },
  { key: "5000-plus", label: "Above Rs. 5,000", min: 5000, max: undefined },
];

const WEIGHT_OPTIONS = ["100g", "250g", "500g", "1kg"];

const RATING_BANDS: Array<{ key: string; label: string; min?: number }> = [
  { key: "all", label: "All Ratings" },
  { key: "4", label: "★★★★  4+ stars", min: 4 },
  { key: "4.5", label: "★★★★★  4.5+ stars", min: 4.5 },
];

/** Public storefront catalog: search, sort, category/price/weight/rating filters, product grid. */
export const ShopPage = () => {
  const { params, setParams } = useTableParams();
  const [searchInput, setSearchInput] = useState(params.search ?? "");
  const debouncedSearch = useDebouncedValue(searchInput);
  const categories = useCategoryCache();
  const addToCart = useAddToCart();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categoryId = typeof params.categoryId === "string" ? params.categoryId : undefined;
  const sort = typeof params.sort === "string" ? (params.sort as ProductSort) : undefined;
  const weight = typeof params.weight === "string" ? params.weight : undefined;
  const minPrice = typeof params.minPrice === "string" ? Number(params.minPrice) : undefined;
  const maxPrice = typeof params.maxPrice === "string" ? Number(params.maxPrice) : undefined;
  const minRating = typeof params.minRating === "string" ? Number(params.minRating) : undefined;

  const priceKey =
    PRICE_BANDS.find((band) => band.min === minPrice && band.max === maxPrice)?.key ?? "all";
  const ratingKey = RATING_BANDS.find((band) => band.min === minRating)?.key ?? "all";

  const { data, isLoading, error, refetch } = useGetProducts({
    ...params,
    categoryId,
    sort,
    weight,
    minPrice,
    maxPrice,
    minRating,
    search: debouncedSearch || undefined,
    status: PRODUCT_STATUS.PUBLISHED,
  });

  const products = data?.items ?? [];

  const clearFilters = () => {
    setSearchInput("");
    setParams({
      ...params,
      page: 1,
      categoryId: undefined,
      search: undefined,
      sort: undefined,
      weight: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
    });
  };

  const setPriceBand = (key: string) => {
    const band = PRICE_BANDS.find((b) => b.key === key);
    setParams({ ...params, page: 1, minPrice: band?.min, maxPrice: band?.max });
  };

  const setRatingBand = (key: string) => {
    const band = RATING_BANDS.find((b) => b.key === key);
    setParams({ ...params, page: 1, minRating: band?.min });
  };

  const filterPanel = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3
          className="flex items-center gap-2 text-lg font-bold"
          style={{ color: brandColors.walnutDark }}
        >
          <FilterOutlined /> Filters
        </h3>
        <button
          type="button"
          onClick={clearFilters}
          className="text-[12px] font-semibold hover:underline"
          style={{ color: brandColors.goldDark }}
        >
          Reset All
        </button>
      </div>

      <div>
        <p
          className="mb-2.5 text-[11px] font-semibold uppercase tracking-[.2em]"
          style={{ color: brandColors.cocoa }}
        >
          Category
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setParams({ ...params, page: 1, categoryId: undefined })}
            className="rounded-full border px-3 py-1.5 text-[12.5px] transition-colors"
            style={
              !categoryId
                ? {
                    background: brandColors.walnutDark,
                    color: brandColors.ivory,
                    borderColor: brandColors.walnutDark,
                  }
                : { borderColor: brandColors.sand, color: brandColors.cocoa }
            }
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setParams({ ...params, page: 1, categoryId: category.id })}
              className="rounded-full border px-3 py-1.5 text-[12.5px] transition-colors"
              style={
                categoryId === category.id
                  ? {
                      background: brandColors.walnutDark,
                      color: brandColors.ivory,
                      borderColor: brandColors.walnutDark,
                    }
                  : { borderColor: brandColors.sand, color: brandColors.cocoa }
              }
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p
          className="mb-2.5 text-[11px] font-semibold uppercase tracking-[.2em]"
          style={{ color: brandColors.cocoa }}
        >
          Price
        </p>
        <Radio.Group
          value={priceKey}
          onChange={(event) => setPriceBand(event.target.value)}
          className="flex flex-col gap-1.5"
        >
          {PRICE_BANDS.map((band) => (
            <Radio key={band.key} value={band.key} style={{ color: brandColors.walnut }}>
              <span className="text-[13.5px]">{band.label}</span>
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div>
        <p
          className="mb-2.5 text-[11px] font-semibold uppercase tracking-[.2em]"
          style={{ color: brandColors.cocoa }}
        >
          Weight Available
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setParams({ ...params, page: 1, weight: undefined })}
            className="rounded-full border px-3 py-1.5 text-[12.5px] transition-colors"
            style={
              !weight
                ? {
                    background: brandColors.walnutDark,
                    color: brandColors.ivory,
                    borderColor: brandColors.walnutDark,
                  }
                : { borderColor: brandColors.sand, color: brandColors.cocoa }
            }
          >
            Any
          </button>
          {WEIGHT_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setParams({ ...params, page: 1, weight: option })}
              className="rounded-full border px-3 py-1.5 text-[12.5px] transition-colors"
              style={
                weight === option
                  ? {
                      background: brandColors.walnutDark,
                      color: brandColors.ivory,
                      borderColor: brandColors.walnutDark,
                    }
                  : { borderColor: brandColors.sand, color: brandColors.cocoa }
              }
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p
          className="mb-2.5 text-[11px] font-semibold uppercase tracking-[.2em]"
          style={{ color: brandColors.cocoa }}
        >
          Rating
        </p>
        <Radio.Group
          value={ratingKey}
          onChange={(event) => setRatingBand(event.target.value)}
          className="flex flex-col gap-1.5"
        >
          {RATING_BANDS.map((band) => (
            <Radio key={band.key} value={band.key} style={{ color: brandColors.walnut }}>
              <span className="text-[13.5px]">{band.label}</span>
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </div>
  );

  return (
    <div className="py-16 sm:py-24" style={{ background: brandColors.cream }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="The Full Pantry"
          title="Shop All Dry Fruits"
          description="Browse our full range of nuts, dried fruit, seeds and gift collections."
        />
        <p className="mt-4 text-center text-[13px]" style={{ color: brandColors.cocoa }}>
          All prices are sample Royal Nuts retail-style prices in PKR and vary by grade, variety and
          pack size.
        </p>

        <div className="mt-10 flex flex-col gap-3 md:flex-row">
          <Input
            allowClear
            size="large"
            prefix={<SearchOutlined style={{ color: brandColors.cocoa }} />}
            placeholder="Search almonds, cashews, pistachios, dates…"
            className="!rounded-full flex-1"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <div className="flex gap-3">
            <Select
              size="large"
              className="flex-1 md:w-56"
              value={sort ?? "popular"}
              onChange={(value) => setParams({ ...params, page: 1, sort: value })}
              options={SORT_OPTIONS}
              aria-label="Sort products"
            />
            <Button
              size="large"
              icon={<SlidersOutlined />}
              className="md:hidden"
              onClick={() => setMobileFiltersOpen(true)}
              style={{
                background: brandColors.walnutDark,
                color: brandColors.ivory,
                border: "none",
              }}
            >
              Filters
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 md:flex-row lg:gap-8">
          <aside className="hidden shrink-0 md:block md:w-60 lg:w-64">
            <div
              className="rounded-2xl border p-5 md:sticky md:top-28"
              style={{ background: "rgba(255,255,255,.7)", borderColor: brandColors.sand }}
            >
              {filterPanel}
            </div>
          </aside>

          <Drawer
            title="Filters"
            placement="left"
            open={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
            width={320}
          >
            {filterPanel}
          </Drawer>

          <div className="flex-1">
            <p className="mb-4 text-[13px]" style={{ color: brandColors.cocoa }}>
              {products.length} product{products.length === 1 ? "" : "s"}
            </p>

            <QueryStateBoundary
              isLoading={isLoading}
              error={error}
              isEmpty={products.length === 0}
              emptyState={
                <EmptyState
                  title="No products found"
                  description="Try a different search term or clear the filters."
                  action={
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="rounded-full px-6 py-2.5 font-semibold text-white"
                      style={{ background: brandColors.gold }}
                    >
                      Clear Filters
                    </button>
                  }
                />
              }
              onRetry={refetch}
            >
              <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            </QueryStateBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};
