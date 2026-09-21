import { colors } from "./colors";

export interface StatusStyle {
  bg: string;
  fg: string;
  border: string;
  label: string;
}

/** Order lifecycle — used by OrderStatusTag and admin order tables. */
export const orderStatusStyles: Record<string, StatusStyle> = {
  pending: {
    bg: colors.warningBg,
    fg: colors.warningText,
    border: colors.primaryBorder,
    label: "Pending",
  },
  processing: { bg: colors.infoBg, fg: colors.infoText, border: "#BFDBFE", label: "Processing" },
  shipped: { bg: colors.secondaryBg, fg: colors.secondary, border: "#BBF7D0", label: "Shipped" },
  delivered: {
    bg: colors.successBg,
    fg: colors.successText,
    border: "#BBF7D0",
    label: "Delivered",
  },
  cancelled: { bg: colors.errorBg, fg: colors.errorText, border: "#FECACA", label: "Cancelled" },
  refunded: {
    bg: colors.borderLight,
    fg: colors.textSecondary,
    border: colors.border,
    label: "Refunded",
  },
};

/** Payment status — used on order detail and admin order tables. */
export const paymentStatusStyles: Record<string, StatusStyle> = {
  unpaid: { bg: colors.errorBg, fg: colors.errorText, border: "#FECACA", label: "Unpaid" },
  paid: { bg: colors.successBg, fg: colors.successText, border: "#BBF7D0", label: "Paid" },
  refunded: {
    bg: colors.borderLight,
    fg: colors.textSecondary,
    border: colors.border,
    label: "Refunded",
  },
};

/** Stock level — used by StockTag on product cards, tables and detail pages. */
export const stockStatusStyles: Record<string, StatusStyle> = {
  inStock: { bg: colors.successBg, fg: colors.successText, border: "#BBF7D0", label: "In stock" },
  lowStock: {
    bg: colors.warningBg,
    fg: colors.warningText,
    border: colors.primaryBorder,
    label: "Low stock",
  },
  outOfStock: {
    bg: colors.errorBg,
    fg: colors.errorText,
    border: "#FECACA",
    label: "Out of stock",
  },
};

/** Product publish status — used in the admin product table. */
export const productStatusStyles: Record<string, StatusStyle> = {
  draft: {
    bg: colors.borderLight,
    fg: colors.textSecondary,
    border: colors.border,
    label: "Draft",
  },
  published: {
    bg: colors.successBg,
    fg: colors.successText,
    border: "#BBF7D0",
    label: "Published",
  },
  archived: { bg: colors.errorBg, fg: colors.errorText, border: "#FECACA", label: "Archived" },
};
