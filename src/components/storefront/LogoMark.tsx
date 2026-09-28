import { brandColors } from "@/theme";

interface LogoMarkProps {
  className?: string;
  /** Adds the three jewels over the crown points, as in the header logo. */
  withJewels?: boolean;
}

/** The Royal Nuts crest: gold crown over an almond. */
export const LogoMark = ({ className = "h-7 w-7", withJewels = false }: LogoMarkProps) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path d="M14 25l6-13 7 9 5-12 5 12 7-9 6 13z" fill={brandColors.gold} />
    {withJewels ? (
      <>
        <circle cx="20" cy="12" r="2.2" fill={brandColors.gold} />
        <circle cx="32" cy="9" r="2.2" fill={brandColors.gold} />
        <circle cx="44" cy="12" r="2.2" fill={brandColors.gold} />
      </>
    ) : null}
    <ellipse cx="32" cy="42" rx="13" ry="15" fill={brandColors.sand} />
    <path d="M32 29c-5 4-6 18 0 26 6-8 5-22 0-26z" fill={brandColors.almondSkin} />
  </svg>
);
