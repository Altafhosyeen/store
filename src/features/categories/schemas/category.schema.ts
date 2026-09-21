import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(2, "The name must be at least 2 characters"),
  description: z.string().trim().optional(),
  imageUrl: z.string().trim().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
