/**
 * Public API of the test-support layer. Tests import from "@tests/support"
 * only, so a helper can be reorganized without touching every spec file.
 */

// Re-exported so a test needs one import for both the helpers and RTL's query
// utilities (screen, waitFor, within).
export { act, screen, waitFor, within } from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { installAuthReset, signIn, signOut } from "./auth";
export { makeUser, makeUserWithPermissions, makeUserWithRole } from "./factories";
export { createTestQueryClient, QueryTestProvider } from "./query";
export { type RenderWithProvidersResult, renderWithProviders } from "./render";
export { type RenderHookWithProvidersResult, renderHookWithProviders } from "./render-hook";
