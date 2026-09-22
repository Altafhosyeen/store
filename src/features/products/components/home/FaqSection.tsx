import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { SectionHeading } from "@/components";
import { brandColors, brandFontFamily } from "@/theme";

const FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "How fresh are the products?",
    answer:
      "We pack in small batches and rotate stock regularly, so what you receive is freshly packed rather than sitting in a warehouse for months.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer:
      "Yes — place your order on the website and pay in cash when it arrives. No card or online payment is required.",
  },
  {
    question: "Can I customise a gift box?",
    answer:
      "Yes, our Build Your Box tool lets you choose a box size and fill it with the products you want.",
  },
  {
    question: "What if an item arrives damaged?",
    answer:
      "Contact us within 48 hours of delivery with a photo and we'll arrange a replacement or refund.",
  },
  {
    question: "Do you deliver nationwide?",
    answer:
      "Yes, we deliver across the country. Delivery windows vary by area — see the delivery section above for estimates.",
  },
];

/** Simple accessible accordion — one FAQ open at a time. */
export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24" style={{ background: brandColors.ivory }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading kicker="Need Help?" title="Frequently Asked Questions" />

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border"
                style={{ borderColor: brandColors.sand, background: "white" }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                >
                  <span
                    className="font-semibold"
                    style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
                  >
                    {faq.question}
                  </span>
                  <DownOutlined
                    style={{
                      color: brandColors.goldDark,
                      transition: "transform .3s",
                      transform: open ? "rotate(180deg)" : "none",
                    }}
                  />
                </button>
                {open ? (
                  <p
                    className="px-5 pb-4 font-light leading-relaxed"
                    style={{ color: brandColors.cocoa }}
                  >
                    {faq.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
