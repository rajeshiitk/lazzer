import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type ILogin = z.infer<typeof LoginSchema>;
// check strength of password
const checkPasswordStrength = (password: string) => {
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
