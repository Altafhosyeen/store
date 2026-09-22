import { SectionHeading } from "@/components";
import { brandColors } from "@/theme";
import { PRODUCT_STATUS } from "../../constants/products.constants";
import { useAddToCart } from "../../hooks/use-add-to-cart";
import { useGetProducts } from "../../hooks/use-products";
import { ProductCard } from "../ProductCard";

/** A premium showcase of the catalog's top-rated products, on a dark band. */
export const RoyalCollectionSection = () => {
  const { data, isLoading } = useGetProducts({
    page: 1,
    pageSize: 50,
    status: PRODUCT_STATUS.PUBLISHED,
  });
  const addToCart = useAddToCart();

  const royalPicks = (data?.items ?? []).filter((p) => (p.rating ?? 0) >= 4.8).slice(0, 8);

  if (!isLoading && royalPicks.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      style={{ background: brandColors.charcoal }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="Reserved For The Finest"
          title="The Royal Collection"
          description="Rare varieties and top grades, hand-picked for those who accept nothing less."
        />

        {royalPicks.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
            {royalPicks.map((product) => (
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
