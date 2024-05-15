import { z } from "zod";
import { checkPasswordStrength } from "./SignUp";

// ResetPassword Schema
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine((password) => {
        return checkPasswordStrength(password) === "";
      }, "Password is not strong enough"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type IResetPassword = z.infer<typeof ResetPasswordSchema>;
