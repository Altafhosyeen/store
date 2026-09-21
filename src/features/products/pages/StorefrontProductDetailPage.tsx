import { Button, Image, Select, Space } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { QueryStateBoundary } from "@/components";
import { BodyLarge } from "@/components/common/Text";
import { ProductPrice } from "@/components/storefront/ProductPrice";
import { useCartStore } from "@/store";
import { useGetProduct } from "../hooks/use-products";

/** Public product detail: variant picker, price, add to cart. */
export const StorefrontProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, error, refetch } = useGetProduct(productId);
  const addLine = useCartStore((state) => state.addLine);

  const [variantId, setVariantId] = useState<string>();
  const variant = product?.variants.find((v) => v.id === variantId) ?? product?.variants[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
      <QueryStateBoundary isLoading={isLoading} error={error} onRetry={refetch}>
        {product ? (
          <div className="grid gap-6 md:grid-cols-2">
            {product.images[0] ? (
              <Image src={product.images[0]} alt={product.name} className="rounded-lg" />
            ) : null}

            <div>
              <BodyLarge block strong className="mb-2 text-2xl">
                {product.name}
              </BodyLarge>
              <p className="mb-4 text-neutral-600">{product.description}</p>

              <Select
                className="mb-4 w-full"
                placeholder="Select size"
                value={variantId}
                options={product.variants.map((v) => ({ value: v.id, label: v.label }))}
                onChange={setVariantId}
              />

              {variant ? (
                <Space direction="vertical" size="middle" className="w-full">
                  <ProductPrice price={variant.price} compareAtPrice={variant.compareAtPrice} />
                  <Button
                    type="primary"
                    size="large"
                    block
                    disabled={variant.stockQuantity === 0}
                    onClick={() =>
                      addLine({
                        productId: product.id,
                        name: product.name,
                        imageUrl: product.images[0],
                        unitPrice: variant.price,
                        quantity: 1,
                        variantLabel: variant.label,
                      })
                    }
                  >
                    {variant.stockQuantity === 0 ? "Out of stock" : "Add to cart"}
                  </Button>
                </Space>
              ) : null}
            </div>
          </div>
        ) : null}
      </QueryStateBoundary>
    </div>
  );
};
