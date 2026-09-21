import type { ThemeConfig } from "antd";
import { colors } from "./colors";
import { layout, radius, spacing } from "./spacing";
import { fontFamily, fontWeights, typography } from "./typography";

/**
 * Shared control sizing reused across every text/number/select/date input so
 * they line up in a form without per-component overrides.
 */
const controlTokens = {
  controlHeight: layout.controlHeight,
  controlHeightSM: layout.controlHeightSm,
  controlHeightLG: layout.controlHeightLg,
  borderRadius: radius.md,
};

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorPrimaryHover: colors.primaryHover,
    colorPrimaryActive: colors.primaryActive,
    colorPrimaryBg: colors.primaryBg,
    colorPrimaryBgHover: colors.primaryBgHover,
    colorPrimaryBorder: colors.primaryBorder,

    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorInfo: colors.info,

    colorText: colors.textPrimary,
    colorTextSecondary: colors.textSecondary,
    colorTextTertiary: colors.textTertiary,
    colorTextDisabled: colors.textDisabled,

    colorBgBase: colors.bgBase,
    colorBgLayout: colors.bgLayout,
    colorBgElevated: colors.bgElevated,
    colorBgSpotlight: colors.bgSpotlight,

    colorBorder: colors.border,
    colorBorderSecondary: colors.borderLight,

    fontFamily,
    fontSize: typography.body.fontSize,
    fontWeightStrong: fontWeights.semibold,

    borderRadius: radius.md,
    borderRadiusLG: radius.lg,
    borderRadiusSM: radius.sm,

    controlHeight: layout.controlHeight,
    padding: spacing.lg,
    paddingLG: spacing.xl,
    margin: spacing.lg,
  },
  components: {
    Layout: {
      headerBg: colors.bgBase,
      headerHeight: layout.headerHeight,
      siderBg: colors.bgSpotlight,
      bodyBg: colors.bgLayout,
    },
    Menu: {
      // Dark sider: menu tokens are set independently of the light body theme.
      darkItemBg: colors.bgSpotlight,
      darkItemSelectedBg: colors.primary,
      darkSubMenuItemBg: colors.bgSpotlight,
      itemBorderRadius: radius.md,
    },
    Button: {
      controlHeight: controlTokens.controlHeight,
      borderRadius: radius.md,
      fontWeight: fontWeights.medium,
    },
    Input: controlTokens,
    InputNumber: controlTokens,
    Select: controlTokens,
    DatePicker: controlTokens,
    Form: {
      labelFontSize: typography.label.fontSize,
      itemMarginBottom: spacing.lg,
    },
    Card: {
      borderRadiusLG: radius.lg,
      paddingLG: spacing.xl,
    },
    Table: {
      headerBg: colors.borderLight,
      headerColor: colors.textSecondary,
      borderRadiusLG: radius.lg,
    },
    Typography: {
      titleMarginBottom: spacing.md,
      titleMarginTop: 0,
    },
    Tag: {
      borderRadiusSM: radius.sm,
    },
    Modal: {
      borderRadiusLG: radius.lg,
    },
  },
};
