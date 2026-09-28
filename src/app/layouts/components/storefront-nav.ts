import { HOME_SECTION_IDS, ROUTES } from "@/constants";

export interface StorefrontNavLink {
  label: string;
  to: string;
  /** Font Awesome icon (without `fa-`) used in the mobile menu. */
  icon: string;
}

const section = (id: string): string => `${ROUTES.HOME}#${id}`;

/** The storefront's primary navigation — every entry is an in-page section of the home page. */
export const STOREFRONT_NAV: StorefrontNavLink[] = [
  { label: "Home", to: section(HOME_SECTION_IDS.home), icon: "house" },
  { label: "Shop", to: section(HOME_SECTION_IDS.shop), icon: "store" },
  { label: "Categories", to: section(HOME_SECTION_IDS.categories), icon: "layer-group" },
  { label: "Best Sellers", to: section(HOME_SECTION_IDS.bestSellers), icon: "fire" },
  { label: "Gift Boxes", to: section(HOME_SECTION_IDS.giftBoxes), icon: "gift" },
  { label: "Build Your Box", to: section(HOME_SECTION_IDS.buildYourBox), icon: "boxes-packing" },
  { label: "About Us", to: section(HOME_SECTION_IDS.about), icon: "leaf" },
  { label: "Contact", to: section(HOME_SECTION_IDS.contact), icon: "envelope" },
];

export const FOOTER_SHOP_LINKS = [
  { label: "All Products", to: section(HOME_SECTION_IDS.shop) },
  { label: "Categories", to: section(HOME_SECTION_IDS.categories) },
  { label: "Best Sellers", to: section(HOME_SECTION_IDS.bestSellers) },
  { label: "Gift Boxes", to: section(HOME_SECTION_IDS.giftBoxes) },
  { label: "Build Your Box", to: section(HOME_SECTION_IDS.buildYourBox) },
  { label: "Royal Deals", to: section(HOME_SECTION_IDS.deals) },
];

export const FOOTER_COMPANY_LINKS = [
  { label: "About Us", to: section(HOME_SECTION_IDS.about) },
  { label: "Contact", to: section(HOME_SECTION_IDS.contact) },
  { label: "FAQ", to: section(HOME_SECTION_IDS.faq) },
  { label: "Customer Reviews", to: section(HOME_SECTION_IDS.reviews) },
  { label: "Delivery Information", to: section(HOME_SECTION_IDS.delivery) },
];
