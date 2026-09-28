import { Link } from "react-router-dom";
import { HOME_SECTION_IDS } from "@/constants";
import { PRODUCT_STATUS } from "../../constants/products.constants";
import { useGetProducts } from "../../hooks/use-products";
import { buildShopLink } from "../../utils/shop-link";
import { ProductCard } from "../ProductCard";

export const BestSellersSection = () => {
  const { data } = useGetProducts({
    page: 1,
    pageSize: 8,
    status: PRODUCT_STATUS.PUBLISHED,
    bestSeller: true,
    sort: "popular",
  });

  return (
    <section id={HOME_SECTION_IDS.bestSellers} className="pk-pattern bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker text-[11px] font-semibold uppercase text-golddk">
              <i className="fa-solid fa-fire mr-2" />
              Most Loved by Our Customers
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-walnutdk sm:text-5xl">
              Pakistan&apos;s Favorite Picks
            </h2>
          </div>
          <Link
            to={buildShopLink()}
            className="shrink-0 text-sm font-semibold text-golddk transition-colors hover:text-walnutdk"
          >
            View All Products <i className="fa-solid fa-arrow-right-long ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
          {data?.items.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
