import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

/**
 * RTL auto-cleans only when globals are injected by its own setup entry. This
 * file owns teardown explicitly so a component left mounted by one test cannot
 * keep timers running into the next one.
 */
export const installCleanup = (): void => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });
};
