import { SectionHeading } from "@/components";
import { brandColors } from "@/theme";
import { PRODUCT_STATUS } from "../../constants/products.constants";
import { useAddToCart } from "../../hooks/use-add-to-cart";
import { useGetProducts } from "../../hooks/use-products";
import { ProductCard } from "../ProductCard";

/** Best Seller products, driven by the mock-derived isBestSeller flag on ProductDto. */
export const BestSellersSection = () => {
  const { data, isLoading } = useGetProducts({
    page: 1,
    pageSize: 50,
    status: PRODUCT_STATUS.PUBLISHED,
  });
  const addToCart = useAddToCart();

  const bestSellers = (data?.items ?? []).filter((p) => p.isBestSeller).slice(0, 8);

  if (!isLoading && bestSellers.length === 0) return null;

  return (
    <section className="py-16 sm:py-24" style={{ background: brandColors.ivory }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker="Customer Favourites" title="Best Sellers" />

        {bestSellers.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};
