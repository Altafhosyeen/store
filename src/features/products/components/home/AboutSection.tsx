import { ProductImage } from "@/components";
import { brandColors, brandFontFamily } from "@/theme";

const STATS = [
  { value: "Seasonal", label: "Sourcing" },
  { value: "Graded", label: "Quality" },
  { value: "Honest", label: "Pricing" },
];

/** Short brand story with a supporting image and three value pillars. */
export const AboutSection = () => (
  <section className="py-16 sm:py-24" style={{ background: brandColors.ivory }}>
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
      <div
        className="order-2 overflow-hidden rounded-3xl lg:order-1"
        style={{ boxShadow: "0 24px 48px -16px rgba(51,34,15,.28)" }}
      >
        <ProductImage
          src="https://images.unsplash.com/photo-1596591868231-05e808fd126f?w=900"
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
          Quality You Can Taste
        </h2>
        <div
          className="mt-5 space-y-4 font-light leading-relaxed"
          style={{ color: brandColors.cocoa }}
        >
          <p>
            We started with a simple idea: source the best nuts, seeds and dried fruit we could
            find, grade them honestly, and pack every order like it&apos;s going to our own home.
          </p>
          <p>
            Whether it&apos;s a weeknight snack, a gift for someone you love, or a hamper for a
            hundred guests — the care that goes into it never changes.
          </p>
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
