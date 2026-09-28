import { ProductImage } from "@/components";
import { HOME_SECTION_IDS } from "@/constants";
import { brandColors, brandFontFamily } from "@/theme";

const STATS = [
  { value: "Seasonal", label: "Sourcing" },
  { value: "Graded", label: "Quality" },
  { value: "Honest", label: "Pricing" },
];

const STORY_PARAGRAPHS = [
  "Anyone who has walked through a traditional Pakistani dry-fruit bazaar knows the feeling — sacks of chilgoza from the northern valleys, trays of glistening khajoor, the shopkeeper offering a handful of badam to taste before you buy.",
  "Royal Nuts brings that experience online. We work with trusted suppliers to source seasonal, quality-graded dry fruits — the same care of the old bazaar, with the convenience of modern e-commerce: transparent pricing, honest grading, secure packing and doorstep delivery.",
  "Whether it's a winter evening bowl of mixed nuts, an Eid gift for family, or a wedding favor for two hundred guests — we pack every order like it's going to our own home.",
];

/** Short brand story with a supporting image and three value pillars. */
export const AboutSection = () => (
  <section
    id={HOME_SECTION_IDS.about}
    className="scroll-mt-20 py-16 sm:py-24"
    style={{ background: brandColors.ivory }}
  >
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
      <div
        className="order-2 overflow-hidden rounded-3xl lg:order-1"
        style={{ boxShadow: "0 24px 48px -16px rgba(51,34,15,.28)" }}
      >
        <ProductImage
          src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=900"
          alt="Assorted dry fruits and nuts"
          className="aspect-[6/5] w-full"
        />
      </div>

      <div className="order-1 lg:order-2">
        <p
          className="text-[11px] font-semibold uppercase tracking-[.3em]"
          style={{ color: brandColors.goldDark }}
        >
          Our Story
        </p>
        <h2
          className="mt-3 text-3xl font-bold sm:text-5xl"
          style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
        >
          From Pakistan&apos;s Traditional Dry-Fruit Culture to Your Home
        </h2>
        <div
          className="mt-5 space-y-4 font-light leading-relaxed"
          style={{ color: brandColors.cocoa }}
        >
          {STORY_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-7 grid max-w-md grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p
                className="text-2xl font-bold"
                style={{ fontFamily: brandFontFamily.display, color: brandColors.goldDark }}
              >
                {stat.value}
              </p>
              <p
                className="mt-0.5 text-[12px] uppercase tracking-wider"
                style={{ color: brandColors.cocoa, opacity: 0.8 }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
