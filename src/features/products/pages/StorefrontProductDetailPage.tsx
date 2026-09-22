import { ShoppingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductImage, ProductPrice, QueryStateBoundary } from "@/components";
import { useCartStore } from "@/store";
import { brandColors, brandFontFamily } from "@/theme";
import { useGetProduct } from "../hooks/use-products";

/** Public product detail: variant picker, price, add to cart. */
export const StorefrontProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, error, refetch } = useGetProduct(productId);
  const addLine = useCartStore((state) => state.addLine);

  const [variantId, setVariantId] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const variant = product?.variants.find((v) => v.id === variantId) ?? product?.variants[0];
  const outOfStock = !variant || variant.stockQuantity === 0;

  return (
    <div className="py-10 sm:py-16" style={{ background: brandColors.cream }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <QueryStateBoundary isLoading={isLoading} error={error} onRetry={refetch}>
          {product ? (
            <div className="grid gap-10 md:grid-cols-2">
              <div
                className="overflow-hidden rounded-2xl border"
                style={{
                  borderColor: brandColors.sand,
                  boxShadow: "0 6px 24px -8px rgba(51,34,15,.15)",
                }}
              >
                <ProductImage
                  src={product.images[0]}
                  alt={product.name}
                  className="aspect-square w-full"
                />
              </div>

              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[.14em]"
                  style={{ color: brandColors.goldDark }}
                >
                  {product.categoryName}
                </p>
                <h1
                  className="mt-1 text-2xl font-bold sm:text-3xl"
                  style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
                >
                  {product.name}
                </h1>
                <p className="mt-4 leading-relaxed" style={{ color: brandColors.cocoa }}>
                  {product.description}
                </p>

                {product.variants.length > 1 ? (
                  <div className="mt-6">
                    <p
                      className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em]"
                      style={{ color: brandColors.cocoa }}
                    >
                      Size
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => {
                        const active = v.id === (variantId ?? product.variants[0]?.id);
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setVariantId(v.id)}
                            className="rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors"
                            style={
                              active
                                ? {
                                    background: brandColors.walnutDark,
                                    color: brandColors.ivory,
                                    borderColor: brandColors.walnutDark,
                                  }
                                : { borderColor: brandColors.sand, color: brandColors.walnut }
                            }
                          >
                            {v.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {variant ? (
                  <div className="mt-6 flex flex-col gap-5">
                    <ProductPrice price={variant.price} compareAtPrice={variant.compareAtPrice} />

                    {!outOfStock ? (
                      <p className="text-[13px]" style={{ color: brandColors.cocoa }}>
                        {variant.stockQuantity <= 10
                          ? `Only ${variant.stockQuantity} left in stock`
                          : "In stock"}
                      </p>
                    ) : null}

                    <div className="flex items-center gap-4">
                      <div
                        className="flex items-center rounded-full border"
                        style={{ borderColor: brandColors.sand }}
                      >
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-4 py-2 text-lg"
                          style={{ color: brandColors.walnut }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span
                          className="min-w-[2ch] text-center font-medium"
                          style={{ color: brandColors.walnutDark }}
                        >
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((q) => Math.min(variant.stockQuantity || 1, q + 1))
                          }
                          className="px-4 py-2 text-lg"
                          style={{ color: brandColors.walnut }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        disabled={outOfStock}
                        onClick={() =>
                          addLine({
                            productId: product.id,
                            name: product.name,
                            imageUrl: product.images[0],
                            unitPrice: variant.price,
                            quantity,
                            variantLabel: variant.label,
                          })
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[15px] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                        style={{ background: brandColors.walnutDark }}
                      >
                        <ShoppingOutlined />
                        {outOfStock ? "Out of stock" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </QueryStateBoundary>
      </div>
    </div>
  );
};
