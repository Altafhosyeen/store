import { SideDrawer } from "@/components";
import { formatCurrency } from "@/lib/currency";
import { useCartStore, useUiStore, useWishlistStore } from "@/store";

export const WishlistDrawer = () => {
  const open = useUiStore((state) => state.overlay === "wishlist");
  const close = useUiStore((state) => state.closeOverlay);
  const openQuickView = useUiStore((state) => state.openQuickView);
  const openOverlay = useUiStore((state) => state.openOverlay);
  const showToast = useUiStore((state) => state.showToast);
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.remove);
  const addLine = useCartStore((state) => state.addLine);

  return (
    <SideDrawer
      open={open}
      onClose={close}
      side="right"
      label="Wishlist"
      widthClassName="w-[400px] max-w-[94vw]"
    >
      <div className="flex items-center justify-between border-b border-sand bg-white/60 px-5 py-4">
        <p className="font-display text-xl font-bold text-walnutdk">
          <i className="fa-solid fa-heart mr-2 text-golddk" />
          Wishlist
        </p>
        <button
          type="button"
          onClick={close}
          className="h-9 w-9 rounded-full text-walnut hover:bg-sand/60"
          aria-label="Close wishlist"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <i className="fa-regular fa-heart text-4xl text-sand" />
            <p className="mt-4 font-display text-xl font-bold text-walnutdk">
              Your wishlist is empty
            </p>
            <p className="mt-1.5 text-sm font-light text-cocoa/70">
              Tap the heart on any product to save it here.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-3 rounded-xl border border-sand bg-white p-3 shadow-card"
            >
              <button
                type="button"
                onClick={() => openQuickView(item.productId)}
                className="shrink-0"
                aria-label={`Quick view ${item.name}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-walnutdk">{item.name}</p>
                <p className="text-[12px] text-cocoa/70">
                  {formatCurrency(item.price)} / {item.variantLabel}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addLine({
                        productId: item.productId,
                        name: item.name,
                        imageUrl: item.imageUrl,
                        unitPrice: item.price,
                        quantity: 1,
                        variantLabel: item.variantLabel,
                      });
                      showToast(`${item.name} (${item.variantLabel}) added to cart`);
                      openOverlay("cart");
                    }}
                    className="btn-press rounded-full bg-walnutdk px-3 py-1.5 text-[12px] font-semibold text-ivory"
                  >
                    Move to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      removeItem(item.productId);
                      showToast("Removed from wishlist", "heart-crack");
                    }}
                    className="btn-press rounded-full border border-red-200 px-3 py-1.5 text-[12px] font-semibold text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </SideDrawer>
  );
};
