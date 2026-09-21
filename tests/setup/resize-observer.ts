import { vi } from "vitest";

/**
 * jsdom ships no ResizeObserver. antd's Table, Select and Tabs construct one
 * on mount via rc-resize-observer, so the constructor must exist even though
 * no test asserts on resize behavior.
 */
export const installResizeObserver = (): void => {
  if ("ResizeObserver" in globalThis) return;

  globalThis.ResizeObserver = class {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
  } as unknown as typeof ResizeObserver;
};
