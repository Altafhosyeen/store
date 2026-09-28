import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogoMark } from "@/components";
import { APP_NAME, ROUTES } from "@/constants";
import { useAuthStore, useCartStore, useUiStore, useWishlistStore } from "@/store";
import { STOREFRONT_NAV } from "./storefront-nav";

const ICON_SHAPE =
  "relative h-10 w-10 items-center justify-center rounded-full text-walnut transition-colors hover:bg-sand/60 btn-press";
/** Plain buttons centre their icon by text alignment, exactly as the reference does. */
const ICON_BUTTON = `text-center ${ICON_SHAPE}`;

const CountBadge = ({ count, tone }: { count: number; tone: "gold" | "dark" }) =>
  count > 0 ? (
    <span
      className={`badge-pop absolute -right-0.5 -top-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10.5px] font-semibold ${tone === "gold" ? "bg-golddk text-white" : "bg-walnutdk text-ivory"}`}
    >
      {count}
    </span>
  ) : null;

/** Announcement bar + sticky glass navbar, as in the reference storefront. */
export const StorefrontHeader = () => {
  const cartCount = useCartStore((state) => state.lines.reduce((sum, l) => sum + l.quantity, 0));
  const wishCount = useWishlistStore((state) => state.items.length);
  const user = useAuthStore((state) => state.user);
  const openOverlay = useUiStore((state) => state.openOverlay);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="relative z-[60] overflow-hidden bg-charcoal text-[12.5px] tracking-wide text-ivory sm:text-[13px]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center">
          <span className="truncate">
            🇵🇰 Premium Dry Fruits • Freshly Packed • Delivery Across Pakistan — Free Delivery on
            Orders Above Rs. 3,000
          </span>
        </div>
      </div>

      <header
        className="glass sticky top-0 z-50 border-b border-sand/70 transition-shadow duration-300"
        style={{ boxShadow: scrolled ? "0 8px 30px -12px rgba(51,34,15,.25)" : "none" }}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6" aria-label="Main navigation">
          <div className="flex h-[68px] items-center justify-between sm:h-[76px]">
            <Link
              to={ROUTES.HOME}
              className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
              aria-label={`${APP_NAME} home`}
            >
              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-walnutdk shadow-card transition-shadow group-hover:shadow-lift sm:h-11 sm:w-11">
                <LogoMark withJewels />
              </span>
              <span className="leading-none">
                <span className="block font-display text-lg font-bold tracking-[.14em] text-walnutdk sm:text-xl">
                  ROYAL NUTS
                </span>
                <span className="mt-1 hidden text-[10px] font-medium tracking-[.28em] text-golddk sm:block">
                  NATURE&apos;S FINEST
                </span>
              </span>
            </Link>

            <ul className="hidden items-center gap-6 text-[14.5px] font-medium text-walnut lg:flex xl:gap-8">
              {STOREFRONT_NAV.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition-colors hover:text-golddk">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => openOverlay("search")}
                className={ICON_BUTTON}
                aria-label="Search products"
              >
                <i className="fa-solid fa-magnifying-glass" />
              </button>
              <button
                type="button"
                onClick={() => openOverlay("wishlist")}
                className={ICON_BUTTON}
                aria-label="Open wishlist"
              >
                <i className="fa-regular fa-heart" />
                <CountBadge count={wishCount} tone="gold" />
              </button>
              <button
                type="button"
                onClick={() => openOverlay("cart")}
                className={ICON_BUTTON}
                aria-label="Open cart"
              >
                <i className="fa-solid fa-bag-shopping" />
                <CountBadge count={cartCount} tone="dark" />
              </button>
              <Link
                to={user ? ROUTES.ACCOUNT : ROUTES.LOGIN}
                className={`hidden sm:inline-flex ${ICON_SHAPE}`}
                aria-label="Account"
              >
                <i className="fa-regular fa-user" />
              </Link>
              <button
                type="button"
                onClick={() => openOverlay("menu")}
                className={`text-center lg:hidden ${ICON_SHAPE}`}
                aria-label="Open menu"
              >
                <i className="fa-solid fa-bars-staggered" />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
