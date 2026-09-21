import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { type PropsWithChildren, useEffect } from "react";
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants";
import { apiClient, hasSession } from "@/services/api";
import { useAuthStore } from "@/store";
import type { SessionUser } from "@/types";

/**
 * Revalidates the stored profile against the backend on boot. The cached copy
 * renders immediately so the shell does not flash empty, but the server answer
 * wins: a role or permission revoked between sessions must not persist.
 */
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const setUser = useAuthStore((state) => state.setUser);

  const sessionExists = hasSession();

  const { data, isError, isSuccess } = useQuery({
    queryKey: QUERY_KEYS.AUTH,
    queryFn: () => apiClient.get<SessionUser>(API_ENDPOINTS.AUTH.ME),
    enabled: sessionExists,
    retry: false,
    staleTime: Number.POSITIVE_INFINITY,
  });

  useEffect(() => {
    if (!sessionExists) {
      setUser(null);
      return;
    }
    if (isSuccess && data) {
      setUser(data);
      return;
    }
    // A failed /me with cookies present means the session is no longer valid;
    // the interceptor has already redirected, this just clears local state.
    if (isError) {
      setUser(null);
    }
  }, [data, isError, isSuccess, sessionExists, setUser]);

  // Only block the first paint when a session might exist but is unresolved.
  if (sessionExists && !isInitialized && !user) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
};
