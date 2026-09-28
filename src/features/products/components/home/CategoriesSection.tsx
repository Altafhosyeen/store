import { Link } from "react-router-dom";
import { STORE_IMAGES } from "@/assets/images";
import { SectionHeading } from "@/components";
import { HOME_SECTION_IDS } from "@/constants";
import { buildShopLink } from "../../utils/shop-link";

const SHOWCASE = [
  {
    title: "Nuts",
    items: "Badam • Kaju • Pista • Akhrot • Chilgoza • Hazelnuts",
    image: STORE_IMAGES.almonds,
    category: "nuts",
  },
  {
    title: "Dried Fruits",
    items: "Khajoor • Anjeer • Kishmish • Khubani • Mango • Prunes",
    image: STORE_IMAGES.figs,
    category: "dried-fruits",
  },
  {
    title: "Seeds & Snacks",
    items: "Pumpkin • Chia • Flax • Magaz • Roasted Chana • Makhana",
    image: STORE_IMAGES.seeds,
    category: "seeds",
  },
  {
    title: "Special Collections",
    items: "Royal Mix • Trail Mix • Gift Boxes • Wedding • Corporate",
    image: STORE_IMAGES.giftbox,
    category: "gift-boxes",
  },
];

const QUICK_SEARCHES = [
  { label: "Almonds / Badam", query: "Badam" },
  { label: "Cashews / Kaju", query: "Kaju" },
  { label: "Pistachios / Pista", query: "Pista" },
  { label: "Walnuts / Akhrot", query: "Akhrot" },
  { label: "Pine Nuts / Chilgoza", query: "Chilgoza" },
  { label: "Dates / Khajoor", query: "Khajoor" },
  { label: "Figs / Anjeer", query: "Anjeer" },
  { label: "Raisins / Kishmish", query: "Kishmish" },
  { label: "Apricots / Khubani", query: "Khubani" },
  { label: "Makhana", query: "Makhana" },
];

const REVEAL_DELAYS = ["", "reveal-d1", "reveal-d2", "reveal-d3"];

export const CategoriesSection = () => (
  <section id={HOME_SECTION_IDS.categories} className="paper-texture py-16 sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading
        kicker="Curated With Care"
        title="Shop by Category"
        description="From the orchards of Hunza to the date farms of Khairpur — explore our full range of nuts, dried fruits, seeds and royal collections."
        className="mb-12 sm:mb-14"
      />

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {SHOWCASE.map((card, index) => (
          <Link
            key={card.title}
            to={buildShopLink({ category: card.category })}
            className={`cat-card reveal group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-card ${REVEAL_DELAYS[index]}`}
          >
            <img
              src={card.image}
              alt={`${card.title} — premium Pakistani dry fruits`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="font-display text-xl font-bold text-cream sm:text-2xl">{card.title}</p>
              <p className="mt-1 text-[12px] leading-snug text-ivory/80">{card.items}</p>
              <p className="mt-2 text-[12px] font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100">
                Explore <i className="fa-solid fa-arrow-right-long ml-1" />
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div
        className="reveal mt-8 flex flex-wrap justify-center gap-2"
        aria-label="Popular sub-categories"
      >
        {QUICK_SEARCHES.map((chip) => (
          <Link
            key={chip.query}
            to={buildShopLink({ search: chip.query })}
            className="btn-press rounded-full border border-sand bg-white/60 px-4 py-1.5 text-[13px] text-cocoa transition-colors hover:border-gold hover:text-golddk"
          >
            {chip.label}
          </Link>
        ))}
      </div>
    </div>
  </section>
);
