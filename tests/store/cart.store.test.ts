import { beforeEach, describe, expect, it } from "vitest";
import { type CartLine, useCartStore } from "@/store/cart.store";

const line = (overrides: Partial<CartLine> = {}): CartLine => ({
  productId: "prod-1",
  name: "Roasted Cashews",
  unitPrice: 6.99,
  quantity: 1,
  variantLabel: "250g",
  ...overrides,
});

describe("cart store", () => {
  beforeEach(() => {
    useCartStore.getState().clear();
  });

  it("adds a new line", () => {
    useCartStore.getState().addLine(line());

    expect(useCartStore.getState().lines).toHaveLength(1);
    expect(useCartStore.getState().lines[0]).toMatchObject({ productId: "prod-1", quantity: 1 });
  });

  it("merges quantities when the same product and variant is added again", () => {
    useCartStore.getState().addLine(line({ quantity: 2 }));
    useCartStore.getState().addLine(line({ quantity: 3 }));

    expect(useCartStore.getState().lines).toHaveLength(1);
    expect(useCartStore.getState().lines[0].quantity).toBe(5);
  });

  it("keeps two variants of the same product as separate lines", () => {
    useCartStore.getState().addLine(line({ variantLabel: "250g" }));
    useCartStore.getState().addLine(line({ variantLabel: "500g" }));

    expect(useCartStore.getState().lines).toHaveLength(2);
  });

  it("removes only the matching product and variant", () => {
    useCartStore.getState().addLine(line({ variantLabel: "250g" }));
    useCartStore.getState().addLine(line({ variantLabel: "500g" }));

    useCartStore.getState().removeLine("prod-1", "250g");

    expect(useCartStore.getState().lines).toHaveLength(1);
    expect(useCartStore.getState().lines[0].variantLabel).toBe("500g");
  });

  it("sets a line's quantity directly", () => {
    useCartStore.getState().addLine(line({ quantity: 1 }));

    useCartStore.getState().setQuantity("prod-1", 4, "250g");

    expect(useCartStore.getState().lines[0].quantity).toBe(4);
  });

  it("drops a line once its quantity reaches zero", () => {
    useCartStore.getState().addLine(line({ quantity: 1 }));

    useCartStore.getState().setQuantity("prod-1", 0, "250g");

    expect(useCartStore.getState().lines).toHaveLength(0);
  });

  it("clears every line", () => {
    useCartStore.getState().addLine(line({ variantLabel: "250g" }));
    useCartStore.getState().addLine(line({ variantLabel: "500g" }));

    useCartStore.getState().clear();

    expect(useCartStore.getState().lines).toEqual([]);
  });
});
