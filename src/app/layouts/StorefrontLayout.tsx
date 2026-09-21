import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Button, Flex, Layout, Space } from "antd";
import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import { BodyLarge, Caption } from "@/components/common/Text";
import { APP_NAME, ROUTES } from "@/constants";
import { useAuthStore, useCartStore } from "@/store";
import { colors, layout } from "@/theme";
import { PageLoader } from "./components/PageLoader";

const { Header, Content, Footer } = Layout;

/**
 * The customer-facing storefront shell — separate navigation and visual
 * identity from the Admin console (AdminLayout), the same way a dedicated
 * exam runner shell would sit apart from it.
 */
export const StorefrontLayout = () => {
  const cartCount = useCartStore((state) => state.lines.reduce((sum, l) => sum + l.quantity, 0));
  const user = useAuthStore((state) => state.user);

  return (
    <Layout className="min-h-dvh bg-white">
      <Header
        className="sticky top-0 z-10 flex items-center justify-between gap-4 border-hairline-light border-b bg-white"
        style={{ height: layout.headerHeight }}
      >
        <Link to={ROUTES.SHOP} className="flex items-center gap-2">
          <BodyLarge strong>{APP_NAME}</BodyLarge>
        </Link>

        <Space size="middle">
          <Link to={ROUTES.CATEGORIES}>Shop</Link>
          <Link to={user ? ROUTES.ACCOUNT : ROUTES.LOGIN}>
            <Button type="text" icon={<UserOutlined />} aria-label="Account" />
          </Link>
          <Link to={ROUTES.CART}>
            <Badge count={cartCount} size="small" color={colors.primary}>
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

      <Footer>
        <Flex justify="center">
          <Caption type="secondary">
            {APP_NAME} © {new Date().getFullYear()}
          </Caption>
        </Flex>
      </Footer>
    </Layout>
  );
};
