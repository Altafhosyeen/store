import { Input, Select, Space } from "antd";
import { useState } from "react";
import { EmptyState, PageHeader, QueryStateBoundary } from "@/components";
import { useCategoryCache, useDebouncedValue, useTableParams } from "@/hooks";
import { useCartStore } from "@/store";
import { ProductCard } from "../components/ProductCard";
import { PRODUCT_STATUS } from "../constants/products.constants";
import { useGetProducts } from "../hooks/use-products";

/** Public storefront grid: browse and filter the published catalog. */
export const ShopPage = () => {
  const { params, setParams } = useTableParams();
  const [searchInput, setSearchInput] = useState(params.search ?? "");
  const debouncedSearch = useDebouncedValue(searchInput);
  const categories = useCategoryCache();
  const addLine = useCartStore((state) => state.addLine);

  const { data, isLoading, error, refetch } = useGetProducts({
    ...params,
    search: debouncedSearch || undefined,
    status: PRODUCT_STATUS.PUBLISHED,
  });

  const products = data?.items ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
      <PageHeader title="Shop" description="Freshly roasted nuts, dried fruit and healthy snacks.">
        <Space wrap>
          <Input.Search
            allowClear
            placeholder="Search products"
            className="w-64"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Select
            allowClear
            placeholder="Category"
            className="w-48"
            options={categories.map((category) => ({ value: category.id, label: category.name }))}
            onChange={(categoryId?: string) => setParams({ ...params, page: 1, categoryId })}
          />
        </Space>
      </PageHeader>

      <QueryStateBoundary
        isLoading={isLoading}
        error={error}
        isEmpty={products.length === 0}
        emptyState={
          <EmptyState title="No products found" description="Try a different search or category." />
        }
        onRetry={refetch}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => {
            const cheapest = product.variants[0];
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() =>
                  cheapest &&
                  addLine({
                    productId: product.id,
                    name: product.name,
                    imageUrl: product.images[0],
                    unitPrice: cheapest.price,
                    quantity: 1,
                    variantLabel: cheapest.label,
                  })
                }
              />
            );
          })}
        </div>
      </QueryStateBoundary>
    </div>
  );
};
