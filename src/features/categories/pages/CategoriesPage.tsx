import { Card } from "antd";
import { Link } from "react-router-dom";
import { EmptyState, PageHeader, QueryStateBoundary } from "@/components";
import { BodyLarge } from "@/components/common/Text";
import { buildRoute, ROUTES } from "@/constants";
import { useGetCategoriesAdmin } from "../hooks/use-categories-admin";

/** Public storefront category grid. */
export const CategoriesPage = () => {
  const { data, isLoading, error, refetch } = useGetCategoriesAdmin({ page: 1, pageSize: 50 });
  const categories = data?.items ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
      <PageHeader title="Shop by category" />

      <QueryStateBoundary
        isLoading={isLoading}
        error={error}
        isEmpty={categories.length === 0}
        emptyState={<EmptyState title="No categories yet" />}
        onRetry={refetch}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={buildRoute(ROUTES.CATEGORY_DETAIL, { categorySlug: category.slug })}
            >
              <Card
                hoverable
                cover={
                  category.imageUrl ? (
                    <img src={category.imageUrl} alt={category.name} />
                  ) : undefined
                }
              >
                <BodyLarge strong>{category.name}</BodyLarge>
              </Card>
            </Link>
          ))}
        </div>
      </QueryStateBoundary>
    </div>
  );
};
