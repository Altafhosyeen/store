/**
 * The only module allowed to touch localStorage/sessionStorage directly.
 * Wrapped in try/catch: private browsing and storage quota can both throw.
 */
export interface StorageService {
  get: <T>(key: string, fallback: T) => T;
  set: (key: string, value: unknown) => void;
  remove: (key: string) => void;
}

const createStorageService = (getBackend: () => Storage): StorageService => ({
  get: <T>(key: string, fallback: T): T => {
    try {
      const raw = getBackend().getItem(key);
      return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  },
  set: (key: string, value: unknown): void => {
    try {
      getBackend().setItem(key, JSON.stringify(value));
    } catch {
      // Quota exceeded or storage unavailable — ignore, state stays in memory.
    }
  },
  remove: (key: string): void => {
    try {
      getBackend().removeItem(key);
    } catch {
      // Ignore.
    }
  },
});

export const localStorageService = createStorageService(() => window.localStorage);
export const sessionStorageService = createStorageService(() => window.sessionStorage);
