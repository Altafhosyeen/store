import { z } from "zod";

export const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Enter the recipient's full name"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  line1: z.string().trim().min(3, "Enter the street address"),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2, "Enter a city"),
  postalCode: z.string().trim().min(3, "Enter a postal code"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
