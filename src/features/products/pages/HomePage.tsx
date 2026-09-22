import { ArrowRightOutlined, ShopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ProductImage, SectionHeading } from "@/components";
import { buildRoute, ROUTES } from "@/constants";
import { useGetCategoriesAdmin } from "@/features/categories";
import { brandColors, brandFontFamily } from "@/theme";
import { AboutSection } from "../components/home/AboutSection";
import { BestSellersSection } from "../components/home/BestSellersSection";
import { BuildYourBoxSection } from "../components/home/BuildYourBoxSection";
import { ContactSection } from "../components/home/ContactSection";
import { DeliverySection } from "../components/home/DeliverySection";
import { FaqSection } from "../components/home/FaqSection";
import { GiftCollectionSection } from "../components/home/GiftCollectionSection";
import { HealthSection } from "../components/home/HealthSection";
import { ReviewsSection } from "../components/home/ReviewsSection";
import { RoyalCollectionSection } from "../components/home/RoyalCollectionSection";
import { TrustSection } from "../components/home/TrustSection";
import { ProductCard } from "../components/ProductCard";
import { PRODUCT_STATUS } from "../constants/products.constants";
import { useAddToCart } from "../hooks/use-add-to-cart";
import { useGetProducts } from "../hooks/use-products";

const HERO_STATS: Array<{ value: string; label: string }> = [
  { value: "50+", label: "Premium Products" },
  { value: "9+", label: "Cities Served" },
  { value: "100%", label: "Fresh Selection" },
  { value: "7", label: "Gift Collections" },
];

/** The storefront landing page: hero, category showcase, featured products. */
export const HomePage = () => {
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesAdmin({
    page: 1,
    pageSize: 4,
  });
  const { data: productsData, isLoading: productsLoading } = useGetProducts({
    page: 1,
    pageSize: 8,
    status: PRODUCT_STATUS.PUBLISHED,
  });
  const addToCart = useAddToCart();

  const categories = categoriesData?.items ?? [];
  const products = productsData?.items ?? [];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: brandColors.charcoal }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(30,21,13,.95), rgba(30,21,13,.7) 60%, rgba(30,21,13,.3))",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p
              className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.3em] sm:text-xs"
              style={{ color: brandColors.gold }}
            >
              <span className="inline-block h-px w-8" style={{ background: brandColors.gold }} />
              Premium Pakistani Dry Fruits
            </p>
            <h1
              className="text-[42px] font-bold leading-[1.08] sm:text-6xl lg:text-7xl"
              style={{ fontFamily: brandFontFamily.display, color: brandColors.cream }}
            >
              The Royal Taste
              <br />
              of{" "}
              <em className="not-italic" style={{ color: brandColors.gold }}>
                Nature
              </em>
            </h1>
            <p
              className="mt-6 max-w-lg text-base font-light leading-relaxed sm:text-lg"
              style={{ color: "rgba(243,236,221,.85)" }}
            >
              Premium dry fruits, carefully selected and delivered fresh across Pakistan.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to={ROUTES.SHOP}
                className="rounded-full px-8 py-3.5 text-[15px] font-semibold text-white"
                style={{
                  background: brandColors.walnutDark,
                  boxShadow: "0 24px 48px -16px rgba(51,34,15,.28)",
                }}
              >
                <ShopOutlined className="mr-2" />
                Shop Dry Fruits
              </Link>
              <Link
                to={ROUTES.CATEGORIES}
                className="rounded-full border px-8 py-3.5 text-[15px] font-medium transition-colors hover:opacity-80"
                style={{ borderColor: "rgba(243,236,221,.4)", color: brandColors.ivory }}
              >
                Explore Categories <ArrowRightOutlined className="ml-2 text-[13px]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t" style={{ borderColor: "rgba(243,236,221,.1)" }}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 text-center sm:grid-cols-4 sm:px-6">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl font-bold sm:text-3xl"
                  style={{ fontFamily: brandFontFamily.display, color: brandColors.gold }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-0.5 text-[12px] uppercase tracking-wider"
                  style={{ color: "rgba(243,236,221,.7)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-24" style={{ background: brandColors.cream }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            kicker="Curated With Care"
            title="Shop by Category"
            description="From the orchards of Hunza to the date farms of Khairpur — explore our full range of nuts, dried fruits, seeds and royal collections."
          />

          {!categoriesLoading && categories.length > 0 ? (
            <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
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
          ) : null}
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16 sm:py-24" style={{ background: brandColors.ivory }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading kicker="Hand Picked" title="Featured Products" />

          {!productsLoading && products.length > 0 ? (
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

          <div className="mt-10 text-center">
            <Link
              to={ROUTES.SHOP}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-[14.5px] font-semibold text-white"
              style={{ background: brandColors.walnutDark }}
            >
              View All Products <ArrowRightOutlined />
            </Link>
          </div>
        </div>
      </section>

      <BestSellersSection />
      <RoyalCollectionSection />
      <BuildYourBoxSection />
      <GiftCollectionSection />
      <HealthSection />
      <ReviewsSection />
      <TrustSection />
      <AboutSection />
      <DeliverySection />
      <FaqSection />
      <ContactSection />
    </div>
  );
};
