import {
  ExperimentOutlined,
  FireOutlined,
  GoldOutlined,
  HeartOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { SectionHeading } from "@/components";
import { brandColors, brandFontFamily } from "@/theme";

const HEALTH_POINTS = [
  {
    icon: <ThunderboltOutlined />,
    title: "Energy",
    description: "A natural pick-me-up for busy days.",
  },
  {
    icon: <HeartOutlined />,
    title: "Healthy Fats",
    description: "Nuts naturally contain unsaturated fats.",
  },
  {
    icon: <TrophyOutlined />,
    title: "Protein",
    description: "A plant-based source of everyday protein.",
  },
  {
    icon: <FireOutlined />,
    title: "Fibre",
    description: "Dried fruit contains naturally occurring dietary fibre.",
  },
  {
    icon: <GoldOutlined />,
    title: "Minerals",
    description: "Naturally occurring minerals in every handful.",
  },
  {
    icon: <ExperimentOutlined />,
    title: "Everyday Snacking",
    description: "A wholesome alternative to processed snacks.",
  },
];

/** Six short benefit cards under the "Good Taste. Good Choice." heading. */
export const HealthSection = () => (
  <section className="py-16 sm:py-24" style={{ background: brandColors.ivory }}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading
        kicker="Snack Smarter"
        title="Good Taste. Good Choice."
        description="Dry fruits and nuts are naturally wholesome, honestly delicious, and easy to build a daily habit around."
      />

      <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
        {HEALTH_POINTS.map((point) => (
          <div
            key={point.title}
            className="rounded-2xl border bg-white/80 p-5 text-center transition-transform hover:-translate-y-1"
            style={{
              borderColor: brandColors.sand,
              boxShadow: "0 6px 24px -8px rgba(51,34,15,.15)",
            }}
          >
            <span
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg"
              style={{ background: "rgba(201,162,75,.15)", color: brandColors.goldDark }}
            >
              {point.icon}
            </span>
            <p
              className="font-semibold"
              style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
            >
              {point.title}
            </p>
            <p className="mt-1 text-[12.5px] font-light" style={{ color: brandColors.cocoa }}>
              {point.description}
            </p>
          </div>
        ))}
      </div>

      <p
        className="mx-auto mt-8 max-w-xl text-center text-[12px]"
        style={{ color: brandColors.cocoa, opacity: 0.7 }}
      >
        Nutritional information is for general informational purposes and is not medical advice.
        Please consult a healthcare professional for dietary guidance.
      </p>
    </div>
  </section>
);
