import { useState } from "react";
import { STORE_IMAGES } from "@/assets/images";
import { SectionHeading } from "@/components";
import { HOME_SECTION_IDS } from "@/constants";
import { formatCurrency } from "@/lib/currency";
import { useCartStore, useUiStore } from "@/store";
import { BOX_PRODUCTS, BOX_SIZES, type BoxSizeKey, portionPrice } from "./box-builder.data";

/** Stable ids for the preview grid's fixed positions (the largest box has 10). */
const SLOT_IDS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"];

const StepTitle = ({ step, children }: { step: number; children: React.ReactNode }) => (
  <p className="mb-4 flex items-center gap-3 font-display text-xl font-bold text-walnutdk">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-walnutdk font-body text-sm font-bold text-gold">
      {step}
    </span>
    {children}
  </p>
);

/** Pick a box size, fill it with favourites, and add the whole box to the cart as one line. */
export const BuildYourBoxSection = () => {
  const [sizeKey, setSizeKey] = useState<BoxSizeKey>("classic");
  const [picked, setPicked] = useState<number[]>([]);
  const addLine = useCartStore((state) => state.addLine);
  const showToast = useUiStore((state) => state.showToast);
  const openOverlay = useUiStore((state) => state.openOverlay);

  const size = BOX_SIZES.find((s) => s.key === sizeKey) ?? BOX_SIZES[1];
  const itemsPrice = picked.reduce((sum, i) => sum + portionPrice(BOX_PRODUCTS[i], size), 0);

  const chooseSize = (key: BoxSizeKey) => {
    const next = BOX_SIZES.find((s) => s.key === key);
    setSizeKey(key);
    if (next) setPicked((current) => current.slice(0, next.slots));
  };

  const toggle = (index: number) => {
    if (picked.includes(index)) {
      setPicked(picked.filter((i) => i !== index));
      return;
    }
    if (picked.length >= size.slots) {
      showToast(
        `${size.label} holds ${size.slots} items — remove one first or choose a bigger box.`,
        "circle-info",
      );
      return;
    }
    setPicked([...picked, index]);
  };

  const addBoxToCart = () => {
    if (picked.length === 0) {
      showToast("Choose at least one product for your box.", "circle-info");
      return;
    }
    addLine({
      productId: `custom-box-${Date.now()}`,
      name: `Custom ${size.label} (Build Your Own)`,
      imageUrl: STORE_IMAGES.giftbox,
      unitPrice: size.basePrice + itemsPrice,
      quantity: 1,
      variantLabel: `${size.portion} × ${picked.length}`,
    });
    setPicked([]);
    showToast("Your custom Royal Box was added to the cart 👑");
    openOverlay("cart");
  };

  return (
    <section id={HOME_SECTION_IDS.buildYourBox} className="pk-pattern bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="Made By You, Packed By Us"
          title="Build Your Royal Box"
          description="Choose your box, fill it with your favorites, and we'll pack it in signature Royal Nuts presentation — perfect for home or gifting."
          icon="wand-magic-sparkles"
          className="mb-12"
        />

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="space-y-8 lg:col-span-3">
            <div className="reveal">
              <StepTitle step={1}>Choose Your Box Size</StepTitle>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {BOX_SIZES.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => chooseSize(option.key)}
                    className={`box-size-card btn-press rounded-2xl border-2 border-sand bg-white/70 p-4 text-center transition-all ${option.key === sizeKey ? "active" : ""}`}
                    aria-pressed={option.key === sizeKey}
                  >
                    <i
                      className={`fa-solid fa-${option.icon} mb-2 text-2xl ${option.key === "royal" ? "text-golddk" : "text-cocoa"}`}
                    />
                    <p className="text-[15px] font-semibold text-walnutdk">{option.label}</p>
                    <p className="text-[12px] text-cocoa/70">
                      {option.slots} items • {option.portion} each
                    </p>
                    <p className="mt-1.5 text-[13px] font-bold text-golddk">
                      Base {formatCurrency(option.basePrice)}
                    </p>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[12.5px] text-cocoa/70">
                <i className="fa-solid fa-circle-info mr-1.5 text-golddk" />
                Base price covers the wooden presentation box, lining and ribbon. Products are
                priced per portion below.
              </p>
            </div>

            <div className="reveal">
              <StepTitle step={2}>
                Fill It With Favorites
                <span className="ml-auto rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 font-body text-[13px] font-medium text-golddk">
                  {picked.length} / {size.slots} selected · {size.portion} each
                </span>
              </StepTitle>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {BOX_PRODUCTS.map((product, index) => (
                  <button
                    key={product.name}
                    type="button"
                    onClick={() => toggle(index)}
                    className={`box-item btn-press relative flex items-center gap-3 rounded-xl border-2 border-sand bg-white/70 p-2.5 text-left transition-all ${picked.includes(index) ? "active" : ""}`}
                    aria-pressed={picked.includes(index)}
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} for custom royal box`}
                      loading="lazy"
                      className="h-11 w-11 shrink-0 rounded-lg object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-[13.5px] font-semibold leading-tight text-walnutdk">
                        {product.name}
                      </span>
                      <span className="block text-[11px] text-cocoa/70">
                        {product.urduName} · {formatCurrency(portionPrice(product, size))}/
                        {size.portion}
                      </span>
                    </span>
                    <span className="box-check absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] text-white shadow-card">
                      <i className="fa-solid fa-check" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="reveal lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-3xl bg-walnutdk p-6 text-ivory shadow-lift sm:p-7">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="flex items-center gap-2 font-display text-2xl font-bold text-cream">
                  <i className="fa-solid fa-crown text-lg text-gold" /> Your Royal Box
                </p>
                <p className="mt-1 text-[13px] text-ivory/60">
                  {size.label} · up to {size.slots} items · {size.portion} per item
                </p>

                <div className="my-5 rounded-2xl border border-gold/20 bg-charcoal/60 p-4">
                  <div className="grid min-h-[56px] grid-cols-5 gap-2">
                    {SLOT_IDS.slice(0, size.slots).map((slotId, slot) => {
                      const product =
                        picked[slot] !== undefined ? BOX_PRODUCTS[picked[slot]] : null;
                      return product ? (
                        <div
                          key={`${slotId}-${product.name}`}
                          className="badge-pop aspect-square overflow-hidden rounded-lg border border-gold/40 shadow-card"
                        >
                          <img
                            src={product.image}
                            alt={`${product.name} in your royal box`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          key={slotId}
                          className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-ivory/25 text-[11px] text-ivory/25"
                        >
                          <i className="fa-solid fa-plus" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {picked.length > 0 ? (
                  <ol className="no-scrollbar max-h-[220px] list-inside list-decimal space-y-2 overflow-y-auto text-[14px] marker:text-gold/70">
                    {picked.map((index) => {
                      const product = BOX_PRODUCTS[index];
                      return (
                        <li key={product.name} className="flex items-center justify-between gap-2">
                          <span className="text-ivory/90">
                            {product.name}{" "}
                            <span className="text-[12px] text-ivory/50">{product.urduName}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-2">
                            <span className="text-gold/90">
                              {formatCurrency(portionPrice(product, size))}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggle(index)}
                              className="text-ivory/40 transition-colors hover:text-red-400"
                              aria-label={`Remove ${product.name} from box`}
                            >
                              <i className="fa-solid fa-xmark text-[12px]" />
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                ) : (
                  <p className="text-[13.5px] font-light italic text-ivory/50">
                    Select products to see them appear here…
                  </p>
                )}

                <div className="mt-5 space-y-1.5 border-t border-ivory/15 pt-4 text-[14px]">
                  <div className="flex justify-between text-ivory/75">
                    <span>Box &amp; packaging</span>
                    <span>{formatCurrency(size.basePrice)}</span>
                  </div>
                  <div className="flex justify-between text-ivory/75">
                    <span>Selected products</span>
                    <span>{formatCurrency(itemsPrice)}</span>
                  </div>
                  <div className="flex justify-between pt-1.5 text-lg font-bold text-gold">
                    <span>Total</span>
                    <span>{formatCurrency(size.basePrice + itemsPrice)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addBoxToCart}
                  className="btn-gold btn-press mt-5 w-full rounded-xl py-3.5 text-[15px] font-semibold text-white"
                >
                  <i className="fa-solid fa-bag-shopping mr-2" />
                  Add Custom Box to Cart
                </button>
                <p className="mt-3 text-center text-[12px] text-ivory/50">
                  Send us a personal gift message on WhatsApp once you&apos;ve ordered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
