import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(12, "Password must be at most 12 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[\W_]/,
    "Password must contain at least one special character (!@#$...)",
  );

export const loginSchema = z.object({
  email: z.email("invlaid email"),
  password: passwordSchema,
});

export const SignupSchema = z.object({
  name: z
    .string()
    .min(6, "Name must be at least 8 characters")
    .max(12, "Name must be at most 12 characters"),
  email: z.email(),
  password: passwordSchema,
  confirmpassword: passwordSchema,
});
