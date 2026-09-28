import { useUiStore } from "@/store";

/** Bottom-centre stack of short confirmations ("added to cart", "removed from wishlist"). */
export const ToastStack = () => {
  const toasts = useUiStore((state) => state.toasts);
  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-[95] w-[92vw] max-w-sm -translate-x-1/2 space-y-2"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast-in pointer-events-auto flex items-center gap-3 rounded-xl bg-walnutdk px-4 py-3 text-[14px] text-ivory shadow-lift"
        >
          <i className={`fa-solid fa-${toast.icon} text-gold`} />
          <span className="flex-1">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
