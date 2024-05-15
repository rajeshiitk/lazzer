import { z } from "zod";

export const checkPasswordStrength = (password: string) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  return "";
};

export const SignUpSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
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

export type ISignUp = z.infer<typeof SignUpSchema>;
