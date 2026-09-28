import { CURRENCY } from "@/constants";

/** Formats a price using the app's currency symbol — whole rupees, no decimals, thousands-separated. */
export const formatCurrency = (value: number): string =>
  `${CURRENCY.SYMBOL}${Math.round(value).toLocaleString("en-US")}`;
