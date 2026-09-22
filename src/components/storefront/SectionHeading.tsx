import { brandColors, brandFontFamily } from "@/theme";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

/** Kicker + display headline + gold underline, the recurring section header across the storefront. */
export const SectionHeading = ({
  kicker,
  title,
  description,
  align = "center",
}: SectionHeadingProps) => (
  <div className={align === "center" ? "text-center" : "text-left"}>
    <p
      className="text-[11px] font-semibold uppercase tracking-[.3em]"
      style={{ color: brandColors.goldDark }}
    >
      {kicker}
    </p>
    <h2
      className="mt-3 text-3xl font-bold sm:text-5xl"
      style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
    >
      {title}
    </h2>
    <div
      className={`mt-5 h-px w-40 ${align === "center" ? "mx-auto" : ""}`}
      style={{
        background:
          "linear-gradient(90deg, transparent, " +
          brandColors.gold +
          " 20%, " +
          brandColors.gold +
          " 80%, transparent)",
      }}
    />
    {description ? (
      <p
        className={`mt-4 font-light ${align === "center" ? "mx-auto max-w-xl" : "max-w-xl"}`}
        style={{ color: brandColors.cocoa }}
      >
        {description}
      </p>
    ) : null}
  </div>
);
