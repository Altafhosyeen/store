import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { EmptyState, QueryStateBoundary, SectionHeading } from "@/components";
import { useCategoryCache, useDebouncedValue, useTableParams } from "@/hooks";
import { brandColors } from "@/theme";
import { ProductCard } from "../components/ProductCard";
import { PRODUCT_STATUS } from "../constants/products.constants";
import { useAddToCart } from "../hooks/use-add-to-cart";
import { useGetProducts } from "../hooks/use-products";

/** Public storefront catalog: search, category filter, product grid. */
export const ShopPage = () => {
  const { params, setParams } = useTableParams();
  const [searchInput, setSearchInput] = useState(params.search ?? "");
  const debouncedSearch = useDebouncedValue(searchInput);
  const categories = useCategoryCache();
  const addToCart = useAddToCart();

  const categoryId = typeof params.categoryId === "string" ? params.categoryId : undefined;

  const { data, isLoading, error, refetch } = useGetProducts({
    ...params,
    categoryId,
    search: debouncedSearch || undefined,
    status: PRODUCT_STATUS.PUBLISHED,
  });

  const products = data?.items ?? [];

  const clearFilters = () => {
    setSearchInput("");
    setParams({ ...params, page: 1, categoryId: undefined, search: undefined });
  };

  return (
    <div className="py-16 sm:py-24" style={{ background: brandColors.cream }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="The Full Pantry"
          title="Shop All Dry Fruits"
          description="Browse our full range of nuts, dried fruit, seeds and gift collections."
        />

        <div className="mt-10">
          <Input
            allowClear
            size="large"
            prefix={<SearchOutlined style={{ color: brandColors.cocoa }} />}
            placeholder="Search almonds, cashews, pistachios, dates…"
            className="!rounded-full"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <div className="mt-6 flex flex-col gap-6 md:flex-row lg:gap-8">
          <aside className="shrink-0 md:w-60 lg:w-64">
            <div
              className="space-y-6 rounded-2xl border p-5 md:sticky md:top-28"
              style={{ background: "rgba(255,255,255,.7)", borderColor: brandColors.sand }}
            >
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
            </div>
          </aside>

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
