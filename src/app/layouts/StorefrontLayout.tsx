import {
  FacebookFilled,
  InstagramFilled,
  MenuOutlined,
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, ConfigProvider, Drawer, Flex, Layout, Space } from "antd";
import { Suspense, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { APP_NAME, ROUTES } from "@/constants";
import { useAuthStore, useCartStore } from "@/store";
import { brandColors, brandFontFamily, storefrontAntdTheme } from "@/theme";
import { PageLoader } from "./components/PageLoader";

const { Header, Content, Footer } = Layout;

const NAV_LINKS: Array<{ label: string; to: string }> = [
  { label: "Home", to: ROUTES.HOME },
  { label: "Shop", to: ROUTES.SHOP },
  { label: "Categories", to: ROUTES.CATEGORIES },
];

const LogoMark = () => (
  <span
    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11"
    style={{ background: brandColors.walnutDark, boxShadow: "0 6px 24px -8px rgba(51,34,15,.4)" }}
  >
    <svg viewBox="0 0 64 64" className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true">
      <path d="M14 25l6-13 7 9 5-12 5 12 7-9 6 13z" fill={brandColors.gold} />
      <ellipse cx="32" cy="42" rx="13" ry="15" fill={brandColors.ivory} />
      <path d="M32 29c-5 4-6 18 0 26 6-8 5-22 0-26z" fill="#8A6A44" />
    </svg>
  </span>
);

const Wordmark = () => (
  <span className="leading-none">
    <span
      className="block text-lg tracking-[.14em] sm:text-xl"
      style={{
        fontFamily: brandFontFamily.display,
        fontWeight: 700,
        color: brandColors.walnutDark,
      }}
    >
      {APP_NAME.toUpperCase()}
    </span>
    <span
      className="mt-0.5 hidden text-[10px] tracking-[.28em] sm:block"
      style={{ color: brandColors.goldDark, fontWeight: 500 }}
    >
      NATURE&apos;S FINEST
    </span>
  </span>
);

/**
 * The customer-facing storefront shell — its own nested ConfigProvider layers
 * the warm gold/walnut brand theme (storefrontAntdTheme) over the Admin
 * console's neutral one, so this subtree alone picks up the storefront's
 * visual identity.
 */
export const StorefrontLayout = () => {
  const cartCount = useCartStore((state) => state.lines.reduce((sum, l) => sum + l.quantity, 0));
  const user = useAuthStore((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ConfigProvider theme={storefrontAntdTheme}>
      <Layout className="min-h-dvh" style={{ background: brandColors.cream }}>
        <div
          className="relative z-[60] text-center text-[12.5px] tracking-wide sm:text-[13px]"
          style={{ background: brandColors.charcoal, color: brandColors.ivory }}
        >
          <div className="mx-auto max-w-7xl px-4 py-2">
            Free delivery on orders above Rs. 3,000 — nationwide across Pakistan.
          </div>
        </div>

        <Header
          className="sticky top-0 z-50 h-auto border-b px-0 leading-normal"
          style={{
            background: "rgba(250, 246, 238, 0.88)",
            backdropFilter: "blur(14px)",
            borderColor: brandColors.sand,
          }}
        >
          <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-6">
            <Link
              to={ROUTES.HOME}
              className="flex shrink-0 items-center gap-2.5 sm:gap-3"
              aria-label={`${APP_NAME} home`}
            >
              <LogoMark />
              <Wordmark />
            </Link>

            <ul
              className="hidden items-center gap-7 text-[14.5px] font-medium lg:flex"
              style={{ color: brandColors.walnut }}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="storefront-nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Space size={4} className="sm:gap-1">
              <Link to={ROUTES.SHOP}>
                <Button
                  type="text"
                  shape="circle"
                  icon={<SearchOutlined />}
                  aria-label="Search products"
                />
              </Link>
              <Link to={user ? ROUTES.ACCOUNT : ROUTES.LOGIN}>
                <Button type="text" shape="circle" icon={<UserOutlined />} aria-label="Account" />
              </Link>
              <Link to={ROUTES.CART}>
                <Badge count={cartCount} size="small" color={brandColors.goldDark} offset={[-4, 4]}>
                  <Button
                    type="text"
                    shape="circle"
                    icon={<ShoppingOutlined />}
                    aria-label="Cart"
                  />
                </Badge>
              </Link>
              <Button
                type="text"
                shape="circle"
                className="lg:!hidden"
                icon={<MenuOutlined />}
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
              />
            </Space>
          </div>
        </Header>

        <Drawer
          placement="left"
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          width={300}
          title={
            <span
              style={{
                fontFamily: brandFontFamily.display,
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              {APP_NAME.toUpperCase()}
            </span>
          }
        >
          <Flex vertical gap={4}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 font-medium"
                style={{ color: brandColors.walnut }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={user ? ROUTES.ACCOUNT : ROUTES.LOGIN}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 font-medium"
              style={{ color: brandColors.walnut }}
            >
              {user ? "My account" : "Sign in"}
            </Link>
          </Flex>
        </Drawer>

        <Content>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </Content>

        <Footer className="!px-4 !py-14 sm:!px-6" style={{ background: brandColors.charcoal }}>
          <div className="mx-auto max-w-7xl">
            <div
              className="grid gap-9 border-b pb-10 sm:grid-cols-2 lg:grid-cols-4"
              style={{ borderColor: "rgba(243,236,221,.1)" }}
            >
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border"
                    style={{
                      background: brandColors.walnutDark,
                      borderColor: "rgba(201,162,75,.3)",
                    }}
                  >
                    <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true">
                      <path d="M14 25l6-13 7 9 5-12 5 12 7-9 6 13z" fill={brandColors.gold} />
                      <ellipse cx="32" cy="42" rx="13" ry="15" fill={brandColors.ivory} />
                      <path d="M32 29c-5 4-6 18 0 26 6-8 5-22 0-26z" fill="#8A6A44" />
                    </svg>
                  </span>
                  <div>
                    <p
                      className="text-lg tracking-[.14em]"
                      style={{
                        fontFamily: brandFontFamily.display,
                        fontWeight: 700,
                        color: brandColors.cream,
                      }}
                    >
                      {APP_NAME.toUpperCase()}
                    </p>
                    <p
                      className="text-[11px] tracking-[.2em]"
                      style={{ color: "rgba(201,162,75,.8)" }}
                    >
                      NATURE&apos;S FINEST
                    </p>
                  </div>
                </div>
                <p
                  className="mt-4 text-[13.5px] font-light leading-relaxed"
                  style={{ color: "rgba(243,236,221,.6)" }}
                >
                  Premium dry fruits, seeds, dates and luxury gift boxes — hand-packed and delivered
                  fresh across Pakistan.
                </p>
                <Space className="mt-5">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border"
                    style={{ borderColor: "rgba(243,236,221,.2)", color: brandColors.ivory }}
                  >
                    <FacebookFilled />
                  </span>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border"
                    style={{ borderColor: "rgba(243,236,221,.2)", color: brandColors.ivory }}
                  >
                    <InstagramFilled />
                  </span>
                </Space>
              </div>

              <nav aria-label="Shop links">
                <p
                  className="mb-4 font-bold"
                  style={{ fontFamily: brandFontFamily.display, color: brandColors.cream }}
                >
                  Shop
                </p>
                <ul
                  className="space-y-2.5 text-[14px] font-light"
                  style={{ color: "rgba(243,236,221,.65)" }}
                >
                  <li>
                    <Link to={ROUTES.SHOP} className="hover:!text-[color:var(--gold)]">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link to={ROUTES.CATEGORIES}>Categories</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.CART}>Cart</Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Account links">
                <p
                  className="mb-4 font-bold"
                  style={{ fontFamily: brandFontFamily.display, color: brandColors.cream }}
                >
                  Account
                </p>
                <ul
                  className="space-y-2.5 text-[14px] font-light"
                  style={{ color: "rgba(243,236,221,.65)" }}
                >
                  <li>
                    <Link to={user ? ROUTES.ACCOUNT : ROUTES.LOGIN}>
                      {user ? "My account" : "Sign in"}
                    </Link>
                  </li>
                  {user ? null : (
                    <li>
                      <Link to={ROUTES.REGISTER}>Create account</Link>
                    </li>
                  )}
                  <li>
                    <Link to={ROUTES.ACCOUNT_ORDERS}>My orders</Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Company links">
                <p
                  className="mb-4 font-bold"
                  style={{ fontFamily: brandFontFamily.display, color: brandColors.cream }}
                >
                  Company
                </p>
                <div
                  className="mt-1 rounded-xl border p-4"
                  style={{ background: "rgba(51,34,15,.6)", borderColor: "rgba(201,162,75,.15)" }}
                >
                  <p className="text-[12.5px]" style={{ color: "rgba(243,236,221,.7)" }}>
                    Free delivery on orders above{" "}
                    <span className="font-semibold" style={{ color: brandColors.gold }}>
                      Rs. 3,000
                    </span>
                  </p>
                </div>
              </nav>
            </div>

            <div
              className="flex flex-col items-center justify-between gap-3 pt-6 text-[12.5px] sm:flex-row"
              style={{ color: "rgba(243,236,221,.45)" }}
            >
              <p>
                © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
              </p>
              <p>Made with care in Pakistan</p>
            </div>
          </div>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};
