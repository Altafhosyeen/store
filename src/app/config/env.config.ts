/**
 * The only file that reads import.meta.env. Everything else imports the
 * typed `env` object below.
 */
const readString = (key: string, fallback: string): string => {
  const value = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : fallback;
};

const readBoolean = (key: string, fallback: boolean): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return fallback;
  return value === "true";
};

const readNumber = (key: string, fallback: number): number => {
  const value = import.meta.env[key];
  const parsed = Number(value);
  return value !== undefined && !Number.isNaN(parsed) ? parsed : fallback;
};

export const env = Object.freeze({
  BACKEND_URL: readString("VITE_BACKEND_URL", window.location.origin),
  ENVIRONMENT: readString("VITE_ENVIRONMENT", "development"),
  ACCESS_TOKEN_ALIAS: readString("VITE_ACCESS_TOKEN_ALIAS", "AccessToken"),
  REFRESH_TOKEN_ALIAS: readString("VITE_REFRESH_TOKEN_ALIAS", "RefreshToken"),
  SSL_ENABLED: readBoolean("VITE_SSL_ENABLED", false),
  PAGINATION_SIZE: readNumber("VITE_PAGINATION_SIZE", 12),
  ENABLE_MOCK: readBoolean("VITE_ENABLE_MOCK", false),
});

export const isProduction = import.meta.env.PROD;
export const isDevelopment = import.meta.env.DEV;

// Gated on the Vite-inlined PROD flag so the bundler dead-code-eliminates the
// mock chunk from production builds entirely, not just leaves it unused.
export const isMockEnabled = !import.meta.env.PROD && env.ENABLE_MOCK;
