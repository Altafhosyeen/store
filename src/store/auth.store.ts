import { create } from "zustand";
import { STORAGE_KEYS } from "@/constants";
import { localStorageService } from "@/services/storage";
import type { SessionUser } from "@/types";

interface AuthState {
  user: SessionUser | null;
  isInitialized: boolean;
  setUser: (user: SessionUser | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorageService.get<SessionUser | null>(STORAGE_KEYS.AUTH_SESSION, null),
  isInitialized: false,
  setUser: (user) => {
    if (user) {
      localStorageService.set(STORAGE_KEYS.AUTH_SESSION, user);
    } else {
      localStorageService.remove(STORAGE_KEYS.AUTH_SESSION);
    }
    set({ user, isInitialized: true });
  },
  clearAuth: () => {
    localStorageService.remove(STORAGE_KEYS.AUTH_SESSION);
    set({ user: null, isInitialized: true });
  },
}));
