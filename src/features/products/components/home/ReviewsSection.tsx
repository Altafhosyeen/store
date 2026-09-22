import { Rate } from "antd";
import { SectionHeading } from "@/components";
import { brandColors, brandFontFamily } from "@/theme";

interface Review {
  name: string;
  rating: number;
  text: string;
}

const REVIEWS: Review[] = [
  {
    name: "Amina R.",
    rating: 5,
    text: "The pistachios were incredibly fresh and the packaging felt premium. Will definitely order again.",
  },
  {
    name: "Bilal K.",
    rating: 5,
    text: "Ordered a gift box for a family event — everyone asked where it was from. Beautifully presented.",
  },
  {
    name: "Sara M.",
    rating: 4,
    text: "Great quality cashews at a fair price. Delivery took a couple of days longer than expected, but worth the wait.",
  },
  {
    name: "Hamza T.",
    rating: 5,
    text: "Been buying dried fruit here for months now — consistent quality every single time.",
  },
  {
    name: "Areeba N.",
    rating: 5,
    text: "Loved the Build Your Own Box feature. Made it easy to put together exactly what I wanted.",
  },
  {
    name: "Usman F.",
    rating: 4,
    text: "Good variety and honest pricing. Would like to see more nut butter options in the future.",
  },
];

/** Customer review cards in a responsive grid. */
export const ReviewsSection = () => (
  <section className="py-16 sm:py-24" style={{ background: brandColors.cream }}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading kicker="Words From Our Customers" title="What People Are Saying" />

      <div className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((review) => (
          <div
            key={review.name}
            className="rounded-2xl border bg-white p-5"
            style={{
              borderColor: brandColors.sand,
              boxShadow: "0 6px 24px -8px rgba(51,34,15,.15)",
            }}
          >
            <Rate disabled defaultValue={review.rating} style={{ fontSize: 14 }} />
            <p className="mt-3 font-light leading-relaxed" style={{ color: brandColors.cocoa }}>
              &ldquo;{review.text}&rdquo;
            </p>
            <p
              className="mt-4 text-[13.5px] font-semibold"
              style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
            >
              {review.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
