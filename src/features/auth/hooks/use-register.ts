import { useMutation } from "@tanstack/react-query";
import { setTokens } from "@/services/api";
import { useAuthStore } from "@/store";
import type { LoginResponse, RegisterPayload } from "@/types";
import { authService } from "../services/auth.service";

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (response: LoginResponse) => {
      setTokens(response.accessToken, response.refreshToken);
      setUser(response.user);
    },
  });
};
