import { API_ENDPOINTS } from "@/constants";
import type { LoginPayload, LoginResponse, SessionUser } from "@/types";
import { MOCK_ADMIN, MOCK_USERS, makeLoginResponse } from "../data";
import { defineHandlers, notFound } from "../mock-router";

/**
 * The signed-in user for the current mock session. Login sets it; /me reads it
 * back, so a refresh keeps whichever role was chosen at sign-in.
 */
let currentUser: SessionUser = MOCK_ADMIN;

/**
 * Any password is accepted: the flag exists to explore the UI without a
 * backend, and the email alone picks which role you sign in as. An unknown
 * email falls back to the admin.
 */
const resolveUser = (email: string | undefined): SessionUser =>
  MOCK_USERS.find((user) => user.email.toLowerCase() === email?.trim().toLowerCase()) ?? MOCK_ADMIN;

export const authHandlers = defineHandlers([
  {
    method: "POST",
    path: API_ENDPOINTS.AUTH.LOGIN,
    resolve: ({ body }): LoginResponse => {
      currentUser = resolveUser((body as LoginPayload | undefined)?.email);
      return makeLoginResponse(currentUser);
    },
  },
  {
    method: "GET",
    path: API_ENDPOINTS.AUTH.ME,
    resolve: (): SessionUser => currentUser,
  },
  {
    method: "POST",
    path: API_ENDPOINTS.AUTH.LOGOUT,
    resolve: () => {
      currentUser = MOCK_ADMIN;
      return undefined;
    },
  },
  {
    method: "POST",
    path: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
    resolve: () => undefined,
  },
  {
    method: "POST",
    path: API_ENDPOINTS.AUTH.REGISTER,
    resolve: ({ body }): LoginResponse =>
      makeLoginResponse(resolveUser((body as LoginPayload | undefined)?.email)),
  },
  {
    method: "POST",
    path: API_ENDPOINTS.AUTH.REFRESH,
    // The mock session never expires, so a refresh attempt means the caller is
    // in a state this layer does not model.
    resolve: () => notFound("refresh is not mocked"),
  },
]);

/** Lets a dev switch roles from the console without signing out. */
export const setMockUser = (user: SessionUser): void => {
  currentUser = user;
};
