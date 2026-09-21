import { vi } from "vitest";

/**
 * antd measures the viewport through matchMedia (Grid, Drawer, Table's
 * responsive columns), which jsdom omits entirely. Without this every antd
 * render throws before the assertion runs.
 */
export const installMatchMedia = (): void => {
  Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
};
