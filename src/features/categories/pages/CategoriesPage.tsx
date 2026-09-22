import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { EmptyState, ProductImage, QueryStateBoundary, SectionHeading } from "@/components";
import { buildRoute, ROUTES } from "@/constants";
import { brandColors, brandFontFamily } from "@/theme";
import { useGetCategoriesAdmin } from "../hooks/use-categories-admin";

/** Public storefront category grid. */
export const CategoriesPage = () => {
  const { data, isLoading, error, refetch } = useGetCategoriesAdmin({ page: 1, pageSize: 50 });
  const categories = data?.items ?? [];

  return (
    <div className="py-16 sm:py-24" style={{ background: brandColors.cream }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker="Curated With Care" title="Shop by Category" />

        <div className="mt-12">
          <QueryStateBoundary
            isLoading={isLoading}
            error={error}
            isEmpty={categories.length === 0}
            emptyState={<EmptyState title="No categories yet" />}
            onRetry={refetch}
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={buildRoute(ROUTES.CATEGORY_DETAIL, { categorySlug: category.slug })}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
                  style={{ boxShadow: "0 6px 24px -8px rgba(51,34,15,.15)" }}
                >
                  <ProductImage
                    src={category.imageUrl}
                    alt={category.name}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(30,21,13,.85), rgba(30,21,13,.2) 60%, transparent)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p
                      className="text-xl font-bold sm:text-2xl"
                      style={{ fontFamily: brandFontFamily.display, color: brandColors.cream }}
                    >
                      {category.name}
                    </p>
                    <p className="mt-1 text-[12px]" style={{ color: "rgba(243,236,221,.8)" }}>
                      {category.productCount} product{category.productCount === 1 ? "" : "s"}
                    </p>
                    <p
                      className="mt-2 text-[12px] font-semibold opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ color: brandColors.gold }}
                    >
                      Explore <ArrowRightOutlined className="ml-1" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </QueryStateBoundary>
        </div>
      </div>
    </div>
  );
};
