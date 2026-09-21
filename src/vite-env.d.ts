/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL?: string;
  readonly VITE_ENVIRONMENT?: string;
  readonly VITE_ACCESS_TOKEN_ALIAS?: string;
  readonly VITE_REFRESH_TOKEN_ALIAS?: string;
  readonly VITE_SSL_ENABLED?: string;
  readonly VITE_PAGINATION_SIZE?: string;
  readonly VITE_ENABLE_MOCK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
