export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** The backend envelope every response body is wrapped in. */
export interface ApiResponse<T> {
  Result: T;
  Status: string;
  Message: string;
  StatusCode: number;
}
