// forgot password page

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IForgotPassword, ForgotPasswordSchema } from "@/schema/ForgotPassword";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowRight, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<IForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: IForgotPassword) {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgot-password", {
        email: values.email,
      });
      if (response.status === 200) {
        toast.success("Password reset link sent to your email");
        router.replace("/login");
      }
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100svh)] w-full flex justify-center">
      <div className="flex items-center w-full max-w-sm px-4 justify-center  py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto w-full">
          <div className="mb-2 flex  justify-center">
            <Logo />
          </div>
          <h2 className="text-center text-2xl font-bold mb-4 leading-tight ">
            Forgot Password
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                disabled={loading}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={loading} type="submit" className="w-full">
                {loading && <LoaderIcon className="animate-spin w-5 mr-4" />}
                Send Reset Link
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
