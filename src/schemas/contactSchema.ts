import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(4, "Message must be at least 4 characters long"),
});

export type ContactForm = z.infer<typeof contactSchema>;
