import type { ThemeConfig } from "antd";
import { brandColors } from "./brand";
import { brandFontFamily, brandFontWeights } from "./brand-typography";
import { radius } from "./spacing";

/**
 * Applied only inside StorefrontLayout's own nested ConfigProvider, so the
 * Admin console (using antdTheme from antd-theme.ts) is unaffected. Ant
 * Design components (Drawer, Modal, Rate, Tag, Card, ...) pick up the brand
 * palette here; anything the token system can't reach (gradients, textured
 * backgrounds, hover-lift animation) lives in storefront component styles
 * built from brandColors/brandShadows directly.
 */
export const storefrontAntdTheme: ThemeConfig = {
  token: {
    colorPrimary: brandColors.gold,
    colorPrimaryHover: brandColors.goldDark,
    colorPrimaryActive: brandColors.goldDark,
    colorPrimaryBg: brandColors.ivory,
    colorPrimaryBgHover: brandColors.sand,
    colorPrimaryBorder: brandColors.sand,

    colorSuccess: brandColors.leaf,

    colorText: brandColors.walnut,
    colorTextSecondary: brandColors.cocoa,
    colorTextTertiary: brandColors.cocoa,
    colorTextHeading: brandColors.walnutDark,

    colorBgBase: brandColors.cream,
    colorBgLayout: brandColors.cream,
    colorBgElevated: brandColors.white,
    colorBgSpotlight: brandColors.charcoal,

    colorBorder: brandColors.sand,
    colorBorderSecondary: brandColors.sand,

    fontFamily: brandFontFamily.body,
    fontWeightStrong: brandFontWeights.semibold,

    borderRadius: radius.lg,
    borderRadiusLG: radius.xl,
    borderRadiusSM: radius.md,
  },
  components: {
    Layout: {
      headerBg: brandColors.cream,
      siderBg: brandColors.charcoal,
      bodyBg: brandColors.cream,
    },
    Button: {
      borderRadius: radius.full,
      fontWeight: brandFontWeights.medium,
    },
    Card: {
      borderRadiusLG: radius.xl,
    },
    Tag: {
      borderRadiusSM: radius.full,
    },
    Modal: {
      borderRadiusLG: radius.xl,
    },
    Rate: {
      starColor: brandColors.gold,
      starBg: brandColors.sand,
    },
  },
};
