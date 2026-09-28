import { create } from "zustand";
import { STORAGE_KEYS } from "@/constants";
import { localStorageService } from "@/services/storage";

/** A display snapshot of a wishlisted product, so the drawer renders without refetching. */
export interface WishlistItem {
  productId: string;
  name: string;
  imageUrl?: string;
  subtitle?: string;
  price: number;
  variantLabel?: string;
}

interface WishlistState {
  items: WishlistItem[];
  has: (productId: string) => boolean;
  /** Adds the item, or removes it when already saved. Returns true when it ends up saved. */
  toggle: (item: WishlistItem) => boolean;
  remove: (productId: string) => void;
}

const persist = (items: WishlistItem[]): void => {
  localStorageService.set(STORAGE_KEYS.WISHLIST, items);
};

/** Guest wishlist, persisted to localStorage like the cart. */
export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: localStorageService.get<WishlistItem[]>(STORAGE_KEYS.WISHLIST, []),
  has: (productId) => get().items.some((item) => item.productId === productId),
  toggle: (item) => {
    const saved = get().has(item.productId);
    const items = saved
      ? get().items.filter((i) => i.productId !== item.productId)
      : [...get().items, item];
    persist(items);
    set({ items });
    return !saved;
  },
  remove: (productId) => {
    const items = get().items.filter((item) => item.productId !== productId);
    persist(items);
    set({ items });
  },
}));
