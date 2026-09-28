import { Link } from "react-router-dom";
import { LogoMark } from "@/components";
import { APP_NAME, buildWhatsAppUrl, STORE_CONTACT } from "@/constants";
import { type PolicyKey, useUiStore } from "@/store";
import { FOOTER_COMPANY_LINKS, FOOTER_SHOP_LINKS } from "./storefront-nav";

const SOCIAL_LINKS = [
  { label: "Facebook", href: STORE_CONTACT.FACEBOOK_URL, icon: "facebook-f", size: "text-[13px]" },
  { label: "Instagram", href: STORE_CONTACT.INSTAGRAM_URL, icon: "instagram", size: "text-[14px]" },
  { label: "TikTok", href: STORE_CONTACT.TIKTOK_URL, icon: "tiktok", size: "text-[13px]" },
  { label: "WhatsApp", href: buildWhatsAppUrl(), icon: "whatsapp", size: "text-[14px]" },
];

const POLICY_LINKS: Array<{ label: string; key: PolicyKey }> = [
  { label: "Shipping Policy", key: "shipping" },
  { label: "Return Policy", key: "returns" },
  { label: "Privacy Policy", key: "privacy" },
];

const LINK = "transition-colors hover:text-gold";

export const StorefrontFooter = () => {
  const openPolicy = useUiStore((state) => state.openPolicy);

  return (
    <footer className="bg-charcoal pb-8 pt-14 text-ivory/75">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-9 border-b border-ivory/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-walnutdk">
                <LogoMark />
              </span>
              <div>
                <p className="font-display text-lg font-bold tracking-[.14em] text-cream">
                  ROYAL NUTS
                </p>
                <p className="text-[11px] tracking-[.2em] text-gold/80">
                  NATURE&apos;S FINEST. PAKISTAN&apos;S FAVORITE.
                </p>
              </div>
            </div>
            <p className="mt-4 text-[13.5px] font-light leading-relaxed text-ivory/60">
              Premium dry fruits, seeds, dates and luxury gift boxes — hand-packed and delivered
              fresh across Pakistan.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 transition-all hover:border-gold hover:bg-gold hover:text-charcoal"
                  aria-label={social.label}
                >
                  <i className={`fa-brands fa-${social.icon} ${social.size}`} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Shop links">
            <p className="mb-4 font-display font-bold text-cream">Shop</p>
            <ul className="space-y-2.5 text-[14px] font-light">
              {FOOTER_SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company links">
            <p className="mb-4 font-display font-bold text-cream">Company</p>
            <ul className="space-y-2.5 text-[14px] font-light">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Policy links">
            <p className="mb-4 font-display font-bold text-cream">Policies</p>
            <ul className="space-y-2.5 text-[14px] font-light">
              {POLICY_LINKS.map((policy) => (
                <li key={policy.key}>
                  <button type="button" onClick={() => openPolicy(policy.key)} className={LINK}>
                    {policy.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-gold/15 bg-walnutdk/60 p-4">
              <p className="text-[12.5px] text-ivory/70">
                <i className="fa-solid fa-truck-fast mr-1.5 text-gold" />
                Free delivery on orders above{" "}
                <span className="font-semibold text-gold">Rs. 3,000</span>
              </p>
            </div>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-[12.5px] text-ivory/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {APP_NAME}. Demo storefront — prices shown are sample
            retail-style prices.
          </p>
          <p>
            Made with <i className="fa-solid fa-heart mx-0.5 text-gold/70" /> in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};
