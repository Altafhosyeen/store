import { ConfigProvider, Layout } from "antd";
import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import { APP_NAME, ROUTES } from "@/constants";
import { brandColors, brandFontFamily, storefrontAntdTheme } from "@/theme";
import { PageLoader } from "./components/PageLoader";

/**
 * Centered card shell for login, register and password recovery, branded to
 * match the storefront a customer arrived from. Each page owns its own
 * heading.
 */
export const AuthLayout = () => (
  <ConfigProvider theme={storefrontAntdTheme}>
    <Layout
      className="flex min-h-dvh items-center justify-center px-4 py-10"
      style={{ background: brandColors.cream }}
    >
      <div className="w-full max-w-md">
        <Link
          to={ROUTES.HOME}
          className="mb-6 flex items-center justify-center gap-2.5"
          aria-label={`${APP_NAME} home`}
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: brandColors.walnutDark }}
          >
            <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
              <path d="M14 25l6-13 7 9 5-12 5 12 7-9 6 13z" fill={brandColors.gold} />
              <ellipse cx="32" cy="42" rx="13" ry="15" fill={brandColors.ivory} />
              <path d="M32 29c-5 4-6 18 0 26 6-8 5-22 0-26z" fill="#8A6A44" />
            </svg>
          </span>
          <span
            className="text-lg tracking-[.14em]"
            style={{
              fontFamily: brandFontFamily.display,
              fontWeight: 700,
              color: brandColors.walnutDark,
            }}
          >
            {APP_NAME.toUpperCase()}
          </span>
        </Link>

        <div
          className="rounded-2xl border p-6 sm:p-8"
          style={{
            background: "white",
            borderColor: brandColors.sand,
            boxShadow: "0 24px 48px -16px rgba(51,34,15,.28)",
          }}
        >
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-sm">
          <Link to={ROUTES.SHOP} style={{ color: brandColors.cocoa }}>
            ← Continue browsing as a guest
          </Link>
        </p>
      </div>
    </Layout>
  </ConfigProvider>
);
