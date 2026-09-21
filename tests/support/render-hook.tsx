import type { QueryClient } from "@tanstack/react-query";
import { type RenderHookResult, renderHook as rtlRenderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { createTestQueryClient, QueryTestProvider } from "./query";
import { ROUTER_FUTURE_FLAGS } from "./router";

interface RenderHookOptions {
  route?: string;
  queryClient?: QueryClient;
}

export type RenderHookWithProvidersResult<TResult> = RenderHookResult<TResult, unknown> & {
  queryClient: QueryClient;
};

/**
 * The hook counterpart of renderWithProviders. Skips AntdProvider: hooks under
 * test read Query and Router context, and mounting ConfigProvider would only
 * add render cost.
 */
export const renderHookWithProviders = <TResult,>(
  hook: () => TResult,
  { route = "/", queryClient }: RenderHookOptions = {},
): RenderHookWithProvidersResult<TResult> => {
  const client = queryClient ?? createTestQueryClient();

  const Wrapper = ({ children }: PropsWithChildren) => (
    <QueryTestProvider client={client}>
      <MemoryRouter initialEntries={[route]} future={ROUTER_FUTURE_FLAGS}>
        {children}
      </MemoryRouter>
    </QueryTestProvider>
  );

  return { ...rtlRenderHook(hook, { wrapper: Wrapper }), queryClient: client };
};
