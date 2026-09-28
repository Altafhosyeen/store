interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  /** Font Awesome icon name (without `fa-`) shown before the kicker, e.g. "crown". */
  icon?: string;
  /** "dark" for headings sitting on the charcoal/walnut sections. */
  tone?: "light" | "dark";
  /** Spacing below the heading block — home sections use "mb-12 sm:mb-14". */
  className?: string;
}

/** Kicker + display headline + gold underline, the recurring section header across the storefront. */
export const SectionHeading = ({
  kicker,
  title,
  description,
  align = "center",
  icon,
  tone = "light",
  className = "",
}: SectionHeadingProps) => {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <div className={`reveal ${centered ? "text-center" : "text-left"} ${className}`}>
      <p
        className={`kicker text-[11px] font-semibold uppercase ${dark ? "text-gold" : "text-golddk"}`}
      >
        {icon ? <i className={`fa-solid fa-${icon} mr-2`} /> : null}
        {kicker}
      </p>
      <h2
        className={`mt-3 font-display text-3xl font-bold sm:text-5xl ${dark ? "text-cream" : "text-walnutdk"}`}
      >
        {title}
      </h2>
      <div className={`gold-line mt-5 w-40 ${centered ? "mx-auto" : ""}`} />
      {description ? (
        <p
          className={`mt-4 max-w-xl font-light ${centered ? "mx-auto" : ""} ${dark ? "text-ivory/70" : "text-cocoa"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
};
