import type { Nutrient, NutritionProfile } from "./nutrition.types";

const POP_DELAYS = ["nx-d1", "nx-d2", "nx-d3", "nx-d4"];

export const NutrientCard = ({
  nutrient,
  index,
  compact = false,
}: {
  nutrient: Nutrient;
  index: number;
  compact?: boolean;
}) => (
  <div
    className={`nx-card nx-pop ${POP_DELAYS[index]} rounded-2xl border border-sand bg-white/85 text-center shadow-card ${compact ? "p-3.5" : "p-4 sm:p-5"}`}
  >
    <span
      className={`nx-ic mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-golddk ${compact ? "text-[15px]" : "text-lg sm:h-12 sm:w-12"}`}
    >
      <i className={`fa-solid fa-${nutrient.icon}`} />
    </span>
    <p
      className={`font-semibold leading-tight text-walnutdk ${compact ? "text-[13px]" : "text-[14.5px]"}`}
    >
      {nutrient.name}
    </p>
    <p
      className={`mt-0.5 font-display font-bold text-golddk ${compact ? "text-[13.5px]" : "text-[15px]"}`}
    >
      {nutrient.value}
    </p>
  </div>
);

export const BestForTags = ({
  profile,
  compact = false,
}: {
  profile: NutritionProfile;
  compact?: boolean;
}) => (
  <>
    {profile.bestFor.map((item) => (
      <span
        key={item.label}
        className={`inline-flex items-center gap-1.5 rounded-full border border-sand bg-white/80 font-medium text-walnut transition-colors hover:border-gold ${compact ? "px-3 py-1.5 text-[12px]" : "px-3.5 py-2 text-[13px]"}`}
      >
        <span aria-hidden="true">{item.emoji}</span>
        {item.label}
      </span>
    ))}
  </>
);

export const ServingDetails = ({ profile }: { profile: NutritionProfile }) => (
  <>
    <p className="text-[14px] font-semibold text-walnutdk">
      <i className="fa-solid fa-hand-holding-heart mr-1.5 text-golddk" />
      Serving size: {profile.serving.size}
    </p>
    {profile.serving.calories ? (
      <p className="mt-0.5 text-[13px] text-cocoa/85">{profile.serving.calories}</p>
    ) : null}
    <p className="mt-1 text-[12.5px] font-light text-cocoa/70">{profile.serving.note}</p>
  </>
);

export const NUTRITION_DISCLAIMER =
  "Nutritional information is provided for general informational purposes. Values can vary by variety, origin, processing and serving size. This information is not medical advice.";
