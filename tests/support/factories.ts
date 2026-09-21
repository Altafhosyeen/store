import type { Permission, UserRoleId } from "@/constants";
import { USER_ROLES } from "@/constants";
import { getDefaultPermissions } from "@/permissions";
import type { SessionUser } from "@/types";

/**
 * Builders, not fixtures: every test states only the fields its assertion
 * depends on, so adding a field to SessionUser does not touch any test.
 */
export const makeUser = (overrides: Partial<SessionUser> = {}): SessionUser => ({
  id: "u1",
  name: "Test User",
  email: "user@example.com",
  roleId: USER_ROLES.STAFF,
  permissions: [],
  ...overrides,
});

/** A user carrying exactly the permissions its role grants by default. */
export const makeUserWithRole = (
  roleId: UserRoleId,
  overrides: Partial<SessionUser> = {},
): SessionUser =>
  makeUser({ roleId, permissions: [...getDefaultPermissions(roleId)], ...overrides });

/** A user holding only the listed capabilities, whatever their role grants. */
export const makeUserWithPermissions = (
  permissions: Permission[],
  overrides: Partial<SessionUser> = {},
): SessionUser => makeUser({ permissions, ...overrides });
