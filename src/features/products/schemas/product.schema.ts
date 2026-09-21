import { z } from "zod";

const variantSchema = z.object({
  label: z.string().trim().min(1, "Variant label is required"),
  size: z.number().positive("Size must be greater than zero"),
  unit: z.string().min(1, "Select a unit"),
  price: z.number().positive("Price must be greater than zero"),
  compareAtPrice: z.number().positive().optional(),
  stockQuantity: z.number().int().min(0, "Stock cannot be negative"),
});

export const productSchema = z
  .object({
    name: z.string().trim().min(3, "The name must be at least 3 characters"),
    description: z.string().trim().min(10, "The description must be at least 10 characters"),
    categoryId: z.string().min(1, "Select a category"),
    brandId: z.string().optional(),
    images: z.array(z.string()).min(1, "Add at least one image"),
    variants: z.array(variantSchema).min(1, "Add at least one variant"),
    tags: z.array(z.string()).optional(),
  })
  // A discounted price that isn't actually lower passes every field check
  // individually, so the rule has to live at the object level.
  .refine(
    (product) =>
      product.variants.every(
        (variant) => variant.compareAtPrice === undefined || variant.compareAtPrice > variant.price,
      ),
    { message: "Compare-at price must be higher than the price", path: ["variants"] },
  );

export type ProductFormValues = z.infer<typeof productSchema>;
