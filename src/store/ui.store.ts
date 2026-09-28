import { create } from "zustand";
import { STORAGE_KEYS } from "@/constants";
import { localStorageService } from "@/services/storage";

/** The storefront's full-screen layers — only one is open at a time. */
export type StorefrontOverlay = "menu" | "cart" | "wishlist" | "search" | "quickView" | "policy";

export type PolicyKey = "shipping" | "returns" | "privacy";

export interface StorefrontToast {
  id: number;
  message: string;
  /** Font Awesome icon name without the `fa-` prefix, e.g. "circle-check". */
  icon: string;
}

interface UiState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  overlay: StorefrontOverlay | null;
  quickViewProductId: string | null;
  policy: PolicyKey | null;
  openOverlay: (overlay: Exclude<StorefrontOverlay, "quickView" | "policy">) => void;
  openQuickView: (productId: string) => void;
  openPolicy: (policy: PolicyKey) => void;
  closeOverlay: () => void;

  toasts: StorefrontToast[];
  showToast: (message: string, icon?: string) => void;
  dismissToast: (id: number) => void;
}

const TOAST_LIFETIME_MS = 3000;
let nextToastId = 1;

export const useUiStore = create<UiState>((set, get) => ({
  sidebarCollapsed: localStorageService.get(STORAGE_KEYS.UI_SIDEBAR_COLLAPSED, false),
  toggleSidebar: () => {
    const collapsed = !get().sidebarCollapsed;
    localStorageService.set(STORAGE_KEYS.UI_SIDEBAR_COLLAPSED, collapsed);
    set({ sidebarCollapsed: collapsed });
  },

  overlay: null,
  quickViewProductId: null,
  policy: null,
  openOverlay: (overlay) => set({ overlay }),
  openQuickView: (productId) => set({ overlay: "quickView", quickViewProductId: productId }),
  openPolicy: (policy) => set({ overlay: "policy", policy }),
  closeOverlay: () => set({ overlay: null }),

  toasts: [],
  showToast: (message, icon = "circle-check") => {
    const id = nextToastId++;
    set({ toasts: [...get().toasts, { id, message, icon }] });
    setTimeout(() => get().dismissToast(id), TOAST_LIFETIME_MS);
  },
  dismissToast: (id) => set({ toasts: get().toasts.filter((toast) => toast.id !== id) }),
}));
