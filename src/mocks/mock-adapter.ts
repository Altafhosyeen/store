import type { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from "axios";
import type { ApiResponse, HttpMethod } from "@/types";
import { handlers } from "./handlers";
import { findHandler, MockHttpError, type MockRequest } from "./mock-router";

/** Feels like a real request without making the UI look broken. */
const LATENCY_MS = 220;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    globalThis.setTimeout(resolve, ms);
  });

const parseBody = (data: unknown): unknown => {
  if (typeof data !== "string") return data;
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};

const toQuery = (config: AxiosRequestConfig): Record<string, string> => {
  const params = (config.params ?? {}) as Record<string, unknown>;
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => [key, String(value)]),
  );
};

const envelope = <T>(result: T, status: number): ApiResponse<T> => ({
  Result: result,
  Status: "success",
  Message: "Mocked response",
  StatusCode: status,
});

const buildResponse = (
  config: AxiosRequestConfig,
  status: number,
  data: unknown,
): AxiosResponse => ({
  data,
  status,
  statusText: status === 204 ? "No Content" : "OK",
  headers: {},
  config: config as AxiosResponse["config"],
});

/**
 * An axios adapter, so mocking happens at the transport layer. Everything
 * above it — the shared client, interceptors, services, hooks — runs exactly
 * as it does against a real backend; the flag changes where the bytes come
 * from, not how the app is wired.
 */
export const mockAdapter: AxiosAdapter = async (config) => {
  const pathname = (config.url ?? "").split("?")[0];
  const method = (config.method?.toUpperCase() ?? "GET") as HttpMethod;

  const match = findHandler(handlers, method, pathname);

  if (!match) {
    // Surfaced loudly rather than silently returning empty data, which would
    // look like a backend bug instead of a missing handler.
    throw new MockHttpError(501, `No mock handler for ${method} ${pathname}`);
  }

  await delay(LATENCY_MS);

  const request: MockRequest = {
    url: pathname,
    method,
    body: parseBody(config.data),
    params: match.params,
    query: toQuery(config),
  };

  try {
    const result = match.handler.resolve(request);
    const status = result === undefined ? 204 : 200;
    return buildResponse(config, status, status === 204 ? undefined : envelope(result, status));
  } catch (error) {
    if (error instanceof MockHttpError) {
      return Promise.reject(
        Object.assign(new Error(error.message), {
          isAxiosError: true,
          config,
          response: buildResponse(config, error.status, { Message: error.message }),
        }),
      );
    }
    throw error;
  }
};
