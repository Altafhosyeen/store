import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { API_ENDPOINTS } from "@/constants";
import { apiClient, clearTokens } from "@/services/api";
import { useAuthStore, useLookupStore } from "@/store";

/** Session state plus the one sign-out path that clears every cache. */
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const resetLookups = useLookupStore((state) => state.resetLookups);
  const queryClient = useQueryClient();

  const signOut = useCallback(async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // A failed logout call must still clear the client session.
    }

    clearTokens();
    clearAuth();
    // Reference data is per-user; leaking it into the next session would show
    // one user the previous user's cached categories/brands.
    resetLookups();
    // The cart is intentionally NOT cleared — a guest cart should survive
    // sign-in/out so items aren't lost, matching common storefront behaviour.
    queryClient.clear();
  }, [clearAuth, queryClient, resetLookups]);

  return {
    user,
    isAuthenticated: Boolean(user),
    signOut,
  };
};
