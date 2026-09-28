import { STORE_IMAGES } from "@/assets/images";
import { HOME_SECTION_IDS } from "@/constants";
import { useCategories } from "@/hooks";
import { PRODUCT_STATUS } from "../../constants/products.constants";
import { useGetProducts } from "../../hooks/use-products";
import { ProductCard } from "../ProductCard";

const GIFT_CATEGORY_SLUG = "gift-boxes";
const GIFT_GRID_ID = "gift-grid";

const PERKS = ["Personal message card", "Premium wooden boxes", "Bulk & corporate orders"];

export const GiftCollectionSection = () => {
  const { data: categories = [] } = useCategories({ enabled: true });
  const giftCategoryId = categories.find((c) => c.slug === GIFT_CATEGORY_SLUG)?.id;
  const { data } = useGetProducts({
    page: 1,
    pageSize: 12,
    status: PRODUCT_STATUS.PUBLISHED,
    categoryId: giftCategoryId,
  });
  const gifts = giftCategoryId ? (data?.items ?? []) : [];

  return (
    <section
      id={HOME_SECTION_IDS.giftBoxes}
      className="paper-texture relative overflow-hidden py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 grid items-center gap-10 lg:grid-cols-2">
          <div className="reveal">
            <p className="kicker text-[11px] font-semibold uppercase text-golddk">
              <i className="fa-solid fa-gift mr-2" />
              The Art of Giving
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-walnutdk sm:text-5xl">
              Gifts That Taste
              <br />
              Like <span className="text-golddk">Royalty</span>
            </h2>
            <p className="mt-5 max-w-lg font-light leading-relaxed text-cocoa">
              From wedding dais to corporate desks, a Royal Nuts gift box speaks the language of
              tradition and taste. Every box is hand-packed with a personal message card, elegant
              lining and our signature gold ribbon.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-[13.5px] text-walnut">
              {PERKS.map((perk) => (
                <span key={perk} className="flex items-center gap-2">
                  <i className="fa-solid fa-circle-check text-leaf" />
                  {perk}
                </span>
              ))}
            </div>
            <a
              href={`#${GIFT_GRID_ID}`}
              className="btn-dark btn-press mt-8 inline-block rounded-full bg-walnutdk px-8 py-3.5 text-[15px] font-semibold text-ivory"
            >
              Explore Gift Collection <i className="fa-solid fa-arrow-down ml-2 text-[13px]" />
            </a>
          </div>
          <div className="reveal reveal-d1 relative">
            <div className="aspect-[5/4] overflow-hidden rounded-3xl shadow-lift">
              <img
                src={STORE_IMAGES.giftbox}
                alt="Royal Nuts wooden gift box with gold ribbon"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="glass absolute -bottom-5 -left-4 rounded-2xl border border-sand px-5 py-4 shadow-lift sm:-left-6">
              <p className="text-[12px] font-semibold uppercase tracking-[.18em] text-golddk">
                Signature Touch
              </p>
              <p className="font-display font-bold text-walnutdk">
                Hand-tied gold ribbon
                <br />
                on every gift box
              </p>
            </div>
          </div>
        </div>
        <div
          id={GIFT_GRID_ID}
          className="grid scroll-mt-28 grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 xl:grid-cols-4"
        >
          {gifts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
