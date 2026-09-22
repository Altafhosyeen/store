import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Button, ConfigProvider, Flex, Layout, Space } from "antd";
import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import { APP_NAME, ROUTES } from "@/constants";
import { useAuthStore, useCartStore } from "@/store";
import { brandColors, brandFontFamily, layout, storefrontAntdTheme } from "@/theme";
import { PageLoader } from "./components/PageLoader";

const { Header, Content, Footer } = Layout;

/**
 * The customer-facing storefront shell — its own nested ConfigProvider layers
 * the warm gold/walnut brand theme (storefrontAntdTheme) over the Admin
 * console's neutral one, so this subtree alone picks up the storefront's
 * visual identity.
 */
export const StorefrontLayout = () => {
  const cartCount = useCartStore((state) => state.lines.reduce((sum, l) => sum + l.quantity, 0));
  const user = useAuthStore((state) => state.user);

  return (
    <ConfigProvider theme={storefrontAntdTheme}>
      <Layout className="min-h-dvh" style={{ background: brandColors.cream }}>
        <Header
          className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b"
          style={{
            height: layout.headerHeight,
            background: brandColors.cream,
            borderColor: brandColors.sand,
          }}
        >
          <Link to={ROUTES.SHOP} className="flex items-center gap-2">
            <span
              style={{
                fontFamily: brandFontFamily.display,
                fontWeight: 700,
                fontSize: 20,
                color: brandColors.walnutDark,
                letterSpacing: "0.05em",
              }}
            >
              {APP_NAME}
            </span>
          </Link>

          <Space size="middle">
            <Link to={ROUTES.CATEGORIES} style={{ color: brandColors.walnut }}>
              Shop
            </Link>
            <Link to={user ? ROUTES.ACCOUNT : ROUTES.LOGIN}>
              <Button type="text" icon={<UserOutlined />} aria-label="Account" />
            </Link>
            <Link to={ROUTES.CART}>
              <Badge count={cartCount} size="small" color={brandColors.gold}>
                <Button type="text" icon={<ShoppingCartOutlined />} aria-label="Cart" />
              </Badge>
            </Link>
          </Space>
        </Header>

        <Content>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </Content>

        <Footer style={{ background: brandColors.charcoal }}>
          <Flex justify="center">
            <span style={{ color: brandColors.ivory, opacity: 0.75, fontSize: 13 }}>
              {APP_NAME} © {new Date().getFullYear()}
            </span>
          </Flex>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};
