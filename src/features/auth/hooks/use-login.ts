import { useMutation } from "@tanstack/react-query";
import { setTokens } from "@/services/api";
import { useAuthStore } from "@/store";
import type { LoginPayload, LoginResponse } from "@/types";
import { authService } from "../services/auth.service";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (response: LoginResponse) => {
      setTokens(response.accessToken, response.refreshToken);
      setUser(response.user);
    },
  });
};
