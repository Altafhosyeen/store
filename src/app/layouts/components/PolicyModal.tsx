import { CenteredModal } from "@/components";
import { type PolicyKey, useUiStore } from "@/store";

const POLICIES: Record<PolicyKey, { title: string; body: string[] }> = {
  shipping: {
    title: "Shipping Policy",
    body: [
      "We deliver across Pakistan via trusted courier partners. Orders are usually dispatched within 1 working day of confirmation.",
      "Estimated delivery: Islamabad/Rawalpindi 1–2 working days, major cities 2–4 working days, other areas 3–6 working days. These are estimates, not guarantees, and may vary during sales, peak seasons and public holidays.",
      "Delivery is free on orders above Rs. 3,000; a flat Rs. 250 delivery fee applies otherwise.",
    ],
  },
  returns: {
    title: "Return Policy",
    body: [
      "Your satisfaction matters. If a product arrives damaged, incorrect or in poor condition, contact us on WhatsApp within 48 hours of delivery with photos.",
      "Since dry fruits are food items, opened products cannot be returned unless there is a quality issue. Approved claims are resolved with a replacement or refund.",
      "Gift boxes and custom boxes are covered by the same quality guarantee.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "Your cart and wishlist are stored on your device so they survive a page reload.",
      "Account and order details you submit at checkout are used only to process and deliver your order.",
      "If you have questions about your data, contact us on WhatsApp or by email.",
    ],
  },
};

export const PolicyModal = () => {
  const open = useUiStore((state) => state.overlay === "policy");
  const policyKey = useUiStore((state) => state.policy);
  const close = useUiStore((state) => state.closeOverlay);
  const policy = policyKey ? POLICIES[policyKey] : null;

  return (
    <CenteredModal
      open={open}
      onClose={close}
      label={policy?.title ?? "Policy"}
      frameClassName="my-[8vh] max-w-xl"
    >
      <div className="relative rounded-3xl bg-cream p-7 shadow-lift sm:p-9">
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 h-9 w-9 rounded-full text-walnut hover:bg-sand/60"
          aria-label="Close policy"
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <h3 className="mb-4 font-display text-2xl font-bold text-walnutdk">{policy?.title}</h3>
        <div className="space-y-3 text-[14.5px] font-light leading-relaxed text-cocoa">
          {policy?.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </CenteredModal>
  );
};
