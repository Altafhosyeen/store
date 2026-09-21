/**
 * Opting the test router into the v7 behaviors it warns about, so the console
 * stays quiet and a genuine warning is not lost in the noise. The app's own
 * router opts in separately; this only affects MemoryRouter in tests.
 */
export const ROUTER_FUTURE_FLAGS = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;
