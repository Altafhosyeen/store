import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Flex, Layout, Menu } from "antd";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BodyLarge, Caption } from "@/components/common/Text";
import { APP_NAME } from "@/constants";
import { findActiveKeys, toMenuItems, useNavigation } from "@/navigation";
import { useUiStore } from "@/store";
import { colors, layout, radius } from "@/theme";
import { AppBreadcrumbs } from "./components/AppBreadcrumbs";
import { AppUserMenu } from "./components/AppUserMenu";
import { PageLoader } from "./components/PageLoader";

const { Sider, Header, Content, Footer } = Layout;

/**
 * The console shell. Ant Design owns the structure; the Tailwind classes here
 * only handle local spacing and flex composition. The Sider is the product's
 * one dark surface, against the light page background.
 */
export const AdminLayout = () => {
  const { pathname } = useLocation();
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  const navigation = useNavigation();
  const { selectedKeys, openKeys } = findActiveKeys(navigation, pathname);

  return (
    <Layout className="min-h-dvh">
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleSidebar}
        trigger={null}
        width={layout.siderWidth}
        breakpoint="lg"
        collapsedWidth={layout.siderCollapsedWidth}
        className="sticky top-0 h-dvh overflow-auto"
      >
        {/* h-16 is 64px, matching layout.headerHeight, so the logo block and the
            header hairline line up across the two columns. */}
        <Flex align="center" gap="small" className="h-16 px-4">
          <ConfigProvider
            theme={{
              components: {
                Avatar: {
                  colorTextPlaceholder: colors.primary,
                  colorTextLightSolid: colors.white,
                  borderRadius: radius.md,
                },
                Typography: { colorText: colors.white },
              },
            }}
          >
            <Avatar
              shape="square"
              size={32}
              className="shrink-0"
              style={{ background: colors.primary }}
            >
              RN
            </Avatar>
            {collapsed ? null : <BodyLarge strong>{APP_NAME}</BodyLarge>}
          </ConfigProvider>
        </Flex>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          items={toMenuItems(navigation)}
          className="border-e-0 py-2"
        />
      </Sider>

      <Layout>
        <Header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-hairline-light border-b">
          <Flex align="center" gap="small" className="min-w-0">
            <Button
              type="text"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleSidebar}
            />
            <AppBreadcrumbs />
          </Flex>
          <AppUserMenu />
        </Header>

        <Content className="px-4 pb-6 md:px-6">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </Content>

        <Footer className="py-3 text-center">
          <Caption type="secondary">
            {APP_NAME} © {new Date().getFullYear()}
          </Caption>
        </Footer>
      </Layout>
    </Layout>
  );
};
