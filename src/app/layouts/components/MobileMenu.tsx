import { Link } from "react-router-dom";
import { SideDrawer } from "@/components";
import { useWhatsAppOrder } from "@/hooks";
import { useUiStore } from "@/store";
import { STOREFRONT_NAV } from "./storefront-nav";

export const MobileMenu = () => {
  const open = useUiStore((state) => state.overlay === "menu");
  const close = useUiStore((state) => state.closeOverlay);
  const orderOnWhatsApp = useWhatsAppOrder();

  return (
    <SideDrawer
      open={open}
      onClose={close}
      side="left"
      label="Mobile menu"
      widthClassName="w-[300px] max-w-[85vw]"
    >
      <div className="flex items-center justify-between border-b border-sand p-5">
        <span className="font-display text-lg font-bold tracking-[.14em] text-walnutdk">
          ROYAL NUTS
        </span>
        <button
          type="button"
          onClick={close}
          className="h-9 w-9 rounded-full text-walnut hover:bg-sand/60"
          aria-label="Close menu"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-5">
        <ul className="space-y-1 font-medium text-walnut">
          {STOREFRONT_NAV.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                onClick={close}
                className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-sand/50"
              >
                <i className={`fa-solid fa-${link.icon} w-5 text-golddk`} />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-sand p-5">
        <button
          type="button"
          onClick={() => {
            close();
            orderOnWhatsApp();
          }}
          className="btn-gold btn-press w-full rounded-xl py-3 font-semibold text-white"
        >
          <i className="fa-brands fa-whatsapp mr-2" />
          Order via WhatsApp
        </button>
      </div>
    </SideDrawer>
  );
};
