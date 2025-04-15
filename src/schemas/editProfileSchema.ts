import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
