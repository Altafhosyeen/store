import { Breadcrumb } from "antd";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES, SEGMENTS } from "@/constants";

/** Route ids (:productId) are opaque, so they render as a plain label. */
const toLabel = (segment: string): string =>
  segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const isIdSegment = (segment: string): boolean =>
  /^\d+$/.test(segment) || /^[0-9a-f-]{16,}$/i.test(segment);

export const AppBreadcrumbs = () => {
  const { pathname } = useLocation();

  const items = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    return (
      segments
        .map((segment, index) => ({
          segment,
          path: `/${segments.slice(0, index + 1).join("/")}`,
          isLast: index === segments.length - 1,
        }))
        // "app" is a routing prefix, not a page anyone can open.
        .filter(({ segment }) => segment !== SEGMENTS.APP)
        .map(({ segment, path, isLast }) => {
          const label = isIdSegment(segment) ? "Detail" : toLabel(segment);
          const isLinkable = !isLast && !isIdSegment(segment);

          return {
            key: path,
            title: isLinkable ? <Link to={path}>{label}</Link> : label,
          };
        })
    );
  }, [pathname]);

  const trail =
    pathname === ROUTES.ADMIN_DASHBOARD
      ? []
      : items.filter((item) => item.key !== ROUTES.ADMIN_DASHBOARD);

  if (trail.length === 0) {
    return null;
  }

  return (
    <Breadcrumb
      className="min-w-0 truncate"
      items={[
        { key: ROUTES.ADMIN_DASHBOARD, title: <Link to={ROUTES.ADMIN_DASHBOARD}>Home</Link> },
        ...trail,
      ]}
    />
  );
};
