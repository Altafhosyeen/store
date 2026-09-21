/**
 * Test-facing alias for the shared mock data in src/mocks/data. Re-exported so
 * specs keep importing from "@tests/mocks" while the dev-time mock handlers
 * read the same fixtures from the app side.
 */
export * from "@/mocks/data";
