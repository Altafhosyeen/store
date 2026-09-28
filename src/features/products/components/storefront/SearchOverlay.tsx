import { useEffect, useRef, useState } from "react";
import { CenteredModal } from "@/components";
import { useDebouncedValue } from "@/hooks";
import { formatCurrency } from "@/lib/currency";
import { useUiStore } from "@/store";
import { PRODUCT_STATUS } from "../../constants/products.constants";
import { useGetProducts } from "../../hooks/use-products";
import type { ProductDto } from "../../types/products-api.types";
import { getDefaultVariant } from "../../utils/product-display";

const MAX_RESULTS = 8;

const ResultRow = ({ product, onPick }: { product: ProductDto; onPick: () => void }) => {
  const variant = getDefaultVariant(product);
  return (
    <button
      type="button"
      onClick={onPick}
      className="flex w-full items-center gap-3.5 rounded-xl p-2.5 text-left transition-colors hover:bg-sand/40"
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="h-14 w-14 shrink-0 rounded-lg object-cover"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14.5px] font-semibold text-walnutdk">
          {product.name}{" "}
          {product.urduName ? (
            <span className="font-normal text-cocoa/60">• {product.urduName}</span>
          ) : null}
        </span>
        <span className="block text-[12px] text-cocoa/70">
          {product.subtitle} · <span className="star-g">★</span> {product.rating}
        </span>
      </span>
      {variant ? (
        <span className="shrink-0 font-display text-[14px] font-bold text-walnutdk">
          {formatCurrency(variant.price)}
          <span className="font-body text-[11px] font-normal text-cocoa/60"> /{variant.label}</span>
        </span>
      ) : null}
    </button>
  );
};

/** Header search: type English or local names (badam, kaju, khajoor…) and jump into a quick view. */
export const SearchOverlay = () => {
  const open = useUiStore((state) => state.overlay === "search");
  const close = useUiStore((state) => state.closeOverlay);
  const openQuickView = useUiStore((state) => state.openQuickView);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query.trim());
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isFetching } = useGetProducts({
    page: 1,
    pageSize: MAX_RESULTS,
    status: PRODUCT_STATUS.PUBLISHED,
    search: debouncedQuery || undefined,
  });
  const results = debouncedQuery ? (data?.items ?? []) : [];

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <CenteredModal
      open={open}
      onClose={close}
      label="Search products"
      frameClassName="mt-[8vh] max-w-2xl"
    >
      <div className="overflow-hidden rounded-2xl bg-cream shadow-lift">
        <div className="flex items-center gap-3 border-b border-sand px-5 py-4">
          <i className="fa-solid fa-magnifying-glass text-golddk" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search badam, kaju, pista, khajoor, anjeer, chilgoza…"
            className="flex-1 border-0 bg-transparent text-lg text-walnutdk placeholder:text-cocoa/40 focus:shadow-none"
            aria-label="Global product search"
          />
          <button
            type="button"
            onClick={close}
            className="h-9 w-9 shrink-0 rounded-full text-walnut hover:bg-sand/60"
            aria-label="Close search"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-3">
          {!debouncedQuery ? (
            <p className="py-8 text-center text-sm font-light text-cocoa/60">
              Start typing to search in English or local names — e.g. &quot;badam&quot;,
              &quot;kaju&quot;, &quot;khajoor&quot;…
            </p>
          ) : results.length > 0 ? (
            results.map((product) => (
              <ResultRow
                key={product.id}
                product={product}
                onPick={() => openQuickView(product.id)}
              />
            ))
          ) : isFetching ? null : (
            <p className="py-8 text-center text-sm font-light text-cocoa/60">
              No matches for &quot;<span className="font-medium">{debouncedQuery}</span>&quot;. Try
              &quot;badam&quot;, &quot;kaju&quot;, &quot;pista&quot;, &quot;khajoor&quot;…
            </p>
          )}
        </div>
      </div>
    </CenteredModal>
  );
};
