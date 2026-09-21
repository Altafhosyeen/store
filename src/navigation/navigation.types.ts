import type { ReactNode } from "react";
import type { Permission } from "@/constants";

export interface NavigationItem {
  key: string;
  label: string;
  path?: string;
  icon?: ReactNode;
  /** Item renders only if the user holds at least one of these. */
  permissions?: Permission[];
  children?: NavigationItem[];
}
