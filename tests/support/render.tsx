import type { QueryClient } from "@tanstack/react-query";
import { type RenderOptions, type RenderResult, render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { PropsWithChildren, ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AntdProvider } from "@/app/providers/AntdProvider";
import { createTestQueryClient, QueryTestProvider } from "./query";
import { ROUTER_FUTURE_FLAGS } from "./router";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  /** Initial history entry, e.g. "/app/products/42". Defaults to "/". */
  route?: string;
  /** Route pattern to mount the element under, so useParams() resolves. */
  path?: string;
  /** Supply a client to inspect the cache; otherwise a fresh one is made. */
  queryClient?: QueryClient;
}

export interface RenderWithProvidersResult extends RenderResult {
  queryClient: QueryClient;
  user: ReturnType<typeof userEvent.setup>;
}

/**
 * Renders under the same provider stack the app uses, because antd components
 * read theme/message context and every hook under test reads a QueryClient.
 * Returns the client and a user-event instance so tests need no extra setup.
 */
export const renderWithProviders = (
  ui: ReactElement,
  { route = "/", path, queryClient, ...options }: RenderWithProvidersOptions = {},
): RenderWithProvidersResult => {
  const client = queryClient ?? createTestQueryClient();
  const user = userEvent.setup();

  const Wrapper = ({ children }: PropsWithChildren) => (
    <QueryTestProvider client={client}>
      <AntdProvider>
        <MemoryRouter initialEntries={[route]} future={ROUTER_FUTURE_FLAGS}>
          {path ? <Routes>{<Route path={path} element={children} />}</Routes> : children}
        </MemoryRouter>
      </AntdProvider>
    </QueryTestProvider>
  );

  return { ...rtlRender(ui, { wrapper: Wrapper, ...options }), queryClient: client, user };
};
