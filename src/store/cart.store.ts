import { create } from "zustand";
import { STORAGE_KEYS } from "@/constants";
import { localStorageService } from "@/services/storage";

export interface CartLine {
  productId: string;
  name: string;
  imageUrl?: string;
  unitPrice: number;
  quantity: number;
  /** e.g. a weight/size variant such as "500g" — omit for single-variant products. */
  variantLabel?: string;
}

interface CartState {
  lines: CartLine[];
  addLine: (line: CartLine) => void;
  removeLine: (productId: string, variantLabel?: string) => void;
  setQuantity: (productId: string, quantity: number, variantLabel?: string) => void;
  clear: () => void;
}

const sameLine = (a: CartLine, productId: string, variantLabel?: string): boolean =>
  a.productId === productId && a.variantLabel === variantLabel;

const persist = (lines: CartLine[]): void => {
  localStorageService.set(STORAGE_KEYS.CART, lines);
};

/**
 * Guest-friendly cart: persisted to localStorage so it survives a reload
 * without requiring sign-in, mirroring the sessionStorage-persisted-session
 * pattern used for in-progress state elsewhere in this stack.
 */
export const useCartStore = create<CartState>((set, get) => ({
  lines: localStorageService.get<CartLine[]>(STORAGE_KEYS.CART, []),
  addLine: (line) => {
    const existing = get().lines.find((l) => sameLine(l, line.productId, line.variantLabel));
    const lines = existing
      ? get().lines.map((l) =>
          sameLine(l, line.productId, line.variantLabel)
            ? { ...l, quantity: l.quantity + line.quantity }
            : l,
        )
      : [...get().lines, line];
    persist(lines);
    set({ lines });
  },
  removeLine: (productId, variantLabel) => {
    const lines = get().lines.filter((l) => !sameLine(l, productId, variantLabel));
    persist(lines);
    set({ lines });
  },
  setQuantity: (productId, quantity, variantLabel) => {
    const lines = get()
      .lines.map((l) => (sameLine(l, productId, variantLabel) ? { ...l, quantity } : l))
      .filter((l) => l.quantity > 0);
    persist(lines);
    set({ lines });
  },
  clear: () => {
    localStorageService.remove(STORAGE_KEYS.CART);
    set({ lines: [] });
  },
}));
