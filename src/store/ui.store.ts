import { create } from "zustand";
import { STORAGE_KEYS } from "@/constants";
import { localStorageService } from "@/services/storage";

interface UiState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  sidebarCollapsed: localStorageService.get(STORAGE_KEYS.UI_SIDEBAR_COLLAPSED, false),
  toggleSidebar: () => {
    const collapsed = !get().sidebarCollapsed;
    localStorageService.set(STORAGE_KEYS.UI_SIDEBAR_COLLAPSED, collapsed);
    set({ sidebarCollapsed: collapsed });
  },
}));
