import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Current Password is required"),
    newPassword: z
      .string()
      .min(8, "Password Must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[-!@#$%^&*(),.?":;{}|<>]/,
        "Must contain at least one special character",
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // shows the error on the confirmPassword field
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
