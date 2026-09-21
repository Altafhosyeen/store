import { useEffect, useState } from "react";
import { DEBOUNCE } from "@/constants";

/** Delays a fast-changing value so search inputs do not fire a request per keystroke. */
export const useDebouncedValue = <T>(value: T, delayMs = DEBOUNCE.SEARCH_MS): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = globalThis.setTimeout(() => setDebounced(value), delayMs);
    return () => globalThis.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
};
