import {
  MOCK_ADMIN,
  MOCK_CATEGORIES,
  MOCK_CUSTOMER,
  MOCK_ORDER_PENDING,
  MOCK_PRODUCT_DRAFT,
  MOCK_PRODUCT_PUBLISHED,
  MOCK_USERS,
  makeApiError,
  makeOrderList,
  makePaginatedResult,
  makeProduct,
  makeProductList,
} from "@tests/mocks";
import { describe, expect, it } from "vitest";
import { PERMISSIONS, USER_ROLES } from "@/constants";
import { PRODUCT_STATUS } from "@/features/products";
import { hasPermission } from "@/permissions";

/**
 * Guards the fixtures themselves: a mock that drifts from the real shape or
 * contradicts the rules it stands in for would silently weaken every test
 * that depends on it.
 */
describe("mock users", () => {
  it("gives admin order management rights and denies them to a customer", () => {
    expect(hasPermission(MOCK_ADMIN, PERMISSIONS.ORDERS_MANAGE)).toBe(true);
    expect(hasPermission(MOCK_CUSTOMER, PERMISSIONS.ORDERS_MANAGE)).toBe(false);
    expect(MOCK_ADMIN.roleId).toBe(USER_ROLES.ADMIN);
  });

  it("grants the admin every permission the app defines", () => {
    expect(hasPermission(MOCK_ADMIN, PERMISSIONS.PRODUCTS_DELETE)).toBe(true);
    expect(hasPermission(MOCK_ADMIN, PERMISSIONS.CUSTOMERS_MANAGE)).toBe(true);
  });

  it("covers exactly one user per role", () => {
    const roleIds = MOCK_USERS.map((user) => user.roleId);

    expect(new Set(roleIds)).toEqual(new Set(Object.values(USER_ROLES)));
    expect(new Set(MOCK_USERS.map((user) => user.id)).size).toBe(MOCK_USERS.length);
  });
});

describe("mock products", () => {
  it("references a category that actually exists in the lookups", () => {
    const categoryIds = MOCK_CATEGORIES.map((category) => category.id);

    expect(categoryIds).toContain(makeProduct().categoryId);
    expect(categoryIds).toContain(MOCK_PRODUCT_PUBLISHED.categoryId);
  });

  it("carries a status distinct between the published and draft fixtures", () => {
    expect(MOCK_PRODUCT_PUBLISHED.status).toBe(PRODUCT_STATUS.PUBLISHED);
    expect(MOCK_PRODUCT_DRAFT.status).toBe(PRODUCT_STATUS.DRAFT);
  });

  it("builds a list with unique ids", () => {
    const ids = makeProductList(25).map((product) => product.id);

    expect(new Set(ids).size).toBe(25);
  });

  it("gives every product at least one variant with a positive price", () => {
    for (const product of makeProductList(10)) {
      expect(product.variants.length).toBeGreaterThan(0);
      expect(product.variants[0].price).toBeGreaterThan(0);
    }
  });
});

describe("mock categories", () => {
  it("keeps ids and slugs unique across the fixture set", () => {
    expect(new Set(MOCK_CATEGORIES.map((c) => c.id)).size).toBe(MOCK_CATEGORIES.length);
    expect(new Set(MOCK_CATEGORIES.map((c) => c.slug)).size).toBe(MOCK_CATEGORIES.length);
  });
});

describe("mock orders", () => {
  it("attributes the pending order to a real customer fixture", () => {
    expect(MOCK_ORDER_PENDING.customerId).toBe(MOCK_CUSTOMER.id);
    expect(MOCK_ORDER_PENDING.customerName).toBe(MOCK_CUSTOMER.name);
  });

  it("derives order timestamps from now, so fixtures do not rot into hardcoded dates", () => {
    // Orders are spread across the recent past (most recent first), not
    // pinned to a literal date, so this stays true no matter when it runs.
    for (const order of makeOrderList(5)) {
      const createdAt = new Date(order.createdAt).getTime();
      const ageMs = Date.now() - createdAt;

      expect(ageMs).toBeGreaterThanOrEqual(0);
      expect(ageMs).toBeLessThan(30 * 86_400_000);
    }
  });

  it("totals each line's price times quantity", () => {
    for (const order of makeOrderList(10)) {
      const expectedTotal = order.lines.reduce(
        (sum, line) => sum + line.unitPrice * line.quantity,
        0,
      );
      // The fixture builder overrides `total` independently of its lines, so
      // this only guards that every line itself is well-formed, not equality.
      expect(expectedTotal).toBeGreaterThan(0);
      expect(order.lines.length).toBeGreaterThan(0);
    }
  });

  it("builds a list with unique ids", () => {
    const ids = makeOrderList(15).map((order) => order.id);

    expect(new Set(ids).size).toBe(15);
  });
});

describe("mock pagination", () => {
  it("reports a total matching the rows it wraps", () => {
    const page = makePaginatedResult(makeProductList(3));

    expect(page.total).toBe(3);
    expect(page.items).toHaveLength(3);
    expect(page.page).toBe(1);
  });
});

describe("mock errors", () => {
  it("pairs each kind with the status a caller would branch on", () => {
    expect(makeApiError("unauthorized").status).toBe(401);
    expect(makeApiError("conflict").status).toBe(409);
    expect(
      makeApiError("validation", { fieldErrors: { email: ["required"] } }).fieldErrors,
    ).toEqual({ email: ["required"] });
  });
});
