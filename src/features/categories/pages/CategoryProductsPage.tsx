import { useParams } from "react-router-dom";
import { EmptyState, QueryStateBoundary, SectionHeading } from "@/components";
import { PRODUCT_STATUS, ProductCard, useAddToCart, useGetProducts } from "@/features/products";
import { brandColors } from "@/theme";
import { useGetCategoriesAdmin } from "../hooks/use-categories-admin";

/** Public storefront: products filtered to a single category, resolved from its slug. */
export const CategoryProductsPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesAdmin({
    page: 1,
    pageSize: 100,
  });
  const category = categoriesData?.items.find((item) => item.slug === categorySlug);

  const { data, isLoading, error, refetch } = useGetProducts({
    page: 1,
    pageSize: 24,
    categoryId: category?.id,
    status: PRODUCT_STATUS.PUBLISHED,
  });
  const addToCart = useAddToCart();

  const products = data?.items ?? [];
  const isLoadingAny = categoriesLoading || isLoading;

  return (
    <div className="py-16 sm:py-24" style={{ background: brandColors.cream }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="Category"
          title={category?.name ?? "Category"}
          description={category?.description}
        />

        <div className="mt-12">
          <QueryStateBoundary
            isLoading={isLoadingAny}
            error={error}
            isEmpty={!isLoadingAny && (!category || products.length === 0)}
            emptyState={
              <EmptyState
                title="No products in this category"
                description="Check back soon, or browse the full shop."
              />
            }
            onRetry={refetch}
          >
            <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
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
  );
};
