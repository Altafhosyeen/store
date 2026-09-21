import { makeUser } from "@tests/support";
import { describe, expect, it } from "vitest";
import { PERMISSIONS, USER_ROLES } from "@/constants";
import {
  canAccessConsole,
  getDefaultPermissions,
  getLandingRoute,
  hasPermission,
  hasRole,
  isAdmin,
} from "@/permissions";

describe("access control", () => {
  it("denies every check for a signed-out user", () => {
    expect(hasPermission(null, PERMISSIONS.PRODUCTS_VIEW)).toBe(false);
    expect(hasRole(null, [USER_ROLES.ADMIN])).toBe(false);
    expect(canAccessConsole(null)).toBe(false);
  });

  it("grants a capability only when the user actually holds it", () => {
    const user = makeUser({ permissions: [PERMISSIONS.PRODUCTS_VIEW] });

    expect(hasPermission(user, PERMISSIONS.PRODUCTS_VIEW)).toBe(true);
    expect(hasPermission(user, PERMISSIONS.PRODUCTS_DELETE)).toBe(false);
  });

  it("separates two staff members by permission, not by role", () => {
    const manager = makeUser({ permissions: [PERMISSIONS.ORDERS_MANAGE] });
    const viewer = makeUser({ permissions: [PERMISSIONS.ORDERS_VIEW] });

    expect(hasPermission(manager, PERMISSIONS.ORDERS_MANAGE)).toBe(true);
    expect(hasPermission(viewer, PERMISSIONS.ORDERS_MANAGE)).toBe(false);
    expect(manager.roleId).toBe(viewer.roleId);
  });

  it("keeps customers out of the console shell", () => {
    const customer = makeUser({ roleId: USER_ROLES.CUSTOMER });

    expect(canAccessConsole(customer)).toBe(false);
    expect(canAccessConsole(makeUser({ roleId: USER_ROLES.ADMIN }))).toBe(true);
    expect(canAccessConsole(makeUser({ roleId: USER_ROLES.STAFF }))).toBe(true);
  });

  it("recognizes only the admin role as admin", () => {
    expect(isAdmin(makeUser({ roleId: USER_ROLES.ADMIN }))).toBe(true);
    expect(isAdmin(makeUser({ roleId: USER_ROLES.STAFF }))).toBe(false);
    expect(isAdmin(null)).toBe(false);
  });

  it("sends console roles to the admin dashboard and customers to the shop", () => {
    expect(getLandingRoute(makeUser({ roleId: USER_ROLES.ADMIN }))).toMatch(/dashboard/i);
    expect(getLandingRoute(makeUser({ roleId: USER_ROLES.CUSTOMER }))).not.toMatch(/dashboard/i);
  });
});

describe("role permissions", () => {
  it("grants the admin every permission the app defines", () => {
    const adminPermissions = getDefaultPermissions(USER_ROLES.ADMIN);

    expect(adminPermissions).toContain(PERMISSIONS.PRODUCTS_DELETE);
    expect(adminPermissions).toContain(PERMISSIONS.CUSTOMERS_MANAGE);
  });

  it("gives staff operational rights but not product deletion", () => {
    const staffPermissions = getDefaultPermissions(USER_ROLES.STAFF);

    expect(staffPermissions).toContain(PERMISSIONS.ORDERS_MANAGE);
    expect(staffPermissions).toContain(PERMISSIONS.DASHBOARD_VIEW);
    expect(staffPermissions).not.toContain(PERMISSIONS.PRODUCTS_DELETE);
  });

  it("grants customers no console permissions by default", () => {
    expect(getDefaultPermissions(USER_ROLES.CUSTOMER)).toEqual([]);
  });
});
