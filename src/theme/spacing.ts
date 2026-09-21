/** 4px-based spacing scale. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 64,
  "6xl": 80,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

/** Fixed structural measurements — header height, sider widths, control heights. */
export const layout = {
  headerHeight: 64,
  siderWidth: 240,
  siderCollapsedWidth: 80,
  controlHeight: 40,
  controlHeightSm: 32,
  controlHeightLg: 48,
  contentMaxWidth: 1280,
} as const;
