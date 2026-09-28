import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HOME_SECTION_IDS } from "@/constants";
import { brandColors } from "@/theme";
import { buildShopLink } from "../../utils/shop-link";

const DEALS = [
  {
    icon: "percent",
    title: "10% OFF Premium Almonds",
    body: "Applied on American & roasted almonds — already reflected in sale prices.",
    cta: "Shop Almonds",
    to: buildShopLink({ search: "almond" }),
  },
  {
    icon: "bowl-food",
    title: "15% OFF Mixed Dry Fruits",
    body: "Royal Mix & Family Mix at their best price of the season.",
    cta: "Shop Mixes",
    to: buildShopLink({ search: "mix" }),
  },
  {
    icon: "gift",
    title: "Buy 500g Cashews → Get 100g Raisins",
    body: "Complimentary golden raisins packed with every 500g cashew order.",
    cta: "Shop Cashews",
    to: buildShopLink({ search: "kaju" }),
  },
  {
    icon: "truck-fast",
    title: "Free Delivery Above Rs. 3,000",
    body: "Automatically applied at checkout on qualifying orders nationwide.",
    cta: "Start Shopping",
    to: buildShopLink(),
  },
];

const REVEAL_DELAYS = ["", "reveal-d1", "reveal-d2", "reveal-d3"];

/** Seconds until local midnight — the deals timer restarts daily, as in the reference. */
const secondsToMidnight = (): number => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
};

const useCountdown = () => {
  const [remaining, setRemaining] = useState(secondsToMidnight);
  useEffect(() => {
    const timer = setInterval(() => setRemaining(secondsToMidnight()), 1000);
    return () => clearInterval(timer);
  }, []);
  const pad = (value: number) => String(value).padStart(2, "0");
  return {
    hours: pad(Math.floor(remaining / 3600)),
    minutes: pad(Math.floor((remaining % 3600) / 60)),
    seconds: pad(remaining % 60),
  };
};

const TimeBox = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="w-[70px] rounded-xl border border-gold/25 bg-charcoal py-3.5 font-display text-3xl font-bold text-gold">
      {value}
    </div>
    <p className="mt-2 text-[11px] uppercase tracking-[.2em] text-ivory/60">{label}</p>
  </div>
);

const Colon = () => <div className="pt-3 font-display text-3xl text-gold/60">:</div>;

export const DealsSection = () => {
  const { hours, minutes, seconds } = useCountdown();

  return (
    <section
      id={HOME_SECTION_IDS.deals}
      className="relative overflow-hidden bg-walnutdk py-16 sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg,${brandColors.gold} 0 2px,transparent 2px 26px),repeating-linear-gradient(-45deg,${brandColors.gold} 0 2px,transparent 2px 26px)`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="reveal lg:w-2/5">
            <p className="kicker text-[11px] font-semibold uppercase text-gold">
              <i className="fa-solid fa-bolt mr-2" />
              Limited-Time Offers
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-5xl">
              Today&apos;s Royal Deals
            </h2>
            <p className="mt-4 font-light text-ivory/70">
              Fresh-batch savings on our most-loved products. Deals refresh regularly — grab yours
              before the timer runs out.
            </p>
            <div className="mt-7 flex gap-3" role="timer" aria-label="Deal countdown timer">
              <TimeBox value={hours} label="Hours" />
              <Colon />
              <TimeBox value={minutes} label="Minutes" />
              <Colon />
              <TimeBox value={seconds} label="Seconds" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:w-3/5">
            {DEALS.map((deal, index) => (
              <div
                key={deal.title}
                className={`reveal flex items-start gap-4 rounded-2xl border border-gold/15 bg-charcoal/70 p-5 transition-colors hover:border-gold/40 ${REVEAL_DELAYS[index]}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <i className={`fa-solid fa-${deal.icon}`} />
                </span>
                <div>
                  <p className="font-semibold text-cream">{deal.title}</p>
                  <p className="mt-1 text-[13px] font-light text-ivory/60">{deal.body}</p>
                  <Link
                    to={deal.to}
                    className="mt-2 inline-block text-[13px] font-semibold text-gold hover:underline"
                  >
                    {deal.cta} <i className="fa-solid fa-arrow-right-long ml-1 text-[11px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
