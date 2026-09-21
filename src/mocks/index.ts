import { isMockEnabled } from "@/app/config/env.config";

/**
 * Root-level switch, called once before the app renders. No-ops unless
 * VITE_ENABLE_MOCK is true and the build is not production.
 *
 * The mock layer is pulled in dynamically so a production bundle never
 * contains the fixtures: the static `isMockEnabled` check lets Vite drop this
 * whole branch, keeping fabricated users and tokens out of shipped code.
 */
export const setupMocks = async (): Promise<void> => {
  if (!isMockEnabled) return;

  const [{ mockAdapter }, { axiosInstance }] = await Promise.all([
    import("./mock-adapter"),
    import("@/services/api"),
  ]);

  axiosInstance.defaults.adapter = mockAdapter;

  // Deliberate: the one signal that responses are fabricated.
  console.warn(
    "[mocks] VITE_ENABLE_MOCK is on — all API responses are mock data, no backend is being called.",
  );
};

// Deliberately no re-exports here: main.tsx imports this module statically, so
// anything re-exported would be pulled into the app bundle and defeat the
// dynamic import above. Tests import "@/mocks/mock-adapter" directly.
