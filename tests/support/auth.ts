import { act } from "@testing-library/react";
import { afterEach } from "vitest";
import { useAuthStore } from "@/store/auth.store";
import type { SessionUser } from "@/types";

/**
 * Signs a user in for the duration of one test. Anything rendered through
 * renderWithProviders reads the real auth store, so tests set the session here
 * rather than mocking permission checks and losing the logic under test.
 *
 * Wrapped in act() because the store update re-renders every subscribed
 * component; without it React warns and the assertion can run a tick early.
 */
export const signIn = (user: SessionUser): SessionUser => {
  act(() => {
    useAuthStore.getState().setUser(user);
  });
  return user;
};

export const signOut = (): void => {
  act(() => {
    useAuthStore.getState().clearAuth();
  });
};

/** Opt-in teardown for suites that sign a user in. */
export const installAuthReset = (): void => {
  afterEach(signOut);
};
