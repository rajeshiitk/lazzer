"use client";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IResetPassword, ResetPasswordSchema } from "@/schema/ResetPassword";
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
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";

function ResetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const form = useForm<IResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: IResetPassword) {
    if (!token) return toast.error("Token is required");

    try {
      setLoading(true);
      const response = await axios.post("/api/users/reset-password", {
        token: token,
        password: values.password,
      });
      if (response.status === 200) {
        toast.success("Password reset successful");
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
            Reset Password 🚀
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                disabled={loading}
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={loading}
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="" className="text-base font-medium ">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
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
                Reset Password
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div>
          <LoaderIcon className="animate-spin" /> getting Token!....
        </div>
      }
    >
      {<ResetPasswordForm />}
    </Suspense>
  );
}
