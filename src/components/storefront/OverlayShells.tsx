import { type ReactNode, useEffect } from "react";

/** Escape closes the overlay, and the page behind it stops scrolling while it's open. */
const useOverlayBehaviour = (open: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);
};

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  side: "left" | "right";
  label: string;
  /** Width classes, e.g. "w-[400px] max-w-[94vw]". */
  widthClassName: string;
  children: ReactNode;
}

/** Slide-in panel over a dimmed backdrop — the storefront's cart, wishlist and mobile menu. */
export const SideDrawer = ({
  open,
  onClose,
  side,
  label,
  widthClassName,
  children,
}: SideDrawerProps) => {
  useOverlayBehaviour(open, onClose);
  const edge = side === "left" ? "left-0 drawer-left" : "right-0 drawer-right";
  return (
    <>
      <div
        className={`overlay-fade fixed inset-0 z-[80] bg-charcoal/60 ${open ? "open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`drawer fixed top-0 z-[81] flex h-full flex-col bg-cream shadow-lift ${edge} ${widthClassName} ${open ? "open" : ""}`}
        aria-label={label}
        aria-hidden={!open}
      >
        {children}
      </aside>
    </>
  );
};

interface CenteredModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  /** Classes for the dialog column, e.g. "max-w-4xl my-[4vh]". */
  frameClassName: string;
  children: ReactNode;
}

/** Popped-in dialog over a dark scrim — quick view, search, policies. Clicking the scrim closes it. */
export const CenteredModal = ({
  open,
  onClose,
  label,
  frameClassName,
  children,
}: CenteredModalProps) => {
  useOverlayBehaviour(open, onClose);
  return (
    <div
      className={`overlay-fade fixed inset-0 z-[85] overflow-y-auto bg-charcoal/70 ${open ? "open" : ""}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className={`modal-pop mx-auto px-4 ${frameClassName} ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-hidden={!open}
      >
        {children}
      </div>
    </div>
  );
};
