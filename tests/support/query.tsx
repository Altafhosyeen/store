import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

/**
 * A per-test client: retries off so a deliberate error surfaces on the first
 * attempt instead of after the app's backoff, and no caching across tests.
 */
export const createTestQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, gcTime: 0, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  });

export const QueryTestProvider = ({
  client,
  children,
}: PropsWithChildren<{ client: QueryClient }>) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);
