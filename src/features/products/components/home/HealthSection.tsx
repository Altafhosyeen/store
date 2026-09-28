import { SectionHeading } from "@/components";
import { HOME_SECTION_IDS } from "@/constants";

const BENEFITS = [
  { icon: "bolt", title: "Energy", body: "A natural pick-me-up for busy days and study sessions." },
  { icon: "droplet", title: "Healthy Fats", body: "Nuts naturally contain unsaturated fats." },
  { icon: "dumbbell", title: "Protein", body: "A plant-based source of everyday protein." },
  {
    icon: "wheat-awn",
    title: "Fiber",
    body: "Dried fruits like anjeer and prunes contain dietary fiber.",
  },
  {
    icon: "gem",
    title: "Natural Minerals",
    body: "Naturally occurring minerals in every handful.",
  },
  {
    icon: "mug-hot",
    title: "Everyday Snacking",
    body: "A wholesome alternative to processed snacks.",
  },
];

const REVEAL_DELAYS = ["", "reveal-d1", "reveal-d2"];

export const HealthSection = () => (
  <section id={HOME_SECTION_IDS.health} className="bg-ivory py-16 sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading
        kicker="Snack Smarter"
        title="Good Taste. Good Choice."
        description="Dry fruits have been part of Pakistani winters, weddings and everyday hospitality for generations — naturally wholesome, honestly delicious."
        icon="heart-pulse"
        className="mb-12"
      />
      <div className="grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
        {BENEFITS.map((benefit, index) => (
          <div
            key={benefit.title}
            className={`reveal rounded-2xl border border-sand bg-white/80 p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-lift ${REVEAL_DELAYS[index % 3]}`}
          >
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-lg text-golddk">
              <i className={`fa-solid fa-${benefit.icon}`} />
            </span>
            <p className="font-semibold text-walnutdk">{benefit.title}</p>
            <p className="mt-1 text-[12.5px] font-light text-cocoa/75">{benefit.body}</p>
          </div>
        ))}
      </div>
      <p className="reveal mx-auto mt-8 max-w-xl text-center text-[12px] text-cocoa/60">
        Nutritional information is for general informational purposes and is not medical advice.
        Please consult a healthcare professional for dietary guidance.
      </p>
    </div>
  </section>
);
