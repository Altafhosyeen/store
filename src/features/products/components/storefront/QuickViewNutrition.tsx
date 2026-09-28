import type { ProductDto } from "../../types/products-api.types";
import {
  BestForTags,
  NUTRITION_DISCLAIMER,
  NutrientCard,
  ServingDetails,
} from "../home/nutrition/NutritionParts";
import { getNutritionProfile } from "../home/nutrition/nutrition-profiles";

/** The compact "Why …?" nutrition story shown under the quick view's product details. */
export const QuickViewNutrition = ({ product }: { product: ProductDto }) => {
  const profile = getNutritionProfile(product);
  return (
    <div className="border-t border-sand bg-ivory/60 p-6 sm:p-8 md:col-span-2">
      <div className="mb-5 text-center">
        <p className="kicker text-[10px] font-semibold uppercase text-golddk">
          The Nutrition Story
        </p>
        <h4 className="mt-1 font-display text-xl font-bold uppercase tracking-wide text-walnutdk sm:text-2xl">
          Why {profile.label}?
        </h4>
        <p className="mt-1 text-[13.5px] font-light italic text-cocoa">
          &quot;{profile.tagline}&quot;
        </p>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-2.5 sm:grid-cols-4">
        {profile.nutrients.map((nutrient, index) => (
          <NutrientCard key={nutrient.name} nutrient={nutrient} index={index} compact />
        ))}
      </div>
      <p className="mt-2.5 text-center text-[11px] font-semibold uppercase tracking-[.14em] text-cocoa/55">
        {profile.basis}
      </p>
      <div className="mx-auto mt-4 grid max-w-2xl gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-sand bg-white/85 p-4">
          <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[.18em] text-golddk">
            Typical Serving
          </p>
          <ServingDetails profile={profile} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex-1 rounded-xl bg-walnutdk p-4 text-ivory">
            <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[.18em] text-gold">
              <i className="fa-regular fa-lightbulb mr-1" />
              Did You Know?
            </p>
            <p className="text-[12.5px] font-light leading-relaxed text-ivory/90">
              {profile.didYouKnow}
            </p>
          </div>
          <div className="flex-1 rounded-xl border border-gold/35 bg-gold/10 p-4">
            <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[.18em] text-golddk">
              <span aria-hidden="true">👑</span> Royal Tip
            </p>
            <p className="text-[12.5px] font-light leading-relaxed text-walnut">
              &quot;{profile.tip}&quot;
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-2xl">
        <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[.18em] text-golddk">
          Best For
        </p>
        <div className="flex flex-wrap gap-2">
          <BestForTags profile={profile} compact />
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-lg text-center text-[10.5px] text-cocoa/50">
        {NUTRITION_DISCLAIMER}
      </p>
    </div>
  );
};
