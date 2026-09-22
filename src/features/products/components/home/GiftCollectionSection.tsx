import { Link } from "react-router-dom";
import { SectionHeading } from "@/components";
import { buildRoute, ROUTES } from "@/constants";
import { useGetCategoriesAdmin } from "@/features/categories";
import { brandColors } from "@/theme";
import { PRODUCT_STATUS } from "../../constants/products.constants";
import { useAddToCart } from "../../hooks/use-add-to-cart";
import { useGetProducts } from "../../hooks/use-products";
import { ProductCard } from "../ProductCard";

const GIFT_CATEGORY_SLUG = "gift-boxes";

/** Gift box products, filtered to the gift-boxes category when it exists in the catalog. */
export const GiftCollectionSection = () => {
  const { data: categoriesData } = useGetCategoriesAdmin({ page: 1, pageSize: 50 });
  const giftCategory = categoriesData?.items.find((c) => c.slug === GIFT_CATEGORY_SLUG);

  const { data, isLoading } = useGetProducts({
    page: 1,
    pageSize: 12,
    categoryId: giftCategory?.id,
    status: PRODUCT_STATUS.PUBLISHED,
  });
  const addToCart = useAddToCart();

  const products = data?.items ?? [];

  if (!isLoading && (!giftCategory || products.length === 0)) return null;

  return (
    <section className="py-16 sm:py-24" style={{ background: brandColors.cream }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="For Someone Special"
          title="Gift Collection"
          description="Hand-packed assortments, ready to gift for any occasion."
        />

        {products.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        ) : null}

        {giftCategory ? (
          <div className="mt-10 text-center">
            <Link
              to={buildRoute(ROUTES.CATEGORY_DETAIL, { categorySlug: giftCategory.slug })}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-[14.5px] font-semibold text-white"
              style={{ background: brandColors.walnutDark }}
            >
              View All Gift Boxes
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
};
