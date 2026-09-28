import { useEffect, useMemo, useRef, useState } from "react";
import { SectionHeading } from "@/components";
import { HOME_SECTION_IDS } from "@/constants";
import { useUiStore } from "@/store";
import { brandColors } from "@/theme";
import { PRODUCT_STATUS } from "../../../constants/products.constants";
import { useProductActions } from "../../../hooks/use-product-actions";
import { useGetProducts } from "../../../hooks/use-products";
import type { ProductDto } from "../../../types/products-api.types";
import { getDefaultVariant } from "../../../utils/product-display";
import { BestForTags, NUTRITION_DISCLAIMER, NutrientCard, ServingDetails } from "./NutritionParts";
import { getNutritionProfile, NUTRITION_CHIP_PRODUCTS } from "./nutrition-profiles";

const SWAP_MS = 240;

/** Curved gold connectors from the centre photo out to the four nutrient cards (desktop). */
const Connectors = () => (
  <svg
    className="nx-lines pointer-events-none absolute inset-0 h-full w-full"
    viewBox="0 0 880 400"
    fill="none"
    aria-hidden="true"
  >
    {[
      "M300 110 C 350 130, 380 160, 405 185",
      "M580 110 C 530 130, 500 160, 475 185",
      "M300 296 C 350 274, 380 244, 405 219",
      "M580 296 C 530 274, 500 244, 475 219",
    ].map((d) => (
      <path key={d} d={d} stroke={brandColors.gold} strokeWidth="1.4" opacity=".5" />
    ))}
    {[
      [405, 185],
      [475, 185],
      [405, 219],
      [475, 219],
    ].map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill={brandColors.gold} opacity=".6" />
    ))}
  </svg>
);

const Stage = ({ product }: { product: ProductDto }) => {
  const profile = getNutritionProfile(product);
  const openQuickView = useUiStore((state) => state.openQuickView);
  const { addToCart } = useProductActions();
  const [top1, top2, bottom1, bottom2] = profile.nutrients;
  const photo = (sizes: string) => (
    <div
      className={`nx-img-wrap nx-pop overflow-hidden rounded-full border-4 border-white shadow-lift ${sizes}`}
    >
      <img
        src={product.images[0]}
        alt={`${product.name} — ${product.urduName ?? ""}`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  );

  return (
    <>
      <div className="mb-8 text-center">
        <h3 className="nx-pop font-display text-2xl font-bold uppercase tracking-wide text-walnutdk sm:text-4xl">
          Why {profile.label}?
        </h3>
        <p className="nx-pop nx-d1 mt-2 text-[15px] font-light italic text-cocoa sm:text-lg">
          &quot;{profile.tagline}&quot;
        </p>
        <p className="nx-pop nx-d2 mx-auto mt-2.5 max-w-xl text-[13.5px] font-light text-cocoa/80">
          {profile.why}
        </p>
      </div>

      <div className="relative mx-auto hidden max-w-4xl lg:block" style={{ height: 400 }}>
        <Connectors />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {photo("h-56 w-56")}
          <p className="nx-pop nx-d1 mt-3 text-center font-display font-bold text-walnutdk">
            {product.name}
          </p>
        </div>
        <div className="absolute left-8 top-8 w-56">
          <NutrientCard nutrient={top1} index={0} />
        </div>
        <div className="absolute right-8 top-8 w-56">
          <NutrientCard nutrient={top2} index={1} />
        </div>
        <div className="absolute bottom-8 left-8 w-56">
          <NutrientCard nutrient={bottom1} index={2} />
        </div>
        <div className="absolute bottom-8 right-8 w-56">
          <NutrientCard nutrient={bottom2} index={3} />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex flex-col items-center">
          {photo("h-40 w-40 sm:h-48 sm:w-48")}
          <p className="nx-pop nx-d1 mt-3 text-center font-display font-bold text-walnutdk">
            {product.name}
          </p>
        </div>
        <div className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-3">
          {profile.nutrients.map((nutrient, index) => (
            <NutrientCard key={nutrient.name} nutrient={nutrient} index={index} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
        <div className="nx-card nx-pop nx-d1 rounded-2xl border border-sand bg-white/85 p-5 shadow-card sm:p-6">
          <p className="mb-1 font-display text-lg font-bold text-walnutdk">
            <i className="fa-solid fa-chart-simple mr-2 text-golddk" />
            Nutrition Profile
          </p>
          <p className="mb-3 text-[11.5px] font-semibold uppercase tracking-[.14em] text-cocoa/60">
            {profile.basis}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {profile.nutrients.map((nutrient) => (
              <div
                key={nutrient.name}
                className="rounded-xl border border-sand bg-ivory px-3.5 py-2.5"
              >
                <p className="text-[11.5px] font-semibold uppercase tracking-wider text-cocoa/70">
                  {nutrient.name}
                </p>
                <p className="font-display text-[15px] font-bold text-walnutdk">{nutrient.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="nx-card nx-pop nx-d2 flex-1 rounded-2xl border border-sand bg-white/85 p-5 shadow-card sm:p-6">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em] text-golddk">
              Typical Serving
            </p>
            <ServingDetails profile={profile} />
          </div>
          <div className="nx-card nx-pop nx-d3 flex-1 rounded-2xl border border-sand bg-white/85 p-5 shadow-card sm:p-6">
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[.2em] text-golddk">
              Best For
            </p>
            <div className="flex flex-wrap gap-2">
              <BestForTags profile={profile} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 grid max-w-4xl gap-4 sm:mt-5 sm:gap-5 md:grid-cols-2">
        <div className="nx-card nx-pop nx-d2 relative overflow-hidden rounded-2xl bg-walnutdk p-5 text-ivory shadow-card sm:p-6">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em] text-gold">
            <i className="fa-regular fa-lightbulb mr-1.5" />
            Did You Know?
          </p>
          <p className="text-[14.5px] font-light leading-relaxed text-ivory/90">
            {profile.didYouKnow}
          </p>
        </div>
        <div className="nx-card nx-pop nx-d3 rounded-2xl border border-gold/35 bg-gold/10 p-5 shadow-card sm:p-6">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em] text-golddk">
            <span aria-hidden="true">👑</span> Royal Tip
          </p>
          <p className="text-[14.5px] font-light leading-relaxed text-walnut">
            &quot;{profile.tip}&quot;
          </p>
        </div>
      </div>

      <div className="nx-pop nx-d4 mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => addToCart(product, getDefaultVariant(product))}
          className="btn-gold btn-press rounded-full px-7 py-3 text-[14.5px] font-semibold text-white"
        >
          <i className="fa-solid fa-bag-shopping mr-2" />
          Add {profile.label} to Cart
        </button>
        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className="btn-press rounded-full border border-walnut/30 px-7 py-3 text-[14.5px] font-medium text-walnut transition-colors hover:border-gold hover:text-golddk"
        >
          <i className="fa-regular fa-eye mr-2" />
          View Product
        </button>
      </div>
    </>
  );
};

/** "Why This Product?" — an interactive nutrition story for a representative set of products. */
export const NutritionSection = () => {
  const { data } = useGetProducts({ page: 1, pageSize: 200, status: PRODUCT_STATUS.PUBLISHED });
  const chipProducts = useMemo(() => {
    const items = data?.items ?? [];
    return NUTRITION_CHIP_PRODUCTS.map((needle) =>
      items.find((p) => p.name.toLowerCase().includes(needle)),
    ).filter((p): p is ProductDto => Boolean(p));
  }, [data]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shownId, setShownId] = useState<string | null>(null);
  const [swapping, setSwapping] = useState(false);
  const swapTimer = useRef<ReturnType<typeof setTimeout>>();
  const activeId = selectedId ?? chipProducts[0]?.id ?? null;

  // Fade the stage out, swap its content, fade back in — as the reference does.
  useEffect(() => {
    if (!activeId || activeId === shownId) return;
    if (!shownId) {
      setShownId(activeId);
      return;
    }
    setSwapping(true);
    swapTimer.current = setTimeout(() => {
      setShownId(activeId);
      setSwapping(false);
    }, SWAP_MS);
    return () => clearTimeout(swapTimer.current);
  }, [activeId, shownId]);

  const shownProduct = chipProducts.find((p) => p.id === shownId);

  return (
    <section
      id={HOME_SECTION_IDS.nutrition}
      className="pk-pattern overflow-hidden bg-ivory py-16 sm:py-24"
      aria-label="Interactive product nutrition experience"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="The Royal Nutrition Story"
          title="Why This Product?"
          description="Every dry fruit has its own nutrition story. Pick a product below — or open any product's Quick View — and discover what makes it special."
          icon="seedling"
          className="mb-8 sm:mb-10"
        />

        <div
          className="no-scrollbar reveal -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mb-10 sm:flex-wrap sm:justify-center sm:px-0"
          role="tablist"
          aria-label="Choose a product to explore its nutrition"
        >
          {chipProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={product.id === activeId}
              onClick={() => setSelectedId(product.id)}
              className={`nx-chip btn-press shrink-0 rounded-full border border-sand bg-white/70 px-4 py-2 text-[13px] font-medium text-cocoa hover:border-gold ${product.id === activeId ? "active" : ""}`}
            >
              {getNutritionProfile(product).label}
            </button>
          ))}
        </div>

        <div className={`nx-swap ${swapping ? "nx-out" : ""}`} aria-live="polite">
          {shownProduct ? <Stage key={shownProduct.id} product={shownProduct} /> : null}
        </div>

        <p className="reveal mx-auto mt-10 max-w-2xl text-center text-[11.5px] text-cocoa/55">
          {NUTRITION_DISCLAIMER}
        </p>
      </div>
    </section>
  );
};
