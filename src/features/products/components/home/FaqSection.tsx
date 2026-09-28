import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { SectionHeading } from "@/components";
import { brandColors, brandShadows } from "@/theme";

const FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "How fresh are your dry fruits?",
    answer:
      "We work on a fresh-batch model — products are sourced seasonally, stored properly and packed close to dispatch. Every pack carries a packing date, and roasted items are prepared in small batches.",
  },
  {
    question: "What pack sizes are available?",
    answer:
      "Most products are available in 100g, 250g, 500g and 1kg packs. Some premium items (like pine nut kernels) come in smaller packs, while gift boxes come in Standard, Deluxe or Royal presentations.",
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
    answer:
      "Yes, Cash on Delivery is available nationwide. You can also choose bank transfer or a mobile wallet at checkout.",
  },
  {
    question: "Can I create a custom gift box?",
    answer:
      "Absolutely — use our Build Your Own Box feature. Pick a box size (Mini to Royal), choose your favourite products, see the live total, and add it straight to your cart.",
  },
  {
    question: "How should dry fruits be stored?",
    answer:
      "Keep them in a cool, dry place away from direct sunlight, ideally in an airtight container. Shelled nuts and kernels stay freshest refrigerated, especially in summer.",
  },
  {
    question: "What if an item arrives damaged?",
    answer:
      "Contact us within 48 hours of delivery with a photo and we'll arrange a replacement or refund.",
  },
  {
    question: "Are prices based on product quality and variety?",
    answer:
      "Yes — pricing reflects grade, variety, origin and season. Premium varieties and specialty items cost more than everyday picks, and prices shown here are sample retail-style prices.",
  },
  {
    question: "How can I order through WhatsApp?",
    answer:
      "Tap the WhatsApp button and send us your order — we'll confirm products, weights, quantities and total, then arrange Cash on Delivery.",
  },
];

const EASE = "cubic-bezier(.22,.61,.36,1)";

/** Accessible accordion — each FAQ toggles independently, all start closed. */
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
    <section className="py-16 sm:py-24" style={{ background: brandColors.ivory }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading kicker="Need Help?" title="Frequently Asked Questions" />

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, index) => {
            const open = openItems.has(index);
            const answerId = `faq-answer-${index}`;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border"
                style={{
                  borderColor: brandColors.sand,
                  background: "white",
                  boxShadow: brandShadows.card,
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  aria-expanded={open}
                  aria-controls={answerId}
                >
                  <span
                    className="text-[15px] font-semibold"
                    style={{ color: brandColors.walnutDark }}
                  >
                    {faq.question}
                  </span>
                  <DownOutlined
                    className="shrink-0 text-[13px]"
                    style={{
                      color: brandColors.goldDark,
                      transition: "transform .4s",
                      transform: open ? "rotate(180deg)" : "none",
                    }}
                  />
                </button>
                <div
                  id={answerId}
                  className="grid"
                  style={{
                    gridTemplateRows: open ? "1fr" : "0fr",
                    transition: `grid-template-rows .45s ${EASE}`,
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="px-5 pb-5 text-[14px] font-light leading-relaxed sm:px-6"
                      style={{ color: brandColors.cocoa }}
                    >
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
