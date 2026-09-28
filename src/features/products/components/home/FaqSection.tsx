import { useState } from "react";
import { SectionHeading } from "@/components";
import { HOME_SECTION_IDS } from "@/constants";

const FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "How fresh are your dry fruits?",
    answer:
      "We work on a fresh-batch model — products are sourced seasonally, stored properly and packed close to dispatch. Every pack carries a packing date, and roasted items are prepared in small batches.",
  },
  {
    question: "What pack sizes are available?",
    answer:
      "Most products are available in 100g, 250g, 500g and 1kg packs. Some premium items (like chilgoza kernels) come in smaller packs, while gift boxes come in Standard, Deluxe or Royal presentations.",
  },
  {
    question: "Do you deliver nationwide?",
    answer:
      "Yes — we deliver across Pakistan through courier partners, from major cities to smaller towns. Delivery is free on orders above Rs. 3,000.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Islamabad/Rawalpindi: 1–2 working days. Major cities (Lahore, Karachi, Peshawar, Faisalabad, Multan, Quetta): 2–4 working days. Other areas: 3–6 working days. These are estimates and can vary in peak seasons.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer: "Yes, Cash on Delivery is available nationwide — you pay when your order arrives.",
  },
  {
    question: "Can I create a custom gift box?",
    answer:
      "Absolutely — use our Build Your Royal Box feature. Pick a box size (Mini to Royal), choose your favorite products, see the live total, and add it straight to your cart.",
  },
  {
    question: "How should dry fruits be stored?",
    answer:
      "Keep them in a cool, dry place away from direct sunlight, ideally in an airtight container. Shelled nuts and kernels stay freshest refrigerated, especially in summer.",
  },
  {
    question: "What if an item arrives damaged?",
    answer:
      "Contact us on WhatsApp within 48 hours of delivery with a photo and we'll arrange a replacement or refund.",
  },
  {
    question: "Are prices based on product quality and variety?",
    answer:
      "Yes — pricing reflects grade, variety, origin and season. Mamra almonds cost more than regular badam; chilgoza is a premium product; W240 cashews cost more than W320. Prices shown here are sample retail-style prices.",
  },
  {
    question: "How can I order through WhatsApp?",
    answer:
      "Add products to your cart and tap 'Order via WhatsApp' — a complete order message with products, weights, quantities and total is generated automatically and opens in WhatsApp.",
  },
];

/** Accordion — each question opens independently, all start closed. */
export const FaqSection = () => {
  const [openItems, setOpenItems] = useState<ReadonlySet<number>>(() => new Set());

  const toggle = (index: number) =>
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <section id={HOME_SECTION_IDS.faq} className="bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading kicker="Need Help?" title="Frequently Asked Questions" className="mb-10" />
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const open = openItems.has(index);
            const answerId = `faq-answer-${index}`;
            return (
              <div
                key={faq.question}
                className={`faq-item reveal overflow-hidden rounded-2xl border border-sand bg-white shadow-card ${open ? "open" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  aria-expanded={open}
                  aria-controls={answerId}
                >
                  <span className="text-[15px] font-semibold text-walnutdk">{faq.question}</span>
                  <i className="faq-chev fa-solid fa-chevron-down shrink-0 text-[13px] text-golddk" />
                </button>
                <div id={answerId} className="faq-body">
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14px] font-light leading-relaxed text-cocoa sm:px-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
