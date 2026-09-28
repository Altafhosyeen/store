import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { STORE_IMAGES } from "@/assets/images";
import { HOME_SECTION_IDS, ROUTES } from "@/constants";
import { brandColors } from "@/theme";
import { buildShopLink } from "../../utils/shop-link";

const COUNT_MS = 1200;

/** Counts up from 0 with an ease-out once scrolled into view, like the reference stats strip. */
const CountUp = ({ target }: { target: number }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / COUNT_MS);
          setValue(Math.round(target * (1 - (1 - progress) ** 3)));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return <span ref={ref}>{value}</span>;
};

const STATS = [
  { prefix: "", target: 50, suffix: "+", label: "Premium Products" },
  { prefix: "", target: 9, suffix: "+", label: "Cities Served" },
  { prefix: "4.", target: 8, suffix: "", label: "Average Rating" },
  { prefix: "", target: 7, suffix: "", label: "Gift Collections" },
];

const STAT_DELAYS = ["", "reveal-d1", "reveal-d2", "reveal-d3"];

const Particles = () => (
  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
    <svg className="float-a absolute left-[8%] top-[18%] h-8 w-8 opacity-50" viewBox="0 0 40 40">
      <ellipse cx="20" cy="20" rx="10" ry="14" fill={brandColors.gold} />
      <path d="M20 8c-4 5-4 19 0 24 4-5 4-19 0-24z" fill={brandColors.almondSkin} />
    </svg>
    <svg className="float-b absolute left-[16%] top-[60%] h-6 w-6 opacity-40" viewBox="0 0 40 40">
      <path d="M20 4C10 12 8 26 20 36 32 26 30 12 20 4z" fill={brandColors.leaf} />
      <path d="M20 8v24" stroke={brandColors.leafDark} strokeWidth="1.6" />
    </svg>
    <svg
      className="float-c absolute right-[12%] top-[26%] hidden h-7 w-7 opacity-40 md:block"
      viewBox="0 0 40 40"
    >
      <circle cx="20" cy="20" r="12" fill={brandColors.hazelnut} />
      <path d="M12 20c3-4 13-4 16 0-3 4-13 4-16 0z" fill={brandColors.hazelnutDark} />
    </svg>
    <svg
      className="float-b absolute bottom-[22%] right-[22%] hidden h-5 w-5 opacity-40 md:block"
      viewBox="0 0 40 40"
    >
      <ellipse cx="20" cy="20" rx="9" ry="13" fill={brandColors.leafLight} />
    </svg>
  </div>
);

export const HeroSection = () => (
  <section
    id={HOME_SECTION_IDS.home}
    className="relative overflow-hidden bg-charcoal"
    aria-label="Hero"
  >
    <div className="absolute inset-0">
      <img
        src={STORE_IMAGES.hero}
        alt="Premium Pakistani dry fruits — dates, figs, walnuts and raisins in brass bowls"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/40" />
    </div>
    <Particles />

    <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      <div className="max-w-2xl">
        <p className="kicker reveal mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase text-gold sm:text-xs">
          <span className="inline-block h-px w-8 bg-gold" /> Premium Pakistani Dry Fruits
        </p>
        <h1 className="reveal reveal-d1 font-display text-[42px] font-bold leading-[1.08] text-cream sm:text-6xl lg:text-7xl">
          The Royal Taste
          <br />
          of{" "}
          <em className="relative not-italic text-gold">
            Nature
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="8"
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 6C60 1 140 1 198 6"
                stroke={brandColors.gold}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                opacity=".7"
              />
            </svg>
          </em>
        </h1>
        <p className="reveal reveal-d2 mt-6 max-w-lg text-base font-light leading-relaxed text-ivory/85 sm:text-lg">
          Premium dry fruits, carefully selected and delivered fresh across Pakistan.
        </p>
        <div className="reveal reveal-d3 mt-9 flex flex-wrap items-center gap-4">
          <Link
            to={buildShopLink()}
            className="btn-gold btn-press rounded-full px-8 py-3.5 text-[15px] font-semibold text-white shadow-lift"
          >
            <i className="fa-solid fa-basket-shopping mr-2" />
            Shop Dry Fruits
          </Link>
          <Link
            to={`${ROUTES.HOME}#${HOME_SECTION_IDS.giftBoxes}`}
            className="btn-press rounded-full border border-ivory/40 px-8 py-3.5 text-[15px] font-medium text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
          >
            Explore Gift Boxes <i className="fa-solid fa-arrow-right ml-2 text-[13px]" />
          </Link>
        </div>
        <p className="reveal reveal-d3 mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] tracking-wide text-ivory/70 sm:text-[13px]">
          <i className="fa-solid fa-seedling text-leaf" /> 100% Fresh Selection
          <span className="mx-1 text-gold">•</span> Premium Quality
          <span className="mx-1 text-gold">•</span> Nationwide Delivery
        </p>
      </div>
    </div>

    <div className="glass-dark relative border-t border-ivory/10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 text-center sm:grid-cols-4 sm:px-6">
        {STATS.map((stat, index) => (
          <div key={stat.label} className={`reveal ${STAT_DELAYS[index]}`}>
            <p className="font-display text-2xl font-bold text-gold sm:text-3xl">
              {stat.prefix}
              <CountUp target={stat.target} />
              {stat.suffix}
            </p>
            <p className="mt-0.5 text-[12px] uppercase tracking-wider text-ivory/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
