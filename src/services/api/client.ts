import axios, { type AxiosRequestConfig, type Method } from "axios";
import { env } from "@/app/config/env.config";
import { API_CONFIG } from "@/constants";
import { normalizeApiError } from "./errors";
import { attachInterceptors } from "./interceptors";

export const axiosInstance = attachInterceptors(
  axios.create({
    baseURL: env.BACKEND_URL,
    timeout: API_CONFIG.TIMEOUT_MS,
    maxContentLength: API_CONFIG.MAX_CONTENT_LENGTH,
    maxBodyLength: API_CONFIG.MAX_BODY_LENGTH,
    headers: { Accept: "application/json" },
  }),
);

/** Backend envelope every response body is wrapped in. */
interface ApiEnvelope<T> {
  Result: T;
  Status: string;
  Message: string;
  StatusCode: number;
}

const unwrap = <T>(data: ApiEnvelope<T> | undefined): T => {
  if (data === undefined) return undefined as T;
  return "Result" in data ? data.Result : (data as T);
};

interface RequestOptions extends Omit<AxiosRequestConfig, "url" | "method" | "data"> {
  isPublic?: boolean;
}

/**
 * The single entry point every service call goes through. Normalizes thrown
 * errors so callers only ever handle ApiError, never a raw AxiosError.
 */
export const RoyalNutsAPI = async <TResponse, TBody = undefined>(request: {
  method: Method;
  url: string;
  data?: TBody;
  options?: RequestOptions;
}): Promise<TResponse> => {
  const { method, url, data, options } = request;
  try {
    const response = await axiosInstance.request<ApiEnvelope<TResponse>>({
      method,
      url,
      data,
      params: options?.params,
      headers: options?.headers,
      signal: options?.signal,
      // Stashed for the request interceptor; stripped before the network call.
      ...({ _isPublic: options?.isPublic } as Record<string, unknown>),
    });
    return unwrap(response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
};

const withMethod =
  (method: Method) =>
  <TResponse, TBody = undefined>(url: string, data?: TBody, options?: RequestOptions) =>
    RoyalNutsAPI<TResponse, TBody>({ method, url, data, options });

export const apiClient = {
  request: RoyalNutsAPI,
  get: <TResponse>(url: string, options?: RequestOptions) =>
    RoyalNutsAPI<TResponse>({ method: "GET", url, options }),
  post: withMethod("POST"),
  put: withMethod("PUT"),
  patch: withMethod("PATCH"),
  delete: <TResponse>(url: string, options?: RequestOptions) =>
    RoyalNutsAPI<TResponse>({ method: "DELETE", url, options }),
};
