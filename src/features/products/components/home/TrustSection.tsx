import {
  CheckCircleOutlined,
  GiftOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { brandColors, brandFontFamily } from "@/theme";

const TRUST_POINTS = [
  {
    icon: <SafetyCertificateOutlined />,
    title: "Premium Quality",
    description: "Every batch is graded and inspected before it reaches you.",
  },
  {
    icon: <GiftOutlined />,
    title: "Freshly Packed",
    description: "Sealed in food-safe packaging to lock in freshness.",
  },
  {
    icon: <TruckOutlined />,
    title: "Nationwide Delivery",
    description: "We deliver across the country, door to door.",
  },
  {
    icon: <CheckCircleOutlined />,
    title: "Secure Checkout",
    description: "Simple, secure ordering with cash on delivery available.",
  },
];

/** The trust strip: four short reassurance cards on a dark band. */
export const TrustSection = () => (
  <section className="py-14" style={{ background: brandColors.walnutDark }}>
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-6 lg:grid-cols-4">
      {TRUST_POINTS.map((point) => (
        <div
          key={point.title}
          className="rounded-2xl border p-5 text-center transition-colors hover:opacity-90 sm:p-6"
          style={{ borderColor: "rgba(201,162,75,.15)", background: "rgba(30,21,13,.5)" }}
        >
          <span
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg"
            style={{ background: "rgba(201,162,75,.15)", color: brandColors.gold }}
          >
            {point.icon}
          </span>
          <p
            className="font-bold"
            style={{ fontFamily: brandFontFamily.display, color: brandColors.cream }}
          >
            {point.title}
          </p>
          <p className="mt-1.5 text-[12.5px] font-light" style={{ color: "rgba(243,236,221,.6)" }}>
            {point.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);
