import { SectionHeading } from "@/components";
import { HOME_SECTION_IDS } from "@/constants";
import { brandColors } from "@/theme";
import { PRODUCT_STATUS } from "../../constants/products.constants";
import { useGetProducts } from "../../hooks/use-products";
import { ProductCard } from "../ProductCard";

export const RoyalCollectionSection = () => {
  const { data } = useGetProducts({
    page: 1,
    pageSize: 8,
    status: PRODUCT_STATUS.PUBLISHED,
    royal: true,
  });

  return (
    <section
      id={HOME_SECTION_IDS.royal}
      className="relative overflow-hidden bg-charcoal py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[.05]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${brandColors.gold} 1.5px, transparent 0)`,
          backgroundSize: "34px 34px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="Reserved For The Finest"
          title="The Royal Collection"
          description="Rare varieties and top grades — Mamra almonds, Pakistani chilgoza, pistachio kernels and hand-picked Ajwa dates for those who accept nothing less."
          icon="crown"
          tone="dark"
          className="mb-12"
        />
        <div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
          {data?.items.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
