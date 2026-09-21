export const USER_ROLES = {
  ADMIN: 1,
  STAFF: 2,
  CUSTOMER: 3,
} as const;

export type UserRoleId = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const USER_ROLE_NAMES: Record<UserRoleId, string> = {
  [USER_ROLES.ADMIN]: "Admin",
  [USER_ROLES.STAFF]: "Staff",
  [USER_ROLES.CUSTOMER]: "Customer",
};

export const USER_ROLE_OPTIONS = [
  { value: USER_ROLES.ADMIN, label: USER_ROLE_NAMES[USER_ROLES.ADMIN] },
  { value: USER_ROLES.STAFF, label: USER_ROLE_NAMES[USER_ROLES.STAFF] },
  { value: USER_ROLES.CUSTOMER, label: USER_ROLE_NAMES[USER_ROLES.CUSTOMER] },
];

/** Roles that use the Admin console shell rather than the storefront. */
export const CONSOLE_ROLES: UserRoleId[] = [USER_ROLES.ADMIN, USER_ROLES.STAFF];
