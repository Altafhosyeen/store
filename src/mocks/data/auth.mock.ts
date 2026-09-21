import { USER_ROLES, type UserRoleId } from "@/constants";
import { getDefaultPermissions } from "@/permissions";
import type { LoginResponse, SessionUser } from "@/types";

/**
 * Sign-in fixtures. A ready-made user per role covers the common case; reach
 * for the builders in @tests/support when a test needs an unusual permission
 * set that no role grants.
 */
const makeSessionUser = (
  id: string,
  name: string,
  roleId: UserRoleId,
  overrides: Partial<SessionUser> = {},
): SessionUser => ({
  id,
  name,
  email: `${name.toLowerCase()}@example.com`,
  roleId,
  permissions: [...getDefaultPermissions(roleId)],
  ...overrides,
});

export const MOCK_ADMIN = makeSessionUser("u-admin", "Ada", USER_ROLES.ADMIN);
export const MOCK_STAFF = makeSessionUser("u-staff", "Sam Staff", USER_ROLES.STAFF);
export const MOCK_CUSTOMER = makeSessionUser("u-customer", "Cara", USER_ROLES.CUSTOMER);

export const MOCK_USERS = [MOCK_ADMIN, MOCK_STAFF, MOCK_CUSTOMER];

export const MOCK_USERS_BY_ROLE: Record<UserRoleId, SessionUser> = {
  [USER_ROLES.ADMIN]: MOCK_ADMIN,
  [USER_ROLES.STAFF]: MOCK_STAFF,
  [USER_ROLES.CUSTOMER]: MOCK_CUSTOMER,
};

/** Obviously fake tokens: nothing here should ever be mistaken for a real one. */
export const MOCK_TOKENS = {
  accessToken: "mock.access.token",
  refreshToken: "mock.refresh.token",
};

export const makeLoginResponse = (user: SessionUser = MOCK_ADMIN): LoginResponse => ({
  accessToken: MOCK_TOKENS.accessToken,
  refreshToken: MOCK_TOKENS.refreshToken,
  user,
});

export const MOCK_LOGIN_RESPONSE = makeLoginResponse();
