import { SectionHeading, StarRating } from "@/components";
import { HOME_SECTION_IDS } from "@/constants";

const REVIEWS = [
  {
    name: "Ayesha Khan",
    city: "Islamabad",
    rating: 5,
    text: "Ordered the Royal Mix and Ajwa dates for Ramadan. Packaging was beautiful and everything tasted fresh — will definitely reorder.",
    product: "Royal Mixed Dry Fruits",
  },
  {
    name: "Bilal Ahmed",
    city: "Rawalpindi",
    rating: 5,
    text: "The chilgoza was expensive but honestly worth it — fresh, well roasted, and delivered in two days. Impressed with the sealed packing.",
    product: "Pakistani Chilgoza",
  },
  {
    name: "Fatima Malik",
    city: "Lahore",
    rating: 4.5,
    text: "Built a custom box for my mother-in-law's birthday with a gift message. She loved the presentation. One item was slightly less than expected, but support responded quickly on WhatsApp.",
    product: "Custom Royal Box",
  },
  {
    name: "Usman Sheikh",
    city: "Karachi",
    rating: 5,
    text: "Mamra almonds were the real deal — oily, dense and nothing like regular badam. Took 3 days to Karachi as estimated.",
    product: "Mamra Almonds",
  },
  {
    name: "Hina Qureshi",
    city: "Peshawar",
    rating: 4.5,
    text: "Khubani from Hunza tasted just like the ones we bring back from the north. Good quantity for the price.",
    product: "Dried Apricots",
  },
  {
    name: "Ahmed Raza",
    city: "Faisalabad",
    rating: 5,
    text: "Ordered a corporate box for our office Eid gifts — 15 boxes, all uniform and elegant. The team handled the bulk order smoothly.",
    product: "Corporate Gift Box",
  },
];

const REVEAL_DELAYS = ["", "reveal-d1", "reveal-d2"];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export const ReviewsSection = () => (
  <section id={HOME_SECTION_IDS.reviews} className="paper-texture py-16 sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading
        kicker="Words From Our Customers"
        title="Loved Across Pakistan"
        icon="quote-left"
        className="mb-12"
      />
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((review, index) => (
          <figure
            key={review.name}
            className={`reveal m-0 flex flex-col rounded-2xl border border-sand bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift ${REVEAL_DELAYS[index % 3]}`}
          >
            <div className="flex items-center gap-1 text-[13px]">
              <StarRating rating={review.rating} className="inline-flex gap-1" />
              <span className="ml-1.5 text-[13px] font-semibold text-walnut">{review.rating}</span>
            </div>
            <blockquote className="mt-3.5 flex-1 text-[14.5px] font-light leading-relaxed text-cocoa">
              &quot;{review.text}&quot;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-sand/80 pt-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-walnutdk font-display text-sm font-bold text-gold">
                {initials(review.name)}
              </span>
              <span>
                <span className="block text-[14px] font-semibold text-walnutdk">{review.name}</span>
                <span className="block text-[12px] text-cocoa/70">
                  <i className="fa-solid fa-location-dot mr-1 text-[10px] text-golddk" />
                  {review.city} · {review.product}
                </span>
              </span>
              <i className="fa-solid fa-circle-check ml-auto text-leaf" title="Verified purchase" />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
