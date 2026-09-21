import "@testing-library/jest-dom/vitest";
import { installCleanup } from "./cleanup";
import { installMatchMedia } from "./match-media";
import { installResizeObserver } from "./resize-observer";
import { installStorageReset } from "./storage";

/**
 * The single setupFiles entry for Vitest. Each concern lives in its own module
 * so a missing browser API is fixed where it is stubbed, not in a growing
 * catch-all file.
 */
installMatchMedia();
installResizeObserver();
installStorageReset();
installCleanup();
