import { afterEach } from "vitest";

/**
 * The cart persists to localStorage and the auth session does too, so state
 * written by one test is visible to the next. Clearing between tests keeps
 * them order-independent.
 */
export const installStorageReset = (): void => {
  afterEach(() => {
    try {
      globalThis.localStorage.clear();
      globalThis.sessionStorage.clear();
    } catch {
      // Storage is unavailable in this environment; nothing to reset.
    }
  });
};
