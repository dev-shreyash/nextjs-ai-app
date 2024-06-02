
import { z } from 'zod';

export const BankDetailsSchema = z.object({
  name: z.string().nonempty("Name is required"),
  accountNumber: z.string().nonempty("Account number is required").regex(/^\d{9,18}$/, "Account number must be between 9 to 18 digits"),
  ifscCode: z.string().nonempty("IFSC code is required").regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
});

export type BankDetailsFormData = z.infer<typeof BankDetailsSchema>;