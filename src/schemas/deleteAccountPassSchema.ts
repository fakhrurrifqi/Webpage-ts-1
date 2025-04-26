import { z } from "zod";

export const deleteAccountPassSchema = z.object({
  currentPassword: z.string().min(8, "Password is required"),
});

export type DeleteAccountPassSchema = z.infer<typeof deleteAccountPassSchema>;
