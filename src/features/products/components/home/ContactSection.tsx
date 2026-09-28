import { HOME_SECTION_IDS, STORE_CONTACT } from "@/constants";
import { useWhatsAppOrder } from "@/hooks";
import { brandColors } from "@/theme";

export const ContactSection = () => {
  const orderOnWhatsApp = useWhatsAppOrder();

  return (
    <section id={HOME_SECTION_IDS.contact} className="paper-texture py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-walnutdk shadow-lift">
          <div
            className="absolute inset-0 opacity-[.06]"
            aria-hidden="true"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg,${brandColors.gold} 0 2px,transparent 2px 26px)`,
            }}
          />
          <div className="relative grid items-center gap-8 p-7 sm:p-12 lg:grid-cols-2">
            <div className="reveal">
              <p className="kicker text-[11px] font-semibold uppercase text-gold">
                We&apos;re Here For You
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
                Questions? Bulk order?
                <br />
                Let&apos;s talk.
              </h2>
              <p className="mt-4 max-w-md font-light text-ivory/70">
                Reach out for wedding favors, corporate gifting, Ramadan hampers or anything else —
                we respond quickly on WhatsApp.
              </p>
              <div className="mt-6 space-y-3 text-[14.5px] text-ivory/85">
                <p>
                  <i className="fa-brands fa-whatsapp w-6 text-gold" />{" "}
                  {STORE_CONTACT.WHATSAPP_DISPLAY}
                </p>
                <p>
                  <i className="fa-regular fa-envelope w-6 text-gold" /> {STORE_CONTACT.EMAIL}
                </p>
                <p>
                  <i className="fa-solid fa-location-dot w-6 text-gold" /> Serving customers across
                  Pakistan
                </p>
              </div>
            </div>
            <div className="reveal reveal-d1">
              <div className="rounded-2xl border border-gold/20 bg-charcoal/60 p-6">
                <p className="mb-4 font-display text-xl font-bold text-cream">
                  <i className="fa-brands fa-whatsapp mr-2 text-gold" />
                  Order via WhatsApp
                </p>
                <p className="text-[14px] font-light text-ivory/70">
                  Fill your cart, then tap below — we&apos;ll prepare your complete order message
                  automatically with products, weights, quantities and total.
                </p>
                <button
                  type="button"
                  onClick={orderOnWhatsApp}
                  className="btn-press mt-5 w-full rounded-xl bg-whatsapp py-3.5 text-[15px] font-semibold text-white transition-all hover:brightness-110"
                >
                  <i className="fa-brands fa-whatsapp mr-2" />
                  Order My Cart via WhatsApp
                </button>
                <p className="mt-3 text-center text-[12px] text-ivory/45">
                  We reply during business hours, usually within the hour.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
