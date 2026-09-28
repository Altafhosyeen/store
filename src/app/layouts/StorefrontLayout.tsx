import { ConfigProvider } from "antd";
import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastStack } from "@/components";
import { QuickViewModal, SearchOverlay } from "@/features/products";
import { useRevealOnScroll, useWhatsAppOrder } from "@/hooks";
import { storefrontAntdTheme } from "@/theme";
import { CartDrawer } from "./components/CartDrawer";
import { MobileMenu } from "./components/MobileMenu";
import { PageLoader } from "./components/PageLoader";
import { PolicyModal } from "./components/PolicyModal";
import { StorefrontFooter } from "./components/StorefrontFooter";
import { StorefrontHeader } from "./components/StorefrontHeader";
import { WishlistDrawer } from "./components/WishlistDrawer";

/**
 * The customer-facing storefront shell. `.rn-store` scopes the storefront
 * stylesheet (base reset + brand classes) to this subtree, and the nested
 * ConfigProvider layers the warm brand theme over the Admin console's neutral
 * one for any Ant Design components used inside.
 */
export const StorefrontLayout = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { pathname, hash } = useLocation();
  const orderOnWhatsApp = useWhatsAppOrder();
  useRevealOnScroll(rootRef);

  // biome-ignore lint/correctness/useExhaustiveDependencies: a new pathname must scroll back to the top.
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const target = document.getElementById(hash.slice(1));
    target?.scrollIntoView({ behavior: "smooth" });
  }, [pathname, hash]);

  return (
    <ConfigProvider theme={storefrontAntdTheme}>
      <div ref={rootRef} className="rn-store min-h-dvh bg-cream">
        <StorefrontHeader />

        <main>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>

        <StorefrontFooter />

        <button
          type="button"
          onClick={orderOnWhatsApp}
          className="btn-press fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-whatsapp text-2xl text-white shadow-lift transition-transform hover:scale-110"
          aria-label="Order via WhatsApp"
        >
          <i className="fa-brands fa-whatsapp" />
        </button>

        <MobileMenu />
        <SearchOverlay />
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
        <PolicyModal />
        <ToastStack />
      </div>
    </ConfigProvider>
  );
};
