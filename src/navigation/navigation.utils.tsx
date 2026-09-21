import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import type { Permission } from "@/constants";
import type { NavigationItem } from "./navigation.types";

type AntdMenuItem = NonNullable<MenuProps["items"]>[number];

const isVisible = (item: NavigationItem, can: (permission: Permission) => boolean): boolean =>
  !item.permissions?.length || item.permissions.some(can);

/** Drops items the user cannot reach, and any group left with no children. */
export const filterNavigation = (
  items: NavigationItem[],
  can: (permission: Permission) => boolean,
): NavigationItem[] => {
  const visible: NavigationItem[] = [];

  for (const item of items) {
    if (!isVisible(item, can)) continue;

    if (item.children?.length) {
      const children = filterNavigation(item.children, can);
      if (children.length > 0) {
        visible.push({ ...item, children });
      }
      continue;
    }

    visible.push(item);
  }

  return visible;
};

export const toMenuItems = (items: NavigationItem[]): AntdMenuItem[] =>
  items.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: item.path ? <Link to={item.path}>{item.label}</Link> : item.label,
    children: item.children?.length ? toMenuItems(item.children) : undefined,
  }));

/**
 * Deepest item whose path prefixes the URL, so child routes keep the parent
 * highlighted. Only the single best (longest) match is selected.
 */
export const findActiveKeys = (
  items: NavigationItem[],
  pathname: string,
): { selectedKeys: string[]; openKeys: string[] } => {
  interface Match {
    key: string;
    ancestors: string[];
    length: number;
  }

  let best: Match | undefined;

  const walk = (nodes: NavigationItem[], ancestors: string[]): void => {
    for (const node of nodes) {
      if (node.path && (pathname === node.path || pathname.startsWith(`${node.path}/`))) {
        if (!best || node.path.length > best.length) {
          best = { key: node.key, ancestors, length: node.path.length };
        }
      }
      if (node.children?.length) {
        walk(node.children, [...ancestors, node.key]);
      }
    }
  };

  walk(items, []);

  return best === undefined
    ? { selectedKeys: [], openKeys: [] }
    : { selectedKeys: [best.key], openKeys: best.ancestors };
};
