import type { AxiosError } from "axios";

export type ApiErrorKind =
  | "network"
  | "timeout"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "validation"
  | "conflict"
  | "server"
  | "unknown";

export class ApiError extends Error {
  kind: ApiErrorKind;
  status?: number;
  fieldErrors?: Record<string, string[]>;

  constructor(params: {
    kind: ApiErrorKind;
    message: string;
    status?: number;
    fieldErrors?: Record<string, string[]>;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.kind = params.kind;
    this.status = params.status;
    this.fieldErrors = params.fieldErrors;
  }
}

const KIND_BY_STATUS: Record<number, ApiErrorKind> = {
  400: "validation",
  401: "unauthorized",
  403: "forbidden",
  404: "not_found",
  409: "conflict",
};

const FALLBACK_MESSAGE: Record<ApiErrorKind, string> = {
  network: "Could not reach the server. Check your connection and try again.",
  timeout: "The request took too long. Please try again.",
  unauthorized: "Your session has expired. Please sign in again.",
  forbidden: "You don't have permission to do that.",
  not_found: "We couldn't find what you were looking for.",
  validation: "Some of the information provided isn't valid.",
  conflict: "This conflicts with existing data.",
  server: "Something went wrong on our end. Please try again shortly.",
  unknown: "Something went wrong. Please try again.",
};

const kindForStatus = (status: number | undefined): ApiErrorKind => {
  if (!status) return "unknown";
  if (status in KIND_BY_STATUS) return KIND_BY_STATUS[status];
  if (status >= 500) return "server";
  return "unknown";
};

const parseFieldErrors = (data: unknown): Record<string, string[]> | undefined => {
  if (typeof data !== "object" || data === null) return undefined;
  const entries = Object.entries(data as Record<string, unknown>).filter(
    ([, value]) => Array.isArray(value) && value.every((item) => typeof item === "string"),
  ) as Array<[string, string[]]>;
  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
};

const messageFromBody = (data: unknown): string | undefined => {
  if (typeof data !== "object" || data === null) return undefined;
  const body = data as Record<string, unknown>;
  if (typeof body.Message === "string") return body.Message;
  if (typeof body.message === "string") return body.message;
  if (typeof body.detail === "string") return body.detail;
  return undefined;
};

export const normalizeApiError = (error: unknown): ApiError => {
  const axiosError = error as AxiosError;

  if (axiosError?.code === "ECONNABORTED") {
    return new ApiError({ kind: "timeout", message: FALLBACK_MESSAGE.timeout });
  }

  if (!axiosError?.response) {
    return new ApiError({ kind: "network", message: FALLBACK_MESSAGE.network });
  }

  const { status, data } = axiosError.response;
  const kind = kindForStatus(status);

  return new ApiError({
    kind,
    status,
    message: messageFromBody(data) ?? FALLBACK_MESSAGE[kind],
    fieldErrors: kind === "validation" ? parseFieldErrors(data) : undefined,
  });
};

export const isRetryableError = (error: ApiError): boolean =>
  error.kind === "network" || error.kind === "timeout" || error.kind === "server";
