import { STORE_IMAGES } from "@/assets/images";
import { LogoMark } from "@/components";
import { HOME_SECTION_IDS } from "@/constants";

const PHOTOS = [
  { src: STORE_IMAGES.mix, alt: "Bowl of premium mixed dry fruits at Royal Nuts", offset: "" },
  {
    src: STORE_IMAGES.dates,
    alt: "Fresh Ajwa and Medjool dates in an elegant dish",
    offset: "mt-8",
  },
  {
    src: STORE_IMAGES.chilgoza,
    alt: "Pakistani chilgoza pine nuts in a brass bowl",
    offset: "-mt-8",
  },
  { src: STORE_IMAGES.pistachios, alt: "Roasted pistachios with open shells", offset: "" },
];

const PILLARS = [
  { title: "Seasonal", caption: "Sourcing" },
  { title: "Graded", caption: "Quality" },
  { title: "Honest", caption: "Pricing" },
];

export const AboutSection = () => (
  <section id={HOME_SECTION_IDS.about} className="pk-pattern bg-ivory py-16 sm:py-24">
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
      <div className="reveal relative order-2 lg:order-1">
        <div className="grid grid-cols-2 gap-4">
          {PHOTOS.map((photo) => (
            <img
              key={photo.alt}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className={`aspect-square w-full rounded-2xl object-cover shadow-card ${photo.offset}`}
            />
          ))}
        </div>
        <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-ivory bg-walnutdk shadow-lift">
          <LogoMark className="h-10 w-10" />
        </div>
      </div>
      <div className="reveal reveal-d1 order-1 lg:order-2">
        <p className="kicker text-[11px] font-semibold uppercase text-golddk">Our Story</p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-walnutdk sm:text-5xl">
          From Pakistan&apos;s Traditional Dry-Fruit Culture to Your Home
        </h2>
        <div className="mt-6 space-y-4 font-light leading-relaxed text-cocoa">
          <p>
            Anyone who has walked through a traditional Pakistani dry-fruit bazaar knows the feeling
            — sacks of chilgoza from the northern valleys, trays of glistening khajoor, the
            shopkeeper offering a handful of badam to taste before you buy.
          </p>
          <p>
            <span className="font-medium text-walnutdk">
              Royal Nuts brings that experience online.
            </span>{" "}
            We work with trusted suppliers to source seasonal, quality-graded dry fruits — the same
            care of the old bazaar, with the convenience of modern e-commerce: transparent pricing,
            honest grading, secure packing and doorstep delivery.
          </p>
          <p>
            Whether it&apos;s a winter evening bowl of mixed nuts, an Eid gift for family, or a
            wedding favor for two hundred guests — we pack every order like it&apos;s going to our
            own home.
          </p>
        </div>
        <div className="mt-7 grid max-w-md grid-cols-3 gap-4">
          {PILLARS.map((pillar) => (
            <div key={pillar.title}>
              <p className="font-display text-2xl font-bold text-golddk">{pillar.title}</p>
              <p className="mt-0.5 text-[12px] uppercase tracking-wider text-cocoa/80">
                {pillar.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
