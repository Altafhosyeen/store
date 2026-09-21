import type { Permission, UserRoleId } from "@/constants";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  roleId: UserRoleId;
  permissions: Permission[];
  avatarUrl?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
