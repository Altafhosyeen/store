import { AboutSection } from "../components/home/AboutSection";
import { BestSellersSection } from "../components/home/BestSellersSection";
import { BuildYourBoxSection } from "../components/home/BuildYourBoxSection";
import { CategoriesSection } from "../components/home/CategoriesSection";
import { ContactSection } from "../components/home/ContactSection";
import { DealsSection } from "../components/home/DealsSection";
import { DeliverySection } from "../components/home/DeliverySection";
import { FaqSection } from "../components/home/FaqSection";
import { GiftCollectionSection } from "../components/home/GiftCollectionSection";
import { HealthSection } from "../components/home/HealthSection";
import { HeroSection } from "../components/home/HeroSection";
import { NutritionSection } from "../components/home/nutrition/NutritionSection";
import { ReviewsSection } from "../components/home/ReviewsSection";
import { RoyalCollectionSection } from "../components/home/RoyalCollectionSection";
import { ShopSection } from "../components/home/ShopSection";
import { TrustSection } from "../components/home/TrustSection";

/** The storefront landing page — every section of the Royal Nuts storefront, in order. */
export const HomePage = () => (
  <>
    <HeroSection />
    <CategoriesSection />
    <BestSellersSection />
    <DealsSection />
    <ShopSection />
    <RoyalCollectionSection />
    <BuildYourBoxSection />
    <GiftCollectionSection />
    <HealthSection />
    <NutritionSection />
    <ReviewsSection />
    <TrustSection />
    <AboutSection />
    <DeliverySection />
    <FaqSection />
    <ContactSection />
  </>
);
