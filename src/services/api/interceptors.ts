import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/app/config/env.config";
import { API_ENDPOINTS, PUBLIC_ENDPOINTS, ROUTES } from "@/constants";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "./tokens";

interface RetryableConfig extends InternalAxiosRequestConfig {
  _isPublic?: boolean;
  _retried?: boolean;
}

// A single in-flight refresh promise so concurrent 401s trigger one refresh
// call, not one per failed request.
let refreshInFlight: Promise<string | undefined> | null = null;

const isPublicRequest = (config: RetryableConfig): boolean =>
  config._isPublic === true || PUBLIC_ENDPOINTS.some((endpoint) => config.url?.includes(endpoint));

const endSession = (): void => {
  clearTokens();
  window.location.assign(ROUTES.LOGIN);
};

// Bare axios.post, not the instrumented instance — it must not recursively
// trigger this same response interceptor.
const requestRefresh = async (): Promise<string | undefined> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return undefined;

  try {
    const response = await axios.post<{ accessToken: string; refreshToken: string }>(
      `${env.BACKEND_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
      { refreshToken },
    );
    setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data.accessToken;
  } catch {
    return undefined;
  }
};

export const attachInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use((config: RetryableConfig) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = config.headers["Content-Type"] ?? "application/json";
    }

    if (!isPublicRequest(config)) {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config as RetryableConfig | undefined;

      if (error.response?.status !== 401 || !config || config._retried || isPublicRequest(config)) {
        return Promise.reject(error);
      }

      config._retried = true;
      refreshInFlight ??= requestRefresh().finally(() => {
        refreshInFlight = null;
      });

      const newAccessToken = await refreshInFlight;
      if (!newAccessToken) {
        endSession();
        return Promise.reject(error);
      }

      config.headers.Authorization = `Bearer ${newAccessToken}`;
      return instance.request(config);
    },
  );

  return instance;
};
