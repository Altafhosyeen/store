import { QueryClient } from "@tanstack/react-query";
import { STALE_TIME } from "@/constants";
import { ApiError } from "@/services/api";

const MAX_RETRIES = 2;

/**
 * Retries only what a retry could fix. A 401/403/404 is a settled answer, and
 * retrying it just delays the error the page needs to render.
 */
const retry = (failureCount: number, error: unknown): boolean => {
  if (error instanceof ApiError) {
    const isTransient =
      error.kind === "network" || error.kind === "timeout" || error.kind === "server";
    return isTransient && failureCount < MAX_RETRIES;
  }
  return failureCount < 1;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry,
      staleTime: STALE_TIME.DEFAULT,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
