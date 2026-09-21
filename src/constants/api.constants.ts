export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login/",
    REGISTER: "/api/auth/register/",
    LOGOUT: "/api/auth/logout/",
    ME: "/api/auth/me/",
    REFRESH: "/api/auth/refresh/",
    FORGOT_PASSWORD: "/api/auth/forgot-password/",
  },
  LOOKUPS: {
    CATEGORIES: "/api/lookups/categories/",
    BRANDS: "/api/lookups/brands/",
  },
} as const;

export const PUBLIC_ENDPOINTS: string[] = [
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.REGISTER,
  API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
  API_ENDPOINTS.AUTH.REFRESH,
];

export const API_CONFIG = {
  TIMEOUT_MS: 15_000,
  MAX_CONTENT_LENGTH: 10 * 1024 * 1024,
  MAX_BODY_LENGTH: 10 * 1024 * 1024,
} as const;
