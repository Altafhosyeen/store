import { Rate } from "antd";
import { SectionHeading } from "@/components";
import { brandColors, brandFontFamily } from "@/theme";

interface Review {
  name: string;
  city: string;
  rating: number;
  text: string;
}

const REVIEWS: Review[] = [
  {
    name: "Ayesha Khan",
    city: "Islamabad",
    rating: 5,
    text: "Ordered a mixed nuts box for Ramadan. Packaging was beautiful and everything tasted fresh — will definitely reorder.",
  },
  {
    name: "Bilal Ahmed",
    city: "Rawalpindi",
    rating: 5,
    text: "The pistachios were incredibly fresh and the packaging felt premium. Delivered in two days, impressed with the sealed packing.",
  },
  {
    name: "Fatima Malik",
    city: "Lahore",
    rating: 4.5,
    text: "Built a custom box for my mother-in-law's birthday. She loved the presentation. One item was slightly less than expected, but support responded quickly.",
  },
  {
    name: "Usman Sheikh",
    city: "Karachi",
    rating: 5,
    text: "Great quality cashews at a fair price — nothing like the regular stuff from the corner shop. Delivery took a couple of days longer than expected, but worth the wait.",
  },
  {
    name: "Hina Qureshi",
    city: "Peshawar",
    rating: 4.5,
    text: "The dried apricots tasted just like the ones we bring back from the north. Good quantity for the price.",
  },
  {
    name: "Ahmed Raza",
    city: "Faisalabad",
    rating: 5,
    text: "Ordered a corporate box for our office Eid gifts — 15 boxes, all uniform and elegant. The team handled the bulk order smoothly.",
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
            key={`${review.name}-${review.city}`}
            className="rounded-2xl border bg-white p-5"
            style={{
              borderColor: brandColors.sand,
              boxShadow: "0 6px 24px -8px rgba(51,34,15,.15)",
            }}
          >
            <Rate allowHalf disabled defaultValue={review.rating} style={{ fontSize: 14 }} />
            <p className="mt-3 font-light leading-relaxed" style={{ color: brandColors.cocoa }}>
              &ldquo;{review.text}&rdquo;
            </p>
            <p
              className="mt-4 text-[13.5px] font-semibold"
              style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
            >
              {review.name}
            </p>
            <p className="text-[12px]" style={{ color: brandColors.cocoa, opacity: 0.7 }}>
              {review.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
