import type { HttpMethod } from "@/types";

export interface MockRequest {
  url: string;
  method: HttpMethod;
  body?: unknown;
  params: Record<string, string>;
  query: Record<string, string>;
}

export interface MockHandler {
  method: HttpMethod;
  /** Endpoint template, `:param` segments included: "/api/products/:productId/". */
  path: string;
  resolve: (request: MockRequest) => unknown;
}

/** Identity helper; exists so a handler file gets the type checked inline. */
export const defineHandlers = (handlers: MockHandler[]): MockHandler[] => handlers;

/** Thrown by a handler to produce an error response instead of a payload. */
export class MockHttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "MockHttpError";
  }
}

export const notFound = (message = "Not found"): never => {
  throw new MockHttpError(404, message);
};

export const badRequest = (message = "Invalid request"): never => {
  throw new MockHttpError(400, message);
};

const trimSlashes = (value: string): string => value.replace(/^\/+|\/+$/g, "");

/**
 * Matches a concrete URL against a template, returning its `:param` values.
 * Returns null when the two do not describe the same endpoint.
 */
export const matchPath = (template: string, pathname: string): Record<string, string> | null => {
  const templateSegments = trimSlashes(template).split("/");
  const pathSegments = trimSlashes(pathname).split("/");

  if (templateSegments.length !== pathSegments.length) return null;

  const params: Record<string, string> = {};

  for (const [index, segment] of templateSegments.entries()) {
    const actual = pathSegments[index];
    if (segment.startsWith(":")) {
      params[segment.slice(1)] = decodeURIComponent(actual);
      continue;
    }
    if (segment !== actual) return null;
  }

  return params;
};

export const findHandler = (
  handlers: MockHandler[],
  method: HttpMethod,
  pathname: string,
): { handler: MockHandler; params: Record<string, string> } | null => {
  for (const handler of handlers) {
    if (handler.method !== method) continue;
    const params = matchPath(handler.path, pathname);
    if (params) return { handler, params };
  }
  return null;
};
