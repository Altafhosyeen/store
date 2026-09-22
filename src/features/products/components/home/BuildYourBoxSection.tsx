import { GiftOutlined, ShoppingOutlined } from "@ant-design/icons";
import { App } from "antd";
import { useMemo, useState } from "react";
import { ProductImage, SectionHeading } from "@/components";
import { CURRENCY } from "@/constants";
import { useCartStore } from "@/store";
import { brandColors, brandFontFamily } from "@/theme";
import { PRODUCT_STATUS } from "../../constants/products.constants";
import { useGetProducts } from "../../hooks/use-products";

interface BoxSize {
  key: string;
  label: string;
  slots: number;
  basePrice: number;
  description: string;
}

const BOX_SIZES: BoxSize[] = [
  { key: "mini", label: "Mini Box", slots: 3, basePrice: 450, description: "3 items" },
  { key: "classic", label: "Classic Box", slots: 5, basePrice: 750, description: "5 items" },
  { key: "premium", label: "Premium Box", slots: 7, basePrice: 1150, description: "7 items" },
  { key: "royal", label: "Royal Box", slots: 9, basePrice: 1650, description: "9 items" },
];

const PER_ITEM_PRICE = 180;

/** Lets a customer pick a box size and fill it with products, then adds the bundle as one cart line. */
export const BuildYourBoxSection = () => {
  const { message } = App.useApp();
  const [sizeKey, setSizeKey] = useState("classic");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const addLine = useCartStore((state) => state.addLine);

  const { data } = useGetProducts({ page: 1, pageSize: 24, status: PRODUCT_STATUS.PUBLISHED });
  const products = data?.items ?? [];

  const size = BOX_SIZES.find((s) => s.key === sizeKey) ?? BOX_SIZES[0];
  const selectedProducts = useMemo(
    () => products.filter((p) => selectedIds.includes(p.id)),
    [products, selectedIds],
  );
  const itemsPrice = selectedProducts.length * PER_ITEM_PRICE;
  const total = size.basePrice + itemsPrice;

  const toggleProduct = (productId: string) => {
    setSelectedIds((current) => {
      if (current.includes(productId)) return current.filter((id) => id !== productId);
      if (current.length >= size.slots) {
        message.warning(`This box holds ${size.slots} items — remove one to add another.`);
        return current;
      }
      return [...current, productId];
    });
  };

  const handleSizeChange = (nextKey: string) => {
    setSizeKey(nextKey);
    const nextSize = BOX_SIZES.find((s) => s.key === nextKey);
    if (nextSize) setSelectedIds((current) => current.slice(0, nextSize.slots));
  };

  const addBoxToCart = () => {
    if (selectedProducts.length === 0) {
      message.warning("Add at least one product to your box first.");
      return;
    }
    addLine({
      productId: `custom-box-${Date.now()}`,
      name: `${size.label} — ${selectedProducts.map((p) => p.name).join(", ")}`,
      unitPrice: total,
      quantity: 1,
      variantLabel: `${selectedProducts.length} item${selectedProducts.length === 1 ? "" : "s"}`,
    });
    message.success("Your custom box was added to the cart.");
    setSelectedIds([]);
  };

  return (
    <section className="py-16 sm:py-24" style={{ background: brandColors.ivory }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="Made By You, Packed By Us"
          title="Build Your Own Box"
          description="Choose your box, fill it with your favourites, and we'll pack it in signature presentation."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="space-y-8 lg:col-span-3">
            <div>
              <p
                className="mb-4 flex items-center gap-3 text-xl font-bold"
                style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: brandColors.walnutDark, color: brandColors.gold }}
                >
                  1
                </span>
                Choose Your Box Size
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {BOX_SIZES.map((option) => {
                  const active = option.key === sizeKey;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleSizeChange(option.key)}
                      className="rounded-2xl border-2 p-4 text-center transition-colors"
                      style={
                        active
                          ? { borderColor: brandColors.gold, background: "rgba(201,162,75,.09)" }
                          : { borderColor: brandColors.sand, background: "rgba(255,255,255,.7)" }
                      }
                    >
                      <GiftOutlined style={{ fontSize: 22, color: brandColors.cocoa }} />
                      <p
                        className="mt-2 text-[15px] font-semibold"
                        style={{ color: brandColors.walnutDark }}
                      >
                        {option.label}
                      </p>
                      <p className="text-[12px]" style={{ color: brandColors.cocoa, opacity: 0.7 }}>
                        {option.description}
                      </p>
                      <p
                        className="mt-1.5 text-[13px] font-bold"
                        style={{ color: brandColors.goldDark }}
                      >
                        Base {CURRENCY.SYMBOL}
                        {option.basePrice}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p
                className="mb-4 flex items-center gap-3 text-xl font-bold"
                style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: brandColors.walnutDark, color: brandColors.gold }}
                >
                  2
                </span>
                Fill It With Favourites
                <span
                  className="ml-auto rounded-full border px-3.5 py-1 text-[13px] font-medium"
                  style={{
                    borderColor: "rgba(201,162,75,.3)",
                    background: "rgba(201,162,75,.1)",
                    color: brandColors.goldDark,
                  }}
                >
                  {selectedIds.length} / {size.slots}
                </span>
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {products.map((product) => {
                  const active = selectedIds.includes(product.id);
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => toggleProduct(product.id)}
                      className="overflow-hidden rounded-xl border-2 text-left transition-colors"
                      style={
                        active
                          ? { borderColor: brandColors.gold, background: "rgba(201,162,75,.1)" }
                          : { borderColor: brandColors.sand, background: "white" }
                      }
                    >
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                        className="aspect-square w-full"
                      />
                      <p
                        className="truncate px-2.5 py-2 text-[12.5px] font-medium"
                        style={{ color: brandColors.walnutDark }}
                      >
                        {product.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div
              className="relative overflow-hidden rounded-3xl p-6 sm:p-7"
              style={{
                background: brandColors.walnutDark,
                boxShadow: "0 24px 48px -16px rgba(51,34,15,.28)",
              }}
            >
              <p
                className="flex items-center gap-2 text-2xl font-bold"
                style={{ fontFamily: brandFontFamily.display, color: brandColors.cream }}
              >
                <GiftOutlined style={{ color: brandColors.gold }} /> Your Box
              </p>
              <p className="mt-1 text-[13px]" style={{ color: "rgba(243,236,221,.6)" }}>
                {size.label}
              </p>

              {selectedProducts.length > 0 ? (
                <ol
                  className="mt-5 max-h-[220px] list-decimal space-y-2 overflow-y-auto pl-5 text-[14px]"
                  style={{ color: "rgba(243,236,221,.9)" }}
                >
                  {selectedProducts.map((p) => (
                    <li key={p.id}>{p.name}</li>
                  ))}
                </ol>
              ) : (
                <p className="mt-5 text-[13.5px] italic" style={{ color: "rgba(243,236,221,.5)" }}>
                  Select products to see them appear here…
                </p>
              )}

              <div
                className="mt-5 space-y-1.5 border-t pt-4 text-[14px]"
                style={{ borderColor: "rgba(243,236,221,.15)" }}
              >
                <div className="flex justify-between" style={{ color: "rgba(243,236,221,.75)" }}>
                  <span>Box &amp; packaging</span>
                  <span>
                    {CURRENCY.SYMBOL}
                    {size.basePrice}
                  </span>
                </div>
                <div className="flex justify-between" style={{ color: "rgba(243,236,221,.75)" }}>
                  <span>Selected products</span>
                  <span>
                    {CURRENCY.SYMBOL}
                    {itemsPrice}
                  </span>
                </div>
                <div
                  className="flex justify-between pt-1.5 text-lg font-bold"
                  style={{ color: brandColors.gold }}
                >
                  <span>Total</span>
                  <span>
                    {CURRENCY.SYMBOL}
                    {total}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={addBoxToCart}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, #D4AF5C, ${brandColors.goldDark})` }}
              >
                <ShoppingOutlined />
                Add Custom Box to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
