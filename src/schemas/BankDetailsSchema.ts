// src/schemas/BankDetailsSchema.ts
import { z } from 'zod';

export const BankDetailsSchema = z.object({
  name: z.string().nonempty("Name is required"),
  accountNumber: z.string().length(18, "Account number must be 18 digits"),
  ifscCode: z.string().length(11, "IFSC code must be 11 characters"),
});

export type BankDetailsFormData = z.infer<typeof BankDetailsSchema>;
